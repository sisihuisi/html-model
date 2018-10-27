var chinaMap='./js/echart/map/json/china.json';

function initEchart1(){
	$.getJSON(chinaMap, function(geoJson) {
		echarts.registerMap('china', geoJson);
		var geoCoordMap = {
		    '海口': [109.8,19],
		    '乌鲁木齐': [87.9236,43.5883],
		    '乌鲁木齐2': [85,42],
		    '乌鲁木齐3': [84,38],
		    '拉萨': [91.1865,30.1465],
		    '拉萨2': [89,31],
		    '西宁': [94,35],
		    '西宁2': [92,36],
		    '昆明': [102.9199,25.4663],
		    '银川': [106.3586,38.1775],
		    '兰州': [103.5901,36.3043],
		    '成都': [103.9526,30.7617],
		    '贵阳': [106.6992,26.7682],
		    '南宁': [108.479,23.1152],
		    '呼和浩特': [110.4124,41.5],
		    '西安': [109.1162,34.2004],
		    '郑州': [113.4668,34.6234],
		    '武汉': [114.3896,30.6628],
		    '长沙': [113.0823,28.2568],
		    '广州': [113.5107,23.2196],
		    '北京': [116.4551,40.2539],
		    '天津': [117.4219,39.4189],
		    '石家庄': [114.4995,38.1006],
		    '太原': [112.3352,37.9413],
		    '哈尔滨': [126.9688,47.368],
		    '长春': [125.8154,44.2584],
		    '沈阳': [123.1,40.1216],
		    '南京': [118.8062,31.9208],
		    '济南': [117.1582,36.8701],
		    '杭州': [119.5313,29.8773],
		    '香港': [114.28,22.58],
		    '台湾': [120.95,23.9]
		};
	
		var data1 = [
		    [{name:'乌鲁木齐'}, {name:'西安'}],
		    [{name:'乌鲁木齐3'}, {name:'西安'}],
		    [{name:'拉萨'}, {name:'西安'}],
		    [{name:'拉萨2'}, {name:'西安'}],
		    [{name:'西宁'}, {name:'西安'}],
		    [{name:'西宁2'}, {name:'西安'}]
		];
	
		var data2 = [
		    [{name:'乌鲁木齐2'}, {name:'西安'}],
		    
		];
		
		var convertData = function (data) {
	    var res = [];
		    for (var i = 0; i < data.length; i++) {
		        var dataItem = data[i];
		        var fromCoord = geoCoordMap[dataItem[0].name];
		        var toCoord = geoCoordMap[dataItem[1].name];
		        if (fromCoord && toCoord) {
		            res.push({
		                fromName: dataItem[0].name,
		                toName: dataItem[1].name,
		                coords: [fromCoord, toCoord]
		            });
		        }
		    }
		    return res;
		};
	
	var pic = [
	    'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z', 
	    'image://./assets/images/dtt.png'
	];
	var color = ['#00ffea', '#ffe866'];
	var series = [];
	[['西安', data1], ['西安', data2]].forEach(function (item, i) {
	    series.push({
	    	//线路设置
	        name: item[0],
	        type: 'lines',
	        zlevel: 1,
	        effect: { show: true, period: 6, trailLength: 0.4, color: '#fff', symbolSize: 3 },
	        lineStyle: { normal: { color: color[i], width: 0, curveness: 0.2 } },
	        data: convertData(item[1])
	    },
	    {
	    	//飞机设置
	        name: item[0],
	        type: 'lines',
	        zlevel: 2,
	        effect: { show: true, period: 6, trailLength: 0, symbol: pic[i], symbolSize: [18,26] },
	        lineStyle: {  normal: { color: color[i], width: 1, opacity: 0.6, curveness: 0.2 } },
	        data: convertData(item[1])
	    },
	    {
	        name: item[0],
	        type: 'effectScatter',
	        coordinateSystem: 'geo',
	        symbolSize: 5,
	        zlevel: 2,
	        data: item[1].map(function (dataItem) {
	            return {
	                name: dataItem[1].name,
	                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
	            };
	        })
	    });
	});	
	
	var option = {
	    tooltip : {
	        trigger: 'item'
	    },
	    geo: {
	        map: 'china',
	        regions: [
		        {
				    name: '新疆',
				    itemStyle: { 
				    	normal: { areaColor: '#fe5f5f', borderColor: '#fe5f5f' },
				    	emphasis: { areaColor: '#8e3333', borderColor: '#8e3333' } 
				    }
				},
				{
				    name: '青海',
				    itemStyle: { 
				    	normal: { areaColor: '#dc3f3f', borderColor: '#dc3f3f'},
				    	emphasis: { areaColor: '#8e3333', borderColor: '#8e3333' } 
				    }
				},
				{
				    name: '西藏',
				    itemStyle: { 
				    	normal: { areaColor: '#ec5151', borderColor: '#ec5151' },
				    	emphasis: { areaColor: '#8e3333', borderColor: '#8e3333' } 
				    }
				}
	        ],
	        label:{	
	        	normal:{ show:true, textStyle: { fontSize: 14, color : '#c4e7ff'  }  },
	        	emphasis:{  textStyle: { fontSize: 14, color : '#c4e7ff' } }
	        },
	        itemStyle: { 
	        	normal: { areaColor: 'transparent', borderColor: '#357fff' },
	            emphasis: { areaColor: 'rgba(53,83,164,0.8)' }
	        }
	    },
	    series: series
	};
	
	$('#em1').echartSet(option);
		
	});

};




