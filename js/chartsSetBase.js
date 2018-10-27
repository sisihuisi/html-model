/*  
 * @description: 各个模块的脚本集合
 * @author: *jacksu*
 * @update: *jacksu* (2017-4-1)  
 */
function sortNumber(a, b) {
	return a - b
};

// 产生1--i之间的整数随机数
function randomData(i) {
	return Math.round(1 + Math.random() * i);
};

//去处数组中重复元素
function unique(arr) {
	var temp = [], i = arr.length;
	while( i-- ) {
		if( temp.indexOf( arr[i] ) === -1) { //该元素在tmp内部不存在才允许追加
			temp.push( arr[i] );
		}
	};
	return temp;
};

// 产生n个0--num之间的随机数 放入数组 res
function arrData(n, num) {
	var temp = [];
	while( n-- ) {
		temp.push(Math.round(randomData(num - 1))); //产生1--num之间的随机数
	}
	return temp;
};

// 从 arr数组中随机取n个 组成新的数组
function getRdData(arr, n) {
	var shuffled = arr.slice(0), i = arr.length, min = i - n, temp, index;
	while( i-- > min ) {
		index = Math.floor((i + 1) * Math.random());
		temp = shuffled[index];
		shuffled[index] = shuffled[i];
		shuffled[i] = temp;
	}
	return shuffled.slice(min);
}

// 从arr中找出大于n的数
function findNum(arr, n) {
	var res = [], i = arr.length;
	while ( i-- ) {
		if( arr[i] > n ) {
			res.push( arr[i] );
		};
	};
	return res;
};




!(function($) {
	$.fn.echartSet = function(option) {
		return this.each(function() {
			var ec = echarts.init($(this)[0]), timer;
			ec.setOption(option);
			clearTimeout(timer);
			$(window).resize(function() {
				timer = setTimeout(ec.resize, 100);
			});
		});
	}
})(jQuery);

