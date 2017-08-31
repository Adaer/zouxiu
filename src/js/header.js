/**	
 *  header js
 *  by:lfping
 *  time:2017年8月31日16:24:21
 *  log:网站头部页面
 */
require.config({
	urlArgs: "bust=" +  (new Date()).getTime(),//(版本号)时间戳解决浏览器缓存问题
	paths:{	//路径别名
		jQuery:'../lib/jquery-3.2.1',
		jQueryui:'../lib/jquery-ui-1.12.1/jquery-ui',
		carouselJS:'../lib/Carousel/js/ObjCarousel',
		zoomImg:'../lib/Magnifier/js/Magnifier'
	},
	shim:{
		jQueryui:['jQuery'],
		carouselJS:['jQuery'],
	}
});
//模块化加载 引入jQ jQui carouselJS(轮播图插件)
;require(['jQuery'],function(){
	//顶部 个人信息 显示隐藏
	var $topMyshow = $('.top-myshow');
	//给隐藏的个人信息 设置宽度
	$topMyshow.next().css({width:[$topMyshow.parent('li').width()]});
	//鼠标移入移出
	$topMyshow.parent('li').on('mouseenter',function(){
		$(this).css({
			background:"#fff",
			borderRight: "1px solid #e6e6e6",
			borderLeft: "1px solid #e6e6e6",
			borderTop: "1px solid #e6e6e6"
		}).children('a').css({
			color:"#f33"
		});
		$topMyshow.next().stop().show(60);
	})
	.on('mouseleave',function(){
		var time = setTimeout(function(){
			$topMyshow.parent('li').css({
				background:"#333",
				borderRight: "1px solid #333",
				borderLeft: "1px solid #333",
				borderTop: "1px solid #333"
			}).children('a').css({
				color:"#e6e6e6"
			});		
			$topMyshow.next().stop().hide(60);
		},200);
	});
	//顶部搜索框特效
	var $topSeach = $(".top-seach");
	$topSeach.children("#top-keywd").focus(function(){
		$topSeach.children().eq(0).hide()
	}).blur(function(){
		$topSeach.children().eq(0).show()
	})
});