var dataAll=arrData(1000,30);
var data_mout=getRdData(dataAll, 8);

var dateBase = [];
var _date = new Date();
    _date.setFullYear(2016,1,1);
var i=8;    
while ( i-- ) {
    dateBase.push([
//      _date.getFullYear(),
        _date.getMonth(),
        _date.getDate() + i
    ].join('-'));
};

function arrMax(val){
    return Math.max.apply(null, val);
};

function myFormatter(p) {
    if ( arrMax(option1.series[0].data) == p.value ) {
        return " ";
    } else {
        return p.value;
    }
};

function myFormatter2(p) {
    var colorList;
    if ( p.data >= arrMax(option1.series[0].data) ) {
        colorList = '#fe5f5f';
    } else {
        colorList = '#ffe866';
    }
    return colorList;
};


function creatData(){
	var res=arrData(6,5000);
//		res.sort(sortNumber);
	return res;
};

var hotel=[
"美伦酒店","东方大酒店","凤城大酒店","钟楼大酒店","香格里拉酒店","陇海大酒店","金鑫酒店","雅居酒店","温馨家园","万客来酒店","时代酒店","馨园梦雅",
"卓怡酒店","颐馨酒店","恒悦酒店","怡清园酒店","沁园酒店","缘遇酒店","雅之家","春光小城","四季酒店","聚缘酒店","万豪酒店","合龙酒店",
"朋来酒店","诚洁酒店","静园酒店","福临酒店","忆家酒店","嘉诚酒店","馨缘酒店","聚贤酒店","百川酒店","怡都酒店","雅艺酒店","馨雅酒店",
"留香阁","松竹梅","怡馨酒店","龙门酒店","客站酒店","雅园酒店","事赢酒店","万家宾城","佳源酒店","华舒酒店","金泰酒店","金廷酒店", "德馨酒店",
"源合酒店","同鑫酒店","雅轩酒店","鑫意酒店","金诚酒店"
 ];
 
var color=["#fe5f5f","#fc7e3a","#ffe866","#6cba5f","#5bd5e7","#8a47be"];

function initEchart2(){
	var option = {
	    animationDuration: 2000,
		animationEasing: 'elasticOut',
		textStyle: { color: '#65aacb', fontSize: 12 },
		itemStyle: { normal: { barBorderRadius: [0, 3, 3, 0] } },
		title: {
			text: ' 住同一个酒店的时间段有重叠',
			left: 10, top:10,
			textStyle: { color: '#fff', fontWeight: 'normal', fontSize: 18, }
		},
		tooltip : {
	        trigger: 'axis',
	        axisPointer : { type : 'shadow' }
	    },
		calculable: true,
		grid: {
			top: '15%', bottom: '25%'
		},
		yAxis: [{
			type: 'category',
			axisLabel: {
				interval: 0
			},
			data: getRdData(hotel,6),
			axisLine: {  lineStyle: { width: 1,  color: '#b5c3f9' } },
	        splitLine: { lineStyle: { color: '#003098', type: 'dashed', opacity:'0.6' } }
		}],
		xAxis: [{
			type: 'value',
			name: '单位: 人',
			axisLabel:{  textStyle: {fontSize:12}},
	        axisLine: { lineStyle: { width: 1, color: '#b5c3f9' } },
		    splitLine: { show:false },
		}],
		series: [
		{
			name: '人数',
			type: 'bar',
			barWidth: '50%',
			data: creatData(),
			itemStyle:{ 
				normal:{ 
					color: function(params) {
					   return color[params.dataIndex]
				    } 
				}
			}
		}]
	};
    $('#em2').echartSet(option);
}



