$(function() {
	
  $('html,.boxscroll').niceScroll({ cursorcolor: '#444', cursorborder: '#000', cursorwidth: 10, railpadding: {right: 2} });
	
	$('.table-sort').dataTable({
		searching: true, //是否开启本地搜索
		lengthChange: true, //是否允许用户改变表格每页显示的记录数
		paging: true, //是否开启本地分页
		info: true, //控制是否显示表格左下角的信息
		order: [1, 'asc'], //asc升序   desc降序 
		aoColumnDefs: [{
			orderable: false,
			aTargets: [0, 5] // 指定列不参与排序
		}]
	});
	
	
	//一般直接写在一个js文件中
	layui.use(['table', 'layer'], function() {
		var layuiTable = layui.table;
		var layer = layui.layer;
		//第一个实例
		layuiTable.render({
			elem: '#demo',
			height: 400,
			width: 1000,
			url: 'js/json/data.json',
			done:function(res, curr, count){
				$('.layui-table-box .layui-table-body').niceScroll({ 
					cursorcolor: '#999', 
					cursorborder: '#000', 
					cursorwidth: 12, 
					autohidemode: false,
					railpadding: {right:1} 
				});
			},
			page: true, //开启分页
//			size: "lg",
//			even: true, //隔行变色
//			skin: 'row',
			//line （行边框风格） 
			//row （列边框风格） 
			//nob （无边框风格）
			cols: [
				[ //表头
				    { type:'checkbox' },
					{
						field: 'id',
						title: 'ID',
						sort: true,
//						fixed: 'left'
					}, {
						field: 'username',
						title: '用户名'
					}, {
						field: 'sex',
						title: '性别'
					}, {
						field: 'city',
						title: '城市'
					}, {
						field: 'sign',
						title: '签名'
					}, {
						field: 'experience',
						title: '积分',
						sort: true
					}, {
						field: 'score',
						title: '评分',
						sort: true
					}, {
						field: 'classify',
						title: '职业'
					}, {
						field: 'wealth',
						title: '财富'
					}
				]
			]
		});
	});
})