!(function($) {
	$.fn.sidebarMenu = function() {
		return this.each(function() {
			var animationSpeed = 200;
			$(this).on('click', 'li a', function(event) {
				var $this = $(this);
				var checkEle = $this.next();
				if(checkEle.is('.treeview-menu') && checkEle.is(':visible')) {
					checkEle.slideUp(animationSpeed, function() {
						checkEle.removeClass('menu-open');
					});
					checkEle.parent("li").removeClass("active");
				} else if((checkEle.is('.treeview-menu')) && (!checkEle.is(':visible'))) {
					var parent = $this.parents('ul').first();
					var ul = parent.find('ul:visible').slideUp(animationSpeed);
					var parent_li = $this.parent("li");
					ul.removeClass('menu-open');
					checkEle.slideDown(animationSpeed, function() {
						checkEle.addClass('menu-open');
						parent.find('li.active').removeClass('active');
						parent_li.addClass('active');
					});
				}
				if(checkEle.is('.treeview-menu')) {
					event.preventDefault();
				}
			});
		});
	}
})(jQuery);