// 产生0--i之间的整数随机数
function randomData(i) {
    return Math.round(Math.random()*i); 
};

function initEchart3(){
	$.getJSON(chinaMap, function(geoJson) {
		echarts.registerMap('china', geoJson);
		var geoCoordMap = {
		      '乌鲁木齐': [87.9236,43.5883],
		      '阿克苏': [82.9236,40.5883],
		      '上海': [121.4648, 31.2891],
		      '东莞': [113.8953, 22.901],
		      '东营': [118.7073, 37.5513],
		      '中山': [113.4229, 22.478],
		      '临汾': [111.4783, 36.1615],
		      '临沂': [118.3118, 35.2936],
		      '丹东': [124.541, 40.4242],
		      '丽水': [119.5642, 28.1854],
		      '佛山': [112.8955, 23.1097],
		      '保定': [115.0488, 39.0948],
		      '兰州': [103.5901, 36.3043],
		      '包头': [110.3467, 41.4899],
		      '北京': [116.4551, 40.2539],
		      '北海': [109.314, 21.6211],
		      '南京': [118.8062, 31.9208],
		      '南宁': [108.479, 23.1152],
		      '南昌': [116.0046, 28.6633],
		      '南通': [121.1023, 32.1625],
		      '厦门': [118.1689, 24.6478],
		      '台州': [121.1353, 28.6688],
		      '合肥': [117.29, 32.0581],
		      '呼和浩特': [111.4124, 40.4901],
		      '咸阳': [108.4131, 34.8706],
		      '哈尔滨': [127.9688, 45.368],
		      '唐山': [118.4766, 39.6826],
		      '嘉兴': [120.9155, 30.6354],
		      '大同': [113.7854, 39.8035],
		      '大连': [122.2229, 39.4409],
		      '天津': [117.4219, 39.4189],
		      '太原': [112.3352, 37.9413],
		      '威海': [121.9482, 37.1393],
		      '宁波': [121.5967, 29.6466],
		      '宝鸡': [107.1826, 34.3433],
		      '宿迁': [118.5535, 33.7775],
		      '常州': [119.4543, 31.5582],
		      '广州': [113.5107, 23.2196],
		      '廊坊': [116.521, 39.0509],
		      '延安': [109.1052, 36.4252],
		      '张家口': [115.1477, 40.8527],
		      '徐州': [117.5208, 34.3268],
		      '德州': [116.6858, 37.2107],
		      '惠州': [114.6204, 23.1647],
		      '成都': [103.9526, 30.7617],
		      '扬州': [119.4653, 32.8162],
		      '承德': [117.5757, 41.4075],
		      '拉萨': [91.1865, 30.1465],
		      '无锡': [120.3442, 31.5527],
		      '日照': [119.2786, 35.5023],
		      '昆明': [102.9199, 25.4663],
		      '杭州': [119.5313, 29.8773],
		      '枣庄': [117.323, 34.8926],
		      '柳州': [109.3799, 24.9774],
		      '株洲': [113.5327, 27.0319],
		      '武汉': [114.3896, 30.6628],
		      '汕头': [117.1692, 23.3405],
		      '江门': [112.6318, 22.1484],
		      '沈阳': [123.1238, 42.1216],
		      '沧州': [116.8286, 38.2104],
		      '河源': [114.917, 23.9722],
		      '泉州': [118.3228, 25.1147],
		      '泰安': [117.0264, 36.0516],
		      '泰州': [120.0586, 32.5525],
		      '济南': [117.1582, 36.8701],
		      '济宁': [116.8286, 35.3375],
		      '海口': [110.3893, 19.8516],
		      '淄博': [118.0371, 36.6064],
		      '淮安': [118.927, 33.4039],
		      '深圳': [114.5435, 22.5439],
		      '清远': [112.9175, 24.3292],
		      '温州': [120.498, 27.8119],
		      '渭南': [109.7864, 35.0299],
		      '湖州': [119.8608, 30.7782],
		      '湘潭': [112.5439, 27.7075],
		      '滨州': [117.8174, 37.4963],
		      '潍坊': [119.0918, 36.524],
		      '烟台': [120.7397, 37.5128],
		      '玉溪': [101.9312, 23.8898],
		      '珠海': [113.7305, 22.1155],
		      '盐城': [120.2234, 33.5577],
		      '盘锦': [121.9482, 41.0449],
		      '石家庄': [114.4995, 38.1006],
		      '福州': [119.4543, 25.9222],
		      '秦皇岛': [119.2126, 40.0232],
		      '绍兴': [120.564, 29.7565],
		      '聊城': [115.9167, 36.4032],
		      '肇庆': [112.1265, 23.5822],
		      '舟山': [122.2559, 30.2234],
		      '苏州': [120.6519, 31.3989],
		      '莱芜': [117.6526, 36.2714],
		      '菏泽': [115.6201, 35.2057],
		      '营口': [122.4316, 40.4297],
		      '葫芦岛': [120.1575, 40.578],
		      '衡水': [115.8838, 37.7161],
		      '衢州': [118.6853, 28.8666],
		      '西宁': [101.4038, 36.8207],
		      '西安': [109.1162, 34.2004],
		      '贵阳': [106.6992, 26.7682],
		      '连云港': [119.1248, 34.552],
		      '邢台': [114.8071, 37.2821],
		      '邯郸': [114.4775, 36.535],
		      '郑州': [113.4668, 34.6234],
		      '鄂尔多斯': [108.9734, 39.2487],
		      '重庆': [107.7539, 30.1904],
		      '金华': [120.0037, 29.1028],
		      '铜川': [109.0393, 35.1947],
		      '银川': [106.3586, 38.1775],
		      '镇江': [119.4763, 31.9702],
		      '长春': [125.8154, 44.2584],
		      '长沙': [113.0823, 28.2568],
		      '长治': [112.8625, 36.4746],
		      '阳泉': [113.4778, 38.0951],
		      '青岛': [120.4651, 36.3373],
		      '韶关': [113.7964, 24.7028]
		    
		};
		var data1 = [
		    {name:'乌鲁木齐',value:10},
		    {name:'阿克苏',value:10},
		    {name:'呼和浩特',value:10},
		    {name:'西安',value:10},
		    {name:'拉萨',value:10},
		    {name:'西宁',value:10},
		    {name:'银川',value:10},
		    {name:'成都',value:10},
		    {name:'郑州',value:10},
		    {name:'广州',value:10},
		    {name:'北京', value:10},
		    {name:'哈尔滨',value:10},
		    {name:'长春',value:10},
		    {name:'沈阳',value:10},
		    {name:'南京',value:10},
		    {name:'济南',value:10},
		    {name:'杭州',value:10},
		    {name:'昆明',value:10},
		    {name:'武汉',value:10},
		    {name:'贵阳',value:10},
		    {name:'长沙',value:10},
		    {name:'太原',value:10},
		    {name:'兰州',value:10},
		    {name:'南宁',value:10}
		];

//		var data1=[];
//		for(var x in geoCoordMap){
//		    data1.push({ name: x, value: 10 } )
//		}
		
		var convertData = function (data) {
	    var res = [];
		    for (var i = 0; i < data.length; i++) {
		        var fromCoord = geoCoordMap[data[i].name];
		        var toCoord = geoCoordMap['西安'];
		        if (fromCoord && toCoord) {
		            res.push({
		                fromName: data[i].name,
		                toName: ['西安'],
		                coords: [fromCoord, toCoord]
		            });
		        }
		    }
		    return res;
		};
	
	//	var plt = [
	//	    'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
	//	];
		var color = ['#00ffea'];
		var series = [];
		[['西安', data1]].forEach(function (item, i) {
		    series.push({
		    	//线路设置
		        name: item[0],
		        type: 'lines',
		        zlevel: 1,
		        effect: { show: true, period: 5, trailLength: 0.4, color: '#fff', symbolSize: 3 },
		        lineStyle: { normal: { color: color[i], width: 0, curveness: 0.2 } },
		        data: convertData(item[1])
		    },
		    {
		    	//飞机设置
		        name: item[0],
		        type: 'lines',
		        zlevel: 2,
		        effect: { show: true, period: 5, trailLength: 0, },
		        lineStyle: {  normal: { color: color[i], width: 1, opacity: 0.6, curveness: 0.2 } },
		        data: convertData(item[1])
		    },
		    {
		        name: item[0],
	            type: 'effectScatter',
	            coordinateSystem: 'geo',
	            zlevel: 2,
	            rippleEffect: {
	            	period: 4,
	                scale: 2,
	                brushType: 'stroke'
	            },
	            label: {
	              normal: {
	              	  textStyle: { fontSize: 12, color : '#fff'  } ,
	                  show: true,
	                  position: 'right',
	                  formatter: '{b}'
	              }
	            },
		        data: item[1].map(function (dataItem) {
		            return {
		                name: dataItem.name,
		                value: geoCoordMap[dataItem.name].concat([dataItem.value])
		            };
		        })
		    });
		});	
	
		var option = {
		    tooltip: {
	          trigger: 'item',
	          formatter: function(params) {
//	          	  console.log(params.seriesIndex);
	              if (params.seriesIndex == 2) {
	                  return params.name + '→' + params.seriesName + '  ' + params.data.value[2] + '人次';
	              } else if (params.seriesIndex == 1) {
	                  return params.data.fromName + '→' + params.data.toName;
	              }
	          }
	        },
		    geo: {
		        map: 'china',
		        label:{	
		        	emphasis:{  show:false }
		        },
		        itemStyle: { 
		        	normal: { areaColor: 'transparent', borderColor: '#357fff' },
		            emphasis: { areaColor: 'rgba(53,83,164,0.8)' }
		        }
		    },
	    series: series
	};
    
    $('#em3').echartSet(option);
});

};


