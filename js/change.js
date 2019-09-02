var http_head = "http://47.94.173.253:8008";
// 发布需求
var dataC = localStorage.getItem("GHY_login");
// 易企购易企聘
$(".hold").on("click", function() {
	layer.msg("正在开发中，敬请期待。")
});
if(dataC!=null){
	var flag2 = 0;
	$("#loginBtn").on("click", function() {
	    if (flag2 == 0) {
	        $(".userOption").show("500");
	        flag2 = 1;
	    } else {
	        $(".userOption").hide("500");
	        flag2 = 0;
	    }
	});
	$(".userOption").on("click", function() {
		var this_userGuid = JSON.parse(dataC).Guid;
		var this_companyId = JSON.parse(dataC).companyId;
	    window.open("http://www.eqidd.com/makerSpace/index.html?userGuid=" + this_userGuid + "&companyId=" + this_companyId);
	})
}
// 创客空间跳转
$(".gock").on("click", function() {
	if (dataC) {
		var this_userGuid = JSON.parse(dataC).Guid;
		var this_companyId = JSON.parse(dataC).companyId;
		window.open("http://www.eqidd.com/makerSpace/index.html?userGuid=" + this_userGuid + "&companyId=" + this_companyId);
		localStorage.setItem("GHY_maker", dataC)
	} else {
		layer.msg("请登录", {
			time: 1200
		})
	}
});
// 易企购易企聘
$(".hold").on("click", function() {
	layer.msg("正在开发中，敬请期待。")
})
$("#demandBtn").on("click", function() {
	if (dataC) {
		window.open("addDemand.html")
	} else {
		layer.msg("请登录", {
			time: 1200
		})
	}
})
$(".demandBtn2").on("click", function() {
	if (dataC) {
		window.open("addDemand.html")
	} else {
		layer.msg("请登录", {
			time: 1200
		})
	}
})
$("#sendDemand").on("click", function() {
	if (dataC) {
		window.open("addDemand.html")
	} else {
		layer.msg("请登录", {
			time: 1200
		})
	}
});
$("#sendAdDemand").on("click", function() {
	if (dataC) {
		window.open("addAdDemand.html")
	} else {
		layer.msg("请登录", {
			time: 1200
		})
	}
});
$("#sendCourse").on("click", function() {
	if (dataC) {
		var this_userGuid = JSON.parse(dataC).Guid;
		var this_companyId = JSON.parse(dataC).companyId;
		window.open("http://www.eqidd.com/makerSpace/addTeacherCourse.html?userGuid=" + this_userGuid + "&companyId=" + this_companyId);
	} else {
		layer.msg("请登录", {
			time: 1200
		})
	}
});
$(document).ready(function() {
	$(".downLoad").hover(function() {
		layer.tips("点我进入APP下载页", ".downLoad", {
			tips: [4, "black"]
		})
	}, function() {
		layer.closeAll("tips")
	});

	$(".callBack").hover(function() {
		layer.tips("点我进行反馈", ".callBack", {
			tips: [4, "black"]
		})
	}, function() {
		layer.closeAll("tips")
	});

	$(".publicNum").hover(function() {
		layer.tips(
			'<img src="../image/ljy.jpg" style="margin-top:10px" id="weChatImg"><p style="height:20px"></p> <img src="../image/wy.jpg"  id="weChatImg"><p style="height:20px"></p> <img src="../image/zyb.jpg" id="weChatImg"><p style="height:20px"></p>',
			".publicNum", {
				tips: [4, "black"],
				area: ["108px", "320px"]
			})
	}, function() {
		// layer.closeAll("tips")
	});

	$(".leaveMsg").hover(function() {
		layer.tips("QQ727024586 QQ906091920 QQ24961158 ", ".leaveMsg", {
			tips: [4, "black"],
			area: ["110px", "85px"]
		})
	}, function() {
		layer.closeAll("tips")
	});
	$(".contact").hover(function() {
		layer.tips("400-1789-528", ".contact", {
			tips: [4, "black"]
		})
	}, function() {
		layer.closeAll("tips")
	});

	$('.goTop').hover(function() {
		layer.tips('回到顶部', '.goTop', {
			tips: [4, 'black']
		});
	}, function() {
		layer.closeAll('tips')
	});

	$(window).scroll(function() {
		if ($(window).scrollTop() > 0) {
			$('.goTop').fadeIn()
		} else {
			$('.goTop').fadeOut()
		}
	})

	$(".goTop").on("click", function() {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
	});

	// 鼠标移入移出
	$(".mainFountion li a").wrapInner('<span class="out"></span>');
	$(".mainFountion li a").each(function() {
		$('<span class="over">' + $(this).text() + '</span>').appendTo(this);
	});

	$(".mainFountion li a").hover(function() {
		$(".out", this).stop().animate({
			'top': '40px'
		}, 300);
		$(".over", this).stop().animate({
			'top': '0px',
		}, 300);

	}, function() {
		$(".out", this).stop().animate({
			'top': '0px'
		}, 300);
		$(".over", this).stop().animate({
			'top': '-40px',
		}, 300);
	});
	// 搜索条件
	$(".more").on("click", function() {
		flag = $(this).attr("flag");
		if (flag == 0) {
			$(this).parent("dl").parent("li").animate({
				height: "75px"
			}, "slow", "swing", function() {
				$(this).children("dl").children("span").text("收起>>")
			}).show();

			$(this).attr("flag", "1")
		} else {
			$(this).parent("dl").parent("li").animate({
				height: "40px"
			}, "slow", "swing", function() {
				$(this).children("dl").children("span").text("更多>>")
			});
			$(this).attr("flag", "0")
		}
	});
	// 搜索条件
	$(".moresp").on("click", function() {
		flag = $(this).attr("flag");
		if (flag == 0) {
			$(this).parent("dl").parent("li").animate({
				height: "136px"
			}, "slow", "swing", function() {
				$(this).children("dl").children("span").text("收起>>")
			}).show();
	
			$(this).attr("flag", "1")
		} else {
			$(this).parent("dl").parent("li").animate({
				height: "40px"
			}, "slow", "swing", function() {
				$(this).children("dl").children("span").text("更多>>")
			});
			$(this).attr("flag", "0")
		}
	});
	
	

})
