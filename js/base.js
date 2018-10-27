/**
 * 全屏幕打开窗口
 * @param url
 * @returns
 */

function openFullDialog(url) {
	var winParam = "menubar=0,toolbar=0,status=0";
	winParam += ",scrollbars=1,resizable=1";
	var left = 0;
	var top = 0;
	var width = window.screen.availWidth;
	var height = window.screen.availHeight;
	//	  if($.browser.webkit){
	//		  height = parseInt(height)-60;
	//	  }
	height = parseInt(height) - 80;
	var width = window.screen.availWidth;
	var height = window.screen.availHeight;
	var attrs = null;

	attrs = "status:no;directories:yes;scroll:yes;Resizable=no;";
	attrs += "dialogWidth:" + width + "px;";
	attrs += "dialogHeight:" + height + "px;";
	attrs += "dialogLeft:" + left + "px;";
	attrs += "dialogTop:" + top + "px;";

	return window.open(url, new Date().getTime() + "", attrs);
}

function checkData(data){
    if($.type(data)=='null' || $.type(data)=='undefined' || data.trim()=="" ){
        return "无数据"
    }
    return data
}

function isEmpty(data){
    if($.type(data)=='null' || $.type(data)=='undefined' || data.trim()=="" ){
        return true
    }
    return false
}

/**
 * 判断变量是否为空
 */
function isEmpty(v) {
    switch (typeof v) {
    case 'undefined':
        return true;
    case 'string':
        if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
        break;
    case 'boolean':
        if (!v) return true;
        break;
    case 'number':
        if (0 === v || isNaN(v)) return true;
        break;
    case 'object':
        if (null === v || v.length === 0) return true;
        for (var i in v) {
            return false;
        }
        return true;
    }
    return false;
}


/**
 * Select 生成 option方便方法
 */
function setOptions(el, aOption, value) {
	for(var i = 0; i < aOption.length; i++) {
		var _option = document.createElement("option");
		_option.value = aOption[i].value;
		if(aOption[i].value == value) {
			_option.selected = true;
		}
		_option.appendChild(document.createTextNode(aOption[i].text));
		el.appendChild(_option);
	}

}

/***************hoverIt*****************/

!(function($) {
	$.fn.hoverIt = function(options) {
		$.fn.hoverIt.defaults = {
			triggerEvent: "mouseover",
			className: 'hover',
			closeFlag: true || 'true'
		};

		return this.each(function() {
			var opts = $.extend({}, $.fn.hoverIt.defaults, options);
			var $self = $(this);
			var className = opts.className;
			var triggerEvent = opts.triggerEvent;
			var closeFlag = opts.closeFlag;
			var closeObj = $self.find('.closeIt');
			var toggleObj = $self.children(":last-child");

			function showObj() {
				$self.addClass(className);
				toggleObj.slideDown(200);
				clickClose();
			};

			function hideObj() {
				$self.removeClass(className);
				toggleObj.slideUp(200);
			};

			function clickClose() {
				closeFlag && toggleObj.click(function() {
					hideObj();
				})
			};

			toggleObj.hide();
			if(triggerEvent == 'mouseover') {
				$self.hover(function() {
					showObj()
				}, function() {
					hideObj()
				});
			} else {
				$self.click(function() {
					toggleObj.is(':hidden') ? showObj() : hideObj()
				});
			};

		});
	};
})(jQuery);

!(function($) {
	$.fn.centerIt = function(options) {
		return this.each(function() {
			var opts = $.extend({}, options);
			var $self = $(this);
			var thisWidth = $self.outerWidth();
			var thisHeight = $self.outerHeight();

			$self.css({
				position: 'absolute',
				left: '50%',
				top: '50%',
				marginLeft: -thisWidth / 2,
				marginTop: -thisHeight / 2
			});

		});
	};

})(jQuery);

/*
 * tableUI
 * 使用tableUI可以方便地将表格提示使用体验。先提供的功能有奇偶行颜色交替，鼠标移上高亮显示
 */
!(function($) {
	$.fn.tableUI = function(options) {
		$.fn.tableUI.defaults = {
			evenRowClass: "evenRow",
			oddRowClass: "oddRow",
			activeRowClass: "activeRow",
			clickRowClass: "clickRow"
		};
		var opts = $.extend({}, $.fn.tableUI.defaults, options);
		var evenRowClass = opts.evenRowClass,
			oddRowClass = opts.oddRowClass,
			activeRowClass = opts.activeRowClass,
			clickRowClass = opts.clickRowClass;

		return this.each(function() {
			var $this = $(this),
				$trs = $this.find("tr"),
				$trsEven = $this.find("tr:even"),
				$trsOdd = $this.find("tr:odd");

			$trsEven.addClass(evenRowClass);
			$trsOdd.addClass(oddRowClass);
			$trs.click(function() {
				$(this).addClass(clickRowClass).siblings().removeClass(clickRowClass);
			});
			$trs.hover(function() {
				$(this).addClass(activeRowClass);
			}, function() {
				$(this).removeClass(activeRowClass);
			})
		});
	};
})(jQuery);

