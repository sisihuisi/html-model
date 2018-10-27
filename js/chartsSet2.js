var dataAll=arrData(16,988);

var companyStyle=["0~40岁","41~50岁","51~55岁","56~60岁","61~65岁","66~100岁" ];
var colorStyle=["#fe5f5f","#fc7e3a","#ffe866","#6cba5f","#5bd5e7","#8a47be","#fe5f5f","#fc7e3a","#ffe866","#6cba5f","#5bd5e7","#8a47be","#fe5f5f","#fc7e3a","#ffe866","#6cba5f","#5bd5e7","#8a47be","#fe5f5f"];

//var pieData=[
//  {value:randomData(500), name:'0~40'},
//  {value:randomData(500), name:'41~50'},
//  {value:randomData(500), name:'51~55'},
//  {value:randomData(500), name:'56~60'},
//  {value:randomData(500), name:'61~65'},
//  {value:randomData(500), name:'66~100'},
//];


function pData(){
	var obj={}, res=[], len=companyStyle.length;
	for( var i=0; i<len; i++ ){
		obj.value=randomData(500); 
		obj.name=companyStyle[i];
		res.push(obj);
		obj = {};
	}
	return res
};


var option1 = {
    color: colorStyle,
    tooltip : {
        trigger: 'axis',
        axisPointer: { type : 'shadow' }
    },
    grid: {
        top: '3%', left: '1%', right: '1%', bottom: '1%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : companyStyle,
            axisLabel:{ rotate: 0, textStyle: {fontSize:12}  },
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'总人数',
            type:'bar',
            barWidth: '60%',
            data: dataAll,
            label: {
                 normal: {  
                 	show: true, 
                 	textStyle: { color:'#333' },
            		position: 'top',
                 	formatter: '{c}人'   
                 }
            },
            itemStyle:{ 
				normal:{ color: function(params) {
					return colorStyle[params.dataIndex]
				} }
			}
        }
    ]
};


var option2 = {
    tooltip : {
        trigger: 'axis',
    },
    grid: {
        top: '3%', left: '1%', right: '1%', bottom: '1%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : companyStyle,
            axisLabel:{ rotate: 0, textStyle: {fontSize:12}  },
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'总人数',
            type:'line',
            stack: '总量',
             data: dataAll,
            smooth: true,
            areaStyle: {normal: { color:"#6495ed" }},
            lineStyle: {  normal: { color:"#6495ed" } },
        }
    ]
};

var option3 = {
	textStyle: { color:"#333"},
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} (占比：{d}%)"
    },
    grid: {
        top: '3%', left: '1%', right: '1%', bottom: '1%',
    },
    series : [
        {
            name:'企业数',
            type:'pie',
            data: pData(),
            radius : '80%',
            center: ['50%', '50%'],
            label: {
                 normal: {  formatter: '{b}({c}人)\n{d}%'   }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function(idx) {
                 return Math.random() * 200;
            },
            itemStyle:{ 
            	normal:{ color: function(params) {
					 return colorStyle[params.dataIndex]
				}}
			}
        }
    ]
};


var option4 = {
    color:["#fe5f5f","#fc7e3a","#ffe866","#6cba5f","#5bd5e7","#8a47be","#fe5f5f","#fc7e3a","#ffe866","#6cba5f","#5bd5e7","#8a47be","#fe5f5f","#fc7e3a","#ffe866","#6cba5f","#5bd5e7","#8a47be","#fe5f5f"],
    tooltip: {
        trigger: 'item',
        formatter: "{b}({c}人)"
    },
    series: [{
    	name:"总人数",
        type: 'treemap',
        width: '100%',
        height: '100%',
        roam: false,
        nodeClick: false,//点击节点后的行为,false无反应
        breadcrumb: {
            show: false
        },
        label: { //描述了每个矩形中，文本标签的样式。
            normal: {
                show: true,
                position: "inside",
            }
        },
        data: pData()
    }]
};

$('#em1').echartSet(option1);






	



 
