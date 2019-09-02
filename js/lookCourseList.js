$(document).ready(function() {
    var coursePage = 0; //页码
    var m1 = 0;
    var m2 = 10000; //时长
    var p1 = 0;
    var p2 = 100000; //费用
    var typeVal = ""; //课程类别
    var para = ""; //搜索关键字
    var a1 = 0;
    var a2 = 200; //年龄（固定）
    var approveVal = -1; //是否认证
    var jobOldVal = ""; //曾任职
    var hangyeVal = ""; //行业
    var workBgVal = ""; //工作背景
    var sexVal = ""; //性别
    var postVal = "" //岗位
    var href = location.href;
    var hrefDetails = decodeURIComponent(href);
    var dataCircle = localStorage.getItem("GHY_login");
    //登陆退出
    var href = location.href;
    var dataC = localStorage.getItem("GHY_login");
    if (dataC != null) {
        var dataInfo = JSON.parse(dataC);
        $('#loginBtn').text(dataInfo.username);
        $("#regBtn").on("click", function() {
            localStorage.removeItem("GHY_login");
            window.location.reload();
        }).text("退出")
    } else {
        $('#loginBtn').click(function() {
            location.href = "./innerLogin.html?href=" + href + "";
        }).text("登录");
        $("#regBtn").on("click", function() {
            location.href = "http://www.eqidd.com/html/reg.html?href=" + href + "";
        }).text("注册")
    };
    var schUrlPara;
    if (href.indexOf("?") > 0 && href.indexOf("courseName") > 0) {
        var videoName = hrefDetails.split("=")[1];
        // 首页搜索
        schUrlPara = decodeURI(href.split("=")[1], "UTF-8");
        searchCourse(coursePage, typeVal, schUrlPara, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal)
    } else {
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal)
    };
    // 加载尾部
    setTimeout(function() {
        $('#footer').load("../html/footer2.html");
    }, 500);
    $(".mainFountion li a").eq(4).unbind('mouseenter').unbind('mouseleave');
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 搜索结果表格
    function loadTable(data) {
        $('#courseListTable').bootstrapTable({
            columns: [{
                field: 'courseDetails',
                formatter: optionFormatter,
                events: viewCourseDetails
            }],
            data: data,
        });

        function optionFormatter(e, value, row, index) {
            return ['<div class="courseDiv">', '<p>' + value.courseTheme + '</p>', '<div  class="clearfix" id="innerDiv1">', '<p class="pull-left pd"><span>讲师 : </span><span>' + value.lectureName + '</span></p>', '<p class="pull-left ps"><span>课程类别 : </span>' + value.courseType + '</p>', '</div>', '<div class="cleardix" id="innerDiv2">', '<p class="pull-left pd"><span>课程时长 : </span><span id="hours">' + value.courseTimes + '</span>天</p>', '<p class="pull-left ps"><span>受训对象 : </span><span>' + value.courseObjecter + '</span></p>', '</div>', '</div>'].join('');
        }
    };
    window.viewCourseDetails = {
        'click .courseDiv': function(e, value, row, index) {
            window.open("http://www.eqidd.com/changke/html/courseDetails.html?id=" + row.Id + "")
        }
    };
    // 搜索课程
    function searchCourse(page, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal) {
        $('.typeArea').show()
        $.post('' + http_head + '/Lectures/course/searchCourses.ashx', {
            "page": page,
            "type": typeVal,
            "para": para,
            "hangye": hangyeVal,
            "post": postVal,
            "sex": sexVal,
            "workBg": workBgVal,
            "Upost": jobOldVal,
            "ageMin": a1,
            "ageMax": a2,
            "timeMin": m1,
            "timeMax": m2,
            "priceMin": p1,
            "priceMax": p2,
            "isAuthen": approveVal
        }, function(data) {
            var dataSearchDetails = JSON.parse(data);
            loadTable(dataSearchDetails.items);
            if (dataSearchDetails.items.length > 0) {
                layer.msg('搜索成功', {
                    time: 1000,
                });
            } else {
                layer.msg('暂无搜索结果', {
                    time: 1000,
                });
            }
            $("#courseListTable").bootstrapTable('load', dataSearchDetails.items);
            coursePage = dataSearchDetails.page;
            if (dataSearchDetails.items.length >= 10) {
                $('.nextpageBtn').show()
            } else {
                $('.nextpageBtn').hide()
            }
        });
    };
    //加载下一页
    function searchCoursenext(page, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal) {
        $('.typeArea').show()
        $.post('' + http_head + '/Lectures/course/searchCourses.ashx', {
            "page": page,
            "type": typeVal,
            "para": para,
            "hangye": hangyeVal,
            "post": postVal,
            "sex": sexVal,
            "workBg": workBgVal,
            "Upost": jobOldVal,
            "ageMin": a1,
            "ageMax": a2,
            "timeMin": m1,
            "timeMax": m2,
            "priceMin": p1,
            "priceMax": p2,
            "isAuthen": approveVal
        }, function(data) {
            var dataSearchDetails = JSON.parse(data);
            if (dataSearchDetails.items.length > 0) {
                layer.msg('搜索成功', {
                    time: 1000,
                });
                $("#courseListTable").bootstrapTable('append', dataSearchDetails.items);
            } else {
                layer.msg('暂无搜索结果', {
                    time: 1000,
                });
            }
            coursePage = dataSearchDetails.page;
            if (dataSearchDetails.items.length >= 10) {
                $('.nextpageBtn').show()
            } else {
                $('.nextpageBtn').hide()
            }
        });
    };
    $('.nextpageBtn').click(function() {
        searchCoursenext(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal)
    });
    $.post('' + http_head + '/Option_AreasAnd.ashx', {
        "type": 45
    }, function(data) {
        for (var i = 0; i < data.length; i++) {
            // 课程分类
            $('#select1').append('<dd id="' + i + '"><a>' + data[i].name + '</a></dd>')
        }
        $("#select1 dd").eq(0).click(function() {
            $(this).addClass("selected").siblings().removeClass("selected");
            $("#selectA").remove();
            $('#secondType').hide()
            // 全部
            typeVal = "";
            coursePage = 0;
            searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
        })
        $("#select1 dd:gt(0)").click(function() {
            $('#secondType').show()
            $(this).addClass("selected").siblings().removeClass("selected");
            $('#select1Min dd').remove();
            for (var j = 0; j < data[$(this).attr('id')].sub.length; j++) {
                // items项
                $('#select1Min').append('<dd><a>' + data[$(this).attr('id')].sub[j].name + '</a></dd>');
            }
            $("#select1Min dd").click(function() {
                var index = $(this).index();
                typeVal = $(this).text().trim();
                coursePage = 0;
                searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
                $(this).addClass("selected").siblings().removeClass("selected");
                if ($(this).hasClass("select-all")) {
                    $("#selectA").remove();
                } else {
                    var copyThisA = $(this).clone();
                    if ($("#selectA").length > 0) {
                        $("#selectA a").html($(this).text());
                    } else {
                        $(".select-result dl").append(copyThisA.attr("id", "selectA"));
                    }
                }
            });
        })
    });
    //课程时长
    var timeVal = ["0.5天", "1天", "1.5天", "2天", "2.5天", "3天", "4天", "5天", "6天", "6-9天", "9-15天", "15天以上"];
    var timeList = ["0~0.5", "0.51~1", "1.01~1.5", "1.51~2", "2.01~2.5", "2.51~3", "3.01~4", "4.01~5", "5.01~6", "6.01~9", "9.01~15", "15.01~1000"];
    for (var i = 0; i < timeVal.length; i++) {
        $("#select2 ").append("<dd><a >" + timeVal[i] + "</a></dd>")
    };
    $("#select2 dd").click(function() {
        var index = $(this).index();
        coursePage = 0;
        if (index >= 2) {
            var timestr = timeList[index - 2];
            m1 = timestr.split("~")[0];
            m2 = timestr.split("~")[1];
        } else {
            m1 = 0;
            m2 = 10000;
        }
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal)
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectB").remove();
        } else {
            var copyThisB = $(this).clone();
            if ($("#selectB").length > 0) {
                $("#selectB a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisB.attr("id", "selectB"));
            }
        }
    });
    //费用预算
    var statusList = ["0.5K以下", "0.5K-1K", "1K-1.5K", "1.5K-2K", "2K-3K", "3K-4K", "4K-5K", "5K-6K", "6K-7K", "7K-8K", "8K-10K", "10K-12K", "12K-15K", "15K-20K", "20K-30K", "30K-50K", "50K以上"];
    var moneyList = ["0-500", "500-1000", "1000-1500", "1500-2000", "2000-3000", "3000-4000", "4000-5000", "5000-6000", "6000-7000", "7000-8000", "8000-10000", "10000-12000", "12000-15000", "15000-20000", "20000-30000", "30000-50000", "50000-1000000"];
    for (var i = 0; i < statusList.length; i++) {
        $("#select3 ").append("<dd><a >" + statusList[i] + "</a></dd>")
    };
    $("#select3 dd").click(function() {
        var index = $(this).index();
        coursePage = 0;
        if (index >= 2) {
            var moneystr = moneyList[index - 2];
            minPrice = moneystr.split("-")[0];
            maxPrice = moneystr.split("-")[1];
        } else {
            minPrice = 0;
            maxPrice = 100000;
        };
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectC").remove();
        } else {
            var copyThisC = $(this).clone();
            if ($("#selectC").length > 0) {
                $("#selectC a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisC.attr("id", "selectC"));
            }
        }
    });
    //行业
	$.post(http_head+'/Option_AreasAnd.ashx',{
		type:52
	},function(data){
		for (var i = 0; i < data.length; i++) {
		    $("#select4 ").append("<dd><a >" + data[i].industry + "</a></dd>")
		};
	})
   
    $("#select4 dd").on("click", function() {
        hangyeVal = $(this).text();
        coursePage = 0;
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectD").remove();
        } else {
            var copyThisD = $(this).clone();
            if ($("#selectD").length > 0) {
                $("#selectD a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisD.attr("id", "selectD"));
            }
        }
    });
    //岗位类别
    $.post('' + http_head + '/Option_AreasAnd.ashx', {
        "type": 58
    }, function(data) {
        for (var i = 0; i < data.length; i++) {
            // 岗位分类
            $('#select5').append('<dd id="' + i + '"><a>' + data[i].name + '</a></dd>')
        };
        $("#select5 dd").eq(0).click(function() {
            $(this).addClass("selected").siblings().removeClass("selected");
            $("#selectE").remove();
            $('#secondType2').hide()
            // 全部
            postVal = "";
            coursePage = 0;
            searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
        });
        $("#select5 dd:gt(0)").click(function() {
            $('#secondType2').show()
            $(this).addClass("selected").siblings().removeClass("selected");
            $('#select5Min dd').remove();
            for (var j = 0; j < data[$(this).attr('id')].sub.length; j++) {
                // items项
                $('#select5Min').append('<dd><a>' + data[$(this).attr('id')].sub[j].name + '</a></dd>');
            };
            $("#select5Min dd").click(function() {
                var index = $(this).index();
                postVal = $(this).text();
                coursePage = 0;
                searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
                $(this).addClass("selected").siblings().removeClass("selected");
                if ($(this).hasClass("select-all")) {
                    $("#selectE").remove();
                } else {
                    var copyThisE = $(this).clone();
                    if ($("#selectE").length > 0) {
                        $("#selectE a").html($(this).text());
                    } else {
                        $(".select-result dl").append(copyThisE.attr("id", "selectE"));
                    }
                }
            });
        })
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // 性别
    $("#select6 dd").on("click", function() {
        coursePage = 0;
        var index = $(this).index();
        if (index >= 2) {
            sexVal = $(this).text();
        } else {
            sexVal = '';
        };
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal)
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectF").remove();
        } else {
            var copyThisF = $(this).clone();
            if ($("#selectF").length > 0) {
                $("#selectF a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisF.attr("id", "selectF"));
            }
        }
    });
    //年龄
    var ageList = ["20以下", "20-25", "25-30", "30-35", "35-40", "40-50", "50-60"];
    var ageList2 = ["0-20", "20-25", "25-30", "30-35", "35-40", "40-50", "50-60"];
    for (var i = 0; i < ageList.length; i++) {
        $("#select7 ").append("<dd><a >" + ageList[i] + "</a></dd>")
    };
    $("#select7 dd").click(function() {
        var index = $(this).index();
        coursePage = 0;
        if (index >= 2) {
            var agestr = ageList2[index - 2];
            a1 = agestr.split("-")[0];
            a2 = agestr.split("-")[1];
        } else {
            a1 = 0;
            a2 = 200;
        }
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectG").remove();
        } else {
            var copyThisG = $(this).clone();
            if ($("#selectG").length > 0) {
                $("#selectG a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisG.attr("id", "selectG"));
            }
        }
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////
    //工作背景
    var jobList = ["世界500强", "中国500强", "大型国企", "大型民企", "知名日韩企业", "港澳台企业", "欧美外企", "其他"];
    for (var i = 0; i < jobList.length; i++) {
        $("#select8 ").append("<dd><a >" + jobList[i] + "</a></dd>")
    };
    $("#select8 dd").click(function() {
        var index = $(this).index();
        coursePage = 0;
        if (index >= 2) {
            workBgVal = $(this).text();
        } else {
            workBgVal = '';
        };
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectH").remove();
        } else {
            var copyThisH = $(this).clone();
            if ($("#selectH").length > 0) {
                $("#selectH a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisH.attr("id", "selectH"));
            }
        }
    });
    // 曾担任职位
    var jobOldList = ["总经理", "副总", "总监", "部门经理/主管", "高级工程师", "一般管理人员", "其他"];
    for (var i = 0; i < jobOldList.length; i++) {
        $("#select9").append("<dd><a >" + jobOldList[i] + "</a></dd>")
    };
    $("#select9 dd").click(function() {
        var index = $(this).index();
        coursePage = 0;
        if (index >= 2) {
            jobOldVal = $(this).text();
        } else {
            jobOldVal = '';
        };
        $(this).addClass("selected").siblings().removeClass("selected");
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
        if ($(this).hasClass("select-all")) {
            $("#selectI").remove();
        } else {
            var copyThisI = $(this).clone();
            if ($("#selectI").length > 0) {
                $("#selectI a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisI.attr("id", "selectI"));
            }
        };
    });
    //实名认证
    var approveList = ["1", "0"];
    $("#select10 dd").click(function() {
        var index = $(this).index();
        coursePage = 0;
        if (index >= 2) {
            approveVal = approveList[index - 2];
        } else {
            approveVal = -1;
        };
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectJ").remove();
        } else {
            var copyThisJ = $(this).clone();
            if ($("#selectJ").length > 0) {
                $("#selectJ a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisJ.attr("id", "selectJ"));
            }
        }
    });
    // 已选条件
    $(document).on("click", "#selectA", function() {
        $(this).remove();
        $('#secondType').hide()
        $("#select1 .select-all").addClass("selected").siblings().removeClass("selected");
        $("#select1Min dd").addClass("selected").siblings().removeClass("selected");
        // 搜索
        typeVal = '';
        coursePage = 0;
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
    });
    $(document).on("click", "#selectE", function() {
        $(this).remove();
        $('#secondType2').hide();
        $("#select5 .select-all").addClass("selected").siblings().removeClass("selected");
        $("#select5Min dd").addClass("selected").siblings().removeClass("selected");
        // 搜搜
        postVal = "";
        coursePage = 0;
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
    });
    $(document).on("click", "#selectB", function() {
        $(this).remove();
        $("#select2 .select-all").addClass("selected").siblings().removeClass("selected");
        // 搜搜
        m1 = 0;
        m2 = 1000;
        coursePage = 0;
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
    });
    $(document).on("click", "#selectC", function() {
        $(this).remove();
        $("#select3 .select-all").addClass("selected").siblings().removeClass("selected");
        // 搜索
        p1 = 0;
        p2 = 1000000
        coursePage = 0;
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
    });
    $(document).on("click", "#selectD", function() {
        // 行业
        $(this).remove();
        $("#select4 .select-all").addClass("selected").siblings().removeClass("selected");
        hangyeVal = ""
        coursePage = 0;
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
    });
    $(document).on("click", "#selectF", function() {
        $(this).remove();
        $("#select6 .select-all").addClass("selected").siblings().removeClass("selected");
        // 搜搜
        sexVal = '';
        coursePage = 0;
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
    });
    $(document).on("click", "#selectG", function() {
        $(this).remove();
        $("#select7 .select-all").addClass("selected").siblings().removeClass("selected");
        // 搜搜
        a1 = 0;
        a2 = 200;
        coursePage = 0;
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
    });
    $(document).on("click", "#selectH", function() {
        $(this).remove();
        $("#select8 .select-all").addClass("selected").siblings().removeClass("selected");
        // 搜搜
        workBgVal = '';
        coursePage = 0;
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
    });
    $(document).on("click", "#selectI", function() {
        $(this).remove();
        $("#select9 .select-all").addClass("selected").siblings().removeClass("selected");
        // 搜搜
        jobOldVal = '';
        coursePage = 0;
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
    });
    $(document).on("click", "#selectJ", function() {
        $(this).remove();
        $("#select10 .select-all").addClass("selected").siblings().removeClass("selected");
        // 搜搜
        approveVal = -1;
        coursePage = 0;
        searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
    });
    $(document).on("click", ".select dd", function() {
        if ($(".select-result dd").length > 1) {
            $(".select-no").hide();
        } else {
            $(".select-no").show();
        }
    });
    // /////////////////////////////////////////////////////////////////////////////////////
    // 搜索框
    $('#searchBtn').click(function() {
        if ($('#inputSearch').val().length == 0) {
            layer.msg('搜索关键字不能为空', {
                time: 1000,
            });
        } else {
            para2 = $('#inputSearch').val();
            coursePage = 0;
            searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
        }
    });
    $('#inputSearch').keydown(function(event) {
        if (event.keyCode === 13) {
            if ($('#inputSearch').val().length == 0) {
                layer.msg('搜索关键字不能为空', {
                    time: 1000,
                });
            } else {
                para2 = $('#inputSearch').val();
                coursePage = 0;
                searchCourse(coursePage, typeVal, para, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
            }
        }
    });
	$('#searchBtn').click(function() {
	    if ($('#inputSearch').val().length == 0) {
	        layer.msg('搜索关键字不能为空', {
	            time: 1000,
	        });
	    } else {
	        if ($('#selectType').val() == "1") {
	            window.open("./teacherIndex.html?searchVal=" + $('#inputSearch').val() + "");
	        } else if ($('#selectType').val() == "2") {
	            window.open("./advisory.html?advName=" + $('#inputSearch').val() + "")
	        } else if ($('#selectType').val() == "3") {
	            window.open("./lookDemandList.html?demandName=" + $('#inputSearch').val() + "")
	        } else if ($('#selectType').val() == "4") {
	            window.open("http://www.eqidd.com/yqy/search.html?searchKey=" + $('#inputSearch').val() + "")
	        } else if ($('#selectType').val() == "5") {
	            window.open("./lookActivity.html?activityName=" + $('#inputSearch').val() + "")
	        } else if($('#selectType').val() == "6"){
				window.open("./organization.html?orgName=" + $('#inputSearch').val() + "")
			}
	    }
	});
	$('#inputSearch').keydown(function(event) {
	    if (event.keyCode === 13) {
	        if ($('#inputSearch').val().length == 0) {
	            layer.msg('搜索关键字不能为空', {
	                time: 1000,
	            });
	        } else {
	            if ($('#selectType').val() == "1") {
	                window.open("./teacherIndex.html?searchVal=" + $('#inputSearch').val() + "");
	            } else if ($('#selectType').val() == "2") {
	                 window.open("./advisory.html?advName=" + $('#inputSearch').val() + "")
	            } else if ($('#selectType').val() == "3") {
	                window.open("./lookDemandList.html?demandName=" + $('#inputSearch').val() + "")
	            } else if ($('#selectType').val() == "4") {
	                 window.open("http://www.eqidd.com/yqy/search.html?searchKey=" + $('#inputSearch').val() + "")
	            } else if ($('#selectType').val() == "5") {
	                window.open("./lookActivity.html?activityName=" + $('#inputSearch').val() + "")
	            } else if($('#selectType').val() == "6"){
					window.open("./organization.html?orgName=" + $('#inputSearch').val() + "")
				}
	        }
	    }
	});
	var schUrlPara;
	if (href.indexOf("?") > 0 && href.indexOf("couName") > 0) {
		schUrlPara = decodeURI(href.split("=")[1], "UTF-8");
		searchCourse(coursePage, typeVal, schUrlPara, hangyeVal, postVal, sexVal, workBgVal, jobOldVal, a1, a2, m1, m2, p1, p2, approveVal);
	};
    // 最新的课程
    loadNewCourse();

    function loadNewCourse() {
        $.post('' + http_head + '/Lectures/course/Get_CourseByTime.ashx', {
            "page": 0
        }, function(data) {
            var dataNewCourse = JSON.parse(data);
			console.log(dataNewCourse)
            for (var itemValue of dataNewCourse.items) {
                var str = '<li class="clearfix" id="' + itemValue.Id + '" style="height: 60px!important;line-height: 35px;"><p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">' + itemValue.courseTheme + '</p></li>';
                $('#newCourseUl').append(str);
            }
            $('#newCourseUl li').click(function() {
                window.open("http://www.eqidd.com/changke/html/courseDetails.html?id=" + $(this).attr('id') + "")
            });
        });
    };
    // 滚动
    var $thisDemand = $(".newCourseShowdiv");
    var scrollTimerDemand;
    $thisDemand.hover(function() {
        clearInterval(scrollTimerDemand);
    }, function() {
        scrollTimerDemand = setInterval(function() {
            scrollNewsDemand($thisDemand);
        }, 2000);

        function scrollNewsDemand(obj) {
            var $self = obj.find("ul");
            var lineHeight = $self.find("li:first").height();
            $self.animate({
                "marginTop": -60 + "px"
            }, 600, function() {
                $self.css({
                    marginTop: 0
                }).find("li:first").appendTo($self);
            })
        }
    }).trigger("mouseleave");
    //推荐的讲师
    tuijainTeacher();

   function tuijainTeacher() {
   	$.post('' + http_head + '/Admin/Home/get_homeTeacher.ashx', {
   		page: 0
   	}, function(data) {
   		var dataTuijain = JSON.parse(data);
   		var imgURLmin;
   		var array_label = [];
   		var str_label = '';
   		for (var itemValue of dataTuijain.items) {
   			if (itemValue.userImage) {
   				imgURLmin = itemValue.userImage.replace(/.png/, "min.png")
   			} else {
   				imgURLmin = "../image/touxiang.png"
   			};
   			str_label = itemValue.ResearchField.split(",");
   			for (var i = 0; i < str_label.length; i++) {
   				array_label.push('《<span class="">' + str_label[i] + '</span>》')
   			};
   			str = '<li class="clearfix" id="' + itemValue.lectureGuid + '" alt="' + itemValue.userName +
   				'"><img class="lazytj" data-original="' + imgURLmin +
   				'" alt="" class="pull-left"><div class="pull-right"><p class="lectureName">' + itemValue.userName +
   				'</p><p class="lectureLabel">' + array_label + '</p></div></li>';
   			$('#mateLecturer').append(str);
   		};
   		$("img.lazytj").lazyload({
   			effect: "fadeIn",
   		});
   		$('#mateLecturer li').click(function() {
   			var this_guid = $(this).attr("id");
   			window.open("http://www.eqidd.com/changke/index_start.html?userGuid=" + this_guid + "&piece=1");
   		});
   	})
   };
    // 推荐讲师滚动
    var $this2 = $("#matelecturerDiv");
    var scrollTimer2;
    $this2.hover(function() {
        clearInterval(scrollTimer2);
    }, function() {
        scrollTimer2 = setInterval(function() {
            scrollNews2($this2);
        }, 2000);

        function scrollNews2(obj) {
            var $self = obj.find("ul");
            var lineHeight = $self.find("li:first").height();
            $self.animate({
                "marginTop": -81 + "px"
            }, 600, function() {
                $self.css({
                    marginTop: 0
                }).find("li:first").appendTo($self);
            })
        }
    }).trigger("mouseleave");
    var flag = 0;
    $("#showMore").on("click", function() {
        if (flag == 0) {
            $("#pick").animate({
                height: "240px"
            }, "slow", "swing", function() {
                $("#showMore a").text("收起>>")
            }).show();
            flag = 1;
        } else {
            $("#pick").animate({
                height: 0
            }, "slow", "swing", function() {
                $("#showMore a").text("更多选项>>")
            }).fadeOut();
            flag = 0
        }
    });
})