function initEchart4(){
	var option = {
		    animationDuration: 2000,
		    animationEasing: 'elasticOut',
		    color: [ '#fc5858'],
	        textStyle: { color: '#ccc', fontSize: 14 },
		    title: {
		        text: '预警趋势图',
		        left:'left', top: 0,
		        textStyle: { color: '#fff', fontWeight: 'normal', fontSize: 18, }
		    },
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            
		            type : 'shadow'        
		        }
		    },
		    legend: {
		    	show:false,
		        data:['关注人员'],
		        orient: 'horizontal',
		        left:'20%', top: 30, right: '5%',
			    textStyle: { color: '#ccc', fontSize: 14 },
		    },
		    grid: {
		    	top: '15%', left: '5%', right: '5%', bottom: '5%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'category',
		        axisLine: { lineStyle: { width: 1, color: '#003098' } },
		        splitLine: { show:true, lineStyle: { color: '#003098', opacity:'0.6' }  },
		        data: ['12-10','12-11','12-12','12-13','12-14','12-15','12-16','12-17','12-18','12-19']
		    },
		    yAxis: {
		        type: 'value',
		        axisLine: {  lineStyle: { width: 1,  color: '#003098' } },
		        splitLine: { lineStyle: { color: '#003098', type: 'dashed', opacity:'0.6' } }
		    },
		    series: [
		        {
		            name:'关注人员',
		            type:'bar',
		            barWidth: '60%',
		            data:[randomData(1000), randomData(1000), randomData(1000), randomData(1000), randomData(1000), randomData(1000), randomData(1000), randomData(1000), randomData(1000), randomData(1000)]
		        }
		    ]
	};
	$('#em4').echartSet(option);
};


