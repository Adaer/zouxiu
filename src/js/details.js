require(['config','../lib/jquery-3.2.1'],function(){
		//引入头部 尾部 由于代码执行顺序问题，要先加载页面
		$("#header").load("../html/header.html header");
		$("#footer").load("../html/footer.html footer");

	require(['headJS','Magnifier','commonJS'],function(){
		//右侧悬浮效果
		var $aside = $(".aside"),
		frShut = $aside.children(".fr_shut");

		frShut.click(function(){
			$aside.fadeOut(200)
		})
		//获取url中的id 通过id 去ajax请求 找对对应商品 生成结构
		// 截取url数据
		var ids = getURLParams("idx");
		
		$.ajax({
			url:'../api/details.php',
			data:{
				guid:ids
			},
			success:function(res){
				console.log(res)
			}
		})
	})
})	