//----------------sidebarMenu----------------//
!(function($) {
	$.fn.sidebarMenu = function(options) {
		return this.each(function() {
			var $me = $(this);
			var animationSpeed = 300;

			$me.on('click', 'li a', function(event) {
				var checkElement = $(this).next();
				if(checkElement.is('.treeview-menu') && checkElement.is(':visible')) {
					checkElement.slideUp(animationSpeed, function() {
						checkElement.removeClass('menu-open');
					});
					checkElement.parent("li").removeClass("active");
				} else if((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
					var parent = $(this).parents('ul').first();
					var ul = parent.find('ul:visible').slideUp(animationSpeed);
					ul.removeClass('menu-open');
					var parent_li = $(this).parent("li");

					checkElement.slideDown(animationSpeed, function() {
						checkElement.addClass('menu-open');
						parent.find('li.active').removeClass('active');
						parent_li.addClass('active');
					});
				}
				if(checkElement.is('.treeview-menu')) {
					event.preventDefault();
				}
			});
		});
	};
})(jQuery);

!(function($) {
	$.fn.showDate = function() {
		return this.each(function() {
			var $me = $(this);
			var d = new Date();
			var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
			var _mm = "";
			var _dd = "";
			var _ww = "";
			_yy = d.getFullYear();
			_mm = d.getMonth() + 1;
			_dd = d.getDate();
			_ww = weekday[d.getDay()];
			$me.html(_yy + "年" + _mm + "月" + _dd + "日 " + _ww);
		});
	};
})(jQuery);

function setMainContHeight() {
	$('.main-sidebar').height(($(window).height() - 80) + 'px');
	$('.px-content').height(($(window).height() - 80) + 'px');
};

!(function($) {
	$.fn.echartSet = function(option) {
		return this.each(function() {
			var ec = echarts.init($(this)[0]),
				timer;
			ec.setOption(option);
			clearTimeout(timer);
			$(window).resize(function() {
				timer = setTimeout(ec.resize, 100)
			});
		});
	}
})(jQuery);

/**
!(function($){
  var methods = {
	  init : function(option) {
	   return this.each( function() {
					   var ec = echarts.init($(this)[0]), timer;
						   ec.setOption(option);
						   clearTimeout(timer);
						   $(window).resize(function(){
							   timer=setTimeout(ec.resize, 100)
						   });
			   });
	 },
	 clear : function(option) {
	   return this.each(function(){
				 var ec = echarts.init($(this)[0]);
					 ec.setOption(option);
					 ec.clear;
	   })
	 }
  };

  $.fn.echartSet = function( method ) {
	if ( methods[method] ) {
	  return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	} else if ( typeof method === 'object' || ! method ) {
	  return methods.init.apply( this, arguments );
	} else {
	  $.error('方法' + method + '不存在' );
	}    
  
  };
})(jQuery);	
**/

function ascSort(a, b) {
	return a - b
}

function descSort(a, b) {
	return b - a
}

$(function() {
	var a = ["33", "44", "11", "22", "88", "66"];
	var b = [1, 2, 3, 4];
	//	var b=a.reverse();
	//  var b= a.slice(1,-2)
	//	a.sort(descSort);
	//	console.log(b);
	//	console.log(b);

	var arr = a;
	arr.push(1, 2, 3);
	arr.pop();
	//  console.log(arr);
	// $(window).on("click", function(){
	// 		var r=confirm("这个对吗？");
	//      r?alert("好的"):alert("取消")
	// })

	var a = ["a", "b", "c", "d"],
		b = [],
		c = ["m"];
	for(var i = 0; i < a.length; i++) {
		b[i] = a[i]
	}
	//	console.log(b)

	function eqArr(a, b) {
		if(a.length != b.length) {
			return false;
		}
		for(var i = 0; i < a.length; i++) {
			if(a[i] != b[i]) {
				return false;
			}
		}
		return true;
	}
	//	console.log(eqArr(a,c))

	function getList() {
		var $list = $("#checkBox input"),
			arr = [];
		$list.each(function() {
			if($(this).prop("checked")) {
				arr.push($(this).attr("id"))
			}
		});
		return arr;
	}
	//	console.log(getList())

	$("#checkBox input").change(function() {
		console.log(getList())
	})

	$("#dateTody").showDate();

	$('.sidebar-menu').sidebarMenu();

	setMainContHeight();
	var timer;
	$(window).resize(function() {
		clearTimeout(timer);
		timer = setTimeout(setMainContHeight, 200);
	});

	//===============返回顶部=================//
	var $backToTopEle = $('<a href="javascript:void(0)" class="backToTop" title="返回顶部" alt="返回顶部"></a>').appendTo($("body"));
	$backToTopEle.click(function() {
		$("html, body").animate({
			scrollTop: 0
		}, 200);
	});

	function backToTop() {
		var st = $(document).scrollTop(),
			winh = $(window).height();
		st > 0 ? $backToTopEle.show() : $backToTopEle.hide();
	};
	$(function() {
		$(window).on("scroll", function() {
			backToTop()
		});
	});

	//quick-menu定义	
	function lefts() {
		var leftPx, winWidth = $(window).width();
		if(winWidth >= 1400) {
			leftPx = (winWidth - 1200) / 2 - 100;
		}
		$("#quick-menu").css("left", leftPx);
	}
	lefts();

	$(window).resize(function() {
		lefts();
	});

	$(".b-list a:last-child,.av-img-list li:last-child,.slide-box2 .hd li:last-child,.lawyer-online .u1 li:nth-child(4n),.lawyer-online .u2 li:nth-child(3n),.cjbd .pic-box li:nth-child(3n),.member-center .bd .a-list li:nth-child(2n),.time-axis .txt-info ul li:last-child").addClass("last");
	$(".slide-box2 .hd li:first-child,.time-axis .txt-info ul li:first-child").addClass("first");

	//显示隐藏信息找律师-详情页
	$(".moreToggle").click(function() {
		$(this).toggleClass("on");
		var $temp = $(this).closest(".lawyerBox").find(".moreToggleBox");
		$temp.slideToggle("fast");
		if($temp.is(":hidden")) {
			$(this).html("收起更多");
		} else {
			$(this).html("查看更多");
		}

	});
})