function initEchart5(){
	placeHolderStyle = {
    normal: {
        label: { show: false,position: "center" },
        labelLine: { show: false },
        color: "#dedede", borderColor: "#dedede", borderWidth: 0
    },
    emphasis: {
        color: "#dedede",  borderColor: "#dedede", borderWidth: 0
    }
};
var option = {
    textStyle: { color: '#fff' },
    legend: [{
        orient: '',
        icon: 'circle', left: 'right', top: 'center',
        textStyle: { color: '#fff' },
        data: ['不喜欢', '喜欢', '跳过']
    }],
    series: [{
        name: '值',
        type: 'pie',
        clockWise: true, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        radius: [199, 200],
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    position: 'outside'
                },
                labelLine: {
                    show: true,
                    length: 100,
                    smooth: 0.5
                },
                borderWidth: 10,
                shadowBlur: 40,
                borderColor: "#fc7a26",
                shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
            }
        },
        data: [{
            value: 7,
            name: '70%'
        }, {
            value: 3,
            name: '',
            itemStyle: placeHolderStyle
        }]
    }, {
        name: '白',
        type: 'pie',
        clockWise: false,
        radius: [180, 180],
        hoverAnimation: false,
        data: [{
            value: 1
        }]
    }, {
        name: '值',
        type: 'pie',
        clockWise: true,
        hoverAnimation: false,
        radius: [159, 160],
        itemStyle: {
            normal: {
                label: {
                    show: true
                },
                labelLine: {
                    show: true,
                    length: 100,
                    smooth: 0.5
                },
                borderWidth: 10,
                shadowBlur: 40,
                borderColor: "#e44545",
                shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
            }
        },
        data: [{
            value: 6,
            name: '60%'
        }, {
            value: 4,
            name: '',
            itemStyle: placeHolderStyle
        }]
    }, {
        name: '白',
        type: 'pie',
        clockWise: false,
        hoverAnimation: false,
        radius: [140, 140],
        data: [{
            value: 1
        }]
    }, {
        name: '值',
        type: 'pie',
        clockWise: true,
        hoverAnimation: false,
        radius: [119, 120],
        itemStyle: {
            normal: {
                label: {
                    show: true
                },
                labelLine: {
                    show: true,
                    length: 100,
                    smooth: 0.5
                },
                borderWidth: 10,
                shadowBlur: 40,
                borderColor: "#09b41d",
                shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
            }
        },
        data: [{
            value: 4,
            name: '40%'
        }, {
            value: 6,
            name: '',
            itemStyle: placeHolderStyle
        }]
    }, {
        type: 'pie',
        data: [{
            value: '',
            name: '不喜欢'
        }, {
            value: '',
            name: '喜欢'
        }, {
            value: '',
            name: '跳过'
        }]
    }, {
        name: '白',
        type: 'pie',
        clockWise: true,
        hoverAnimation: false,
        radius: [100, 100],
        label: {
            normal: {
                position: 'center'
            }
        },
        data: [{
            value: 1,
            label: {
                normal: {
                    formatter: '投票人数',
                    textStyle: {
                        color: '#fff',
                        fontSize: 26
                    }
                }
            }
        }, {
            tooltip: {
                show: false
            },
            label: {
                normal: {
                    formatter: '\n 1200',
                    textStyle: {
                        color: '#fff',
                        fontSize: 26
                    }
                }
            }
        }]
    }]
};
	
	$('#em5').echartSet(option);
};

function initEchart6(){
  $.getJSON(chinaMap, function(geoJson) {
		echarts.registerMap('china', geoJson);
		var geoCoordMap = {
		      '乌鲁木齐': [87.9236,43.5883],
		      '阿克苏': [82.9236,40.5883],
		      '上海': [121.4648, 31.2891],
		      '东莞': [113.8953, 22.901],
		      '东营': [118.7073, 37.5513],
		      '中山': [113.4229, 22.478],
		      '临汾': [111.4783, 36.1615],
		      '临沂': [118.3118, 35.2936],
		      '丹东': [124.541, 40.4242],
		      '丽水': [119.5642, 28.1854],
		      '佛山': [112.8955, 23.1097],
		      '保定': [115.0488, 39.0948],
		      '兰州': [103.5901, 36.3043],
		      '包头': [110.3467, 41.4899],
		      '北京': [116.4551, 40.2539],
		      '北海': [109.314, 21.6211],
		      '南京': [118.8062, 31.9208],
		      '南宁': [108.479, 23.1152],
		      '南昌': [116.0046, 28.6633],
		      '南通': [121.1023, 32.1625],
		      '厦门': [118.1689, 24.6478],
		      '台州': [121.1353, 28.6688],
		      '合肥': [117.29, 32.0581],
		      '呼和浩特': [111.4124, 40.4901],
		      '咸阳': [108.4131, 34.8706],
		      '哈尔滨': [127.9688, 45.368],
		      '唐山': [118.4766, 39.6826],
		      '嘉兴': [120.9155, 30.6354],
		      '大同': [113.7854, 39.8035],
		      '大连': [122.2229, 39.4409],
		      '天津': [117.4219, 39.4189],
		      '太原': [112.3352, 37.9413],
		      '威海': [121.9482, 37.1393],
		      '宁波': [121.5967, 29.6466],
		      '宝鸡': [107.1826, 34.3433],
		      '宿迁': [118.5535, 33.7775],
		      '常州': [119.4543, 31.5582],
		      '广州': [113.5107, 23.2196],
		      '廊坊': [116.521, 39.0509],
		      '延安': [109.1052, 36.4252],
		      '张家口': [115.1477, 40.8527],
		      '徐州': [117.5208, 34.3268],
		      '德州': [116.6858, 37.2107],
		      '惠州': [114.6204, 23.1647],
		      '成都': [103.9526, 30.7617],
		      '扬州': [119.4653, 32.8162],
		      '承德': [117.5757, 41.4075],
		      '拉萨': [91.1865, 30.1465],
		      '无锡': [120.3442, 31.5527],
		      '日照': [119.2786, 35.5023],
		      '昆明': [102.9199, 25.4663],
		      '杭州': [119.5313, 29.8773],
		      '枣庄': [117.323, 34.8926],
		      '柳州': [109.3799, 24.9774],
		      '株洲': [113.5327, 27.0319],
		      '武汉': [114.3896, 30.6628],
		      '汕头': [117.1692, 23.3405],
		      '江门': [112.6318, 22.1484],
		      '沈阳': [123.1238, 42.1216],
		      '沧州': [116.8286, 38.2104],
		      '河源': [114.917, 23.9722],
		      '泉州': [118.3228, 25.1147],
		      '泰安': [117.0264, 36.0516],
		      '泰州': [120.0586, 32.5525],
		      '济南': [117.1582, 36.8701],
		      '济宁': [116.8286, 35.3375],
		      '海口': [110.3893, 19.8516],
		      '淄博': [118.0371, 36.6064],
		      '淮安': [118.927, 33.4039],
		      '深圳': [114.5435, 22.5439],
		      '清远': [112.9175, 24.3292],
		      '温州': [120.498, 27.8119],
		      '渭南': [109.7864, 35.0299],
		      '湖州': [119.8608, 30.7782],
		      '湘潭': [112.5439, 27.7075],
		      '滨州': [117.8174, 37.4963],
		      '潍坊': [119.0918, 36.524],
		      '烟台': [120.7397, 37.5128],
		      '玉溪': [101.9312, 23.8898],
		      '珠海': [113.7305, 22.1155],
		      '盐城': [120.2234, 33.5577],
		      '盘锦': [121.9482, 41.0449],
		      '石家庄': [114.4995, 38.1006],
		      '福州': [119.4543, 25.9222],
		      '秦皇岛': [119.2126, 40.0232],
		      '绍兴': [120.564, 29.7565],
		      '聊城': [115.9167, 36.4032],
		      '肇庆': [112.1265, 23.5822],
		      '舟山': [122.2559, 30.2234],
		      '苏州': [120.6519, 31.3989],
		      '莱芜': [117.6526, 36.2714],
		      '菏泽': [115.6201, 35.2057],
		      '营口': [122.4316, 40.4297],
		      '葫芦岛': [120.1575, 40.578],
		      '衡水': [115.8838, 37.7161],
		      '衢州': [118.6853, 28.8666],
		      '西宁': [101.4038, 36.8207],
		      '西安': [109.1162, 34.2004],
		      '贵阳': [106.6992, 26.7682],
		      '连云港': [119.1248, 34.552],
		      '邢台': [114.8071, 37.2821],
		      '邯郸': [114.4775, 36.535],
		      '郑州': [113.4668, 34.6234],
		      '鄂尔多斯': [108.9734, 39.2487],
		      '重庆': [107.7539, 30.1904],
		      '金华': [120.0037, 29.1028],
		      '铜川': [109.0393, 35.1947],
		      '银川': [106.3586, 38.1775],
		      '镇江': [119.4763, 31.9702],
		      '长春': [125.8154, 44.2584],
		      '长沙': [113.0823, 28.2568],
		      '长治': [112.8625, 36.4746],
		      '阳泉': [113.4778, 38.0951],
		      '青岛': [120.4651, 36.3373],
		      '韶关': [113.7964, 24.7028]
		};
		var data = [{
				        name: '长春',
				        value: 90
				    }, {
				        name: '长沙',
				        value: 10
				    }, {
				        name: '贵阳',
				        value: 20
				    }, {
				        name: '西安',
				        value: 20
				    }, {
				        name: '深圳',
				        value: 20
				    }, {
				        name: '济南',
				        value: 50
				    }, {
				        name: '海口',
				        value: 58
				    }, {
				        name: '沈阳',
				        value: 64
				    }, {
				        name: '武汉',
				        value: 68
				    }, {
				        name: '昆明',
				        value: 45
				    }, {
				        name: '杭州',
				        value: 68
				    }, {
				        name: '成都',
				        value: 49
				    }, {
				        name: '拉萨',
				        value: 66
				    }, {
				        name: '天津',
				        value: 86
				    }, {
				        name: '合肥',
				        value: 58
				    }, {
				        name: '呼和浩特',
				        value: 59
				    }, {
				        name: '哈尔滨',
				        value: 95
				    }, {
				        name: '北京',
				        value: 68
				    }, {
				        name: '南京',
				        value: 56
				    }, {
				        name: '南宁',
				        value: 89
				    }, {
				        name: '南昌',
				        value: 48
				    }, {
				        name: '乌鲁木齐',
				        value: 49
				    }, {
				        name: '上海',
				        value: 78
				    }];
    
    
    function formtGCData(geoData, data, srcNam, dest) {
        var tGeoDt = [];
        if (dest) {
            for (var i = 0; i < data.length; i++) {
                if (srcNam != data[i].name) {
                    tGeoDt.push({
                        coords: [geoData[srcNam], geoData[data[i].name]]
                    });
                }
            }
        } else {
            for (var i = 0; i < data.length; i++) {
                if (srcNam != data[i].name) {
                    tGeoDt.push({
                        coords: [geoData[data[i].name], geoData[srcNam]]
                    });
                }
            }
        }
        return tGeoDt;
    }
    
    
    function formtVData(geoData, data, srcNam) {
        var tGeoDt = [];
        for (var i = 0; i < data.length; i++) {
            var tNam = data[i].name
            if (srcNam != tNam) {
                tGeoDt.push({
                    name: tNam,
                    value: geoData[tNam]
                });
            }

        }
        tGeoDt.push({
            name: srcNam,
            value: geoData[srcNam],
            symbolSize: 8,
            itemStyle: {
                normal: {
                    color: 'red',
                    borderColor: '#000'
                }
            }
        });
        return tGeoDt;
    }
    
    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
//  var planePath = 'arrow';

	var option = {
		textStyle: { color: '#fff', fontWeight: 'normal'},
	    title: {
	        text: '格式化数据的简单迁徙图',
	        textStyle: { color: '#fff', fontWeight: 'normal', fontSize: 18, }
	    },
	    tooltip: {
	        trigger: 'item',
	    },
	    geo: {
	        map: 'china',
	        roam: true,
	        zoom: 1.25,
	        label:{	
	        	normal:{ show:false, textStyle: { fontSize: 14, color : '#c4e7ff'  }  },
	        	emphasis:{ show:false, textStyle: { fontSize: 14, color : '#c4e7ff' } }
	        },
	        itemStyle: { 
	        	normal: { areaColor: 'transparent', borderColor: '#357fff' },
	            emphasis: { areaColor: 'rgba(53,83,164,0.8)' }
	        }
	    },
	    series: [{
	    	    //出发飞机设置
	            type: 'lines',
	            zlevel: 2,
	            effect: { show: true, period: 6, trailLength: 0.1, color: '#f82', symbol: planePath, symbolSize: 22 },
	            lineStyle: { normal: { color: '#f82', width: 1, opacity: 0.2, curveness: 0.2 } },
	            data: formtGCData(geoCoordMap, data, '西安', true)
	          },
	          {
	          	//返回飞机设置
                type: 'lines',
                zlevel: 2,
                effect: { show: true, period: 6, trailLength: 0.1, color: '#e13636', symbol: planePath, symbolSize: 22 },
                lineStyle: { normal: { color: '#e13636', width: 1, opacity: 0.1, curveness: 0.2 } },
                data: formtGCData(geoCoordMap, data, '西安', false)
	            },
	            {
	
	                type: 'effectScatter',
	                coordinateSystem: 'geo',
	                zlevel: 2,
	                rippleEffect: { period: 4, scale: 5, brushType: 'stroke'},
	                label: { normal: { show: true, position: 'right', formatter: '{b}' } },
	                symbolSize: 5,
	                itemStyle: {  normal: { color: '#f00', }},
	                data: formtVData(geoCoordMap, data, '西安')
	            }]
	};
	    
	    
    $('#em6').echartSet(option);
});

	
	
};





$(function(){
	initEchart1(); 
	initEchart2();
	initEchart3();
	initEchart4();
	initEchart5();
	initEchart6();
});




