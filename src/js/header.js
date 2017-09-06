/**	
 *  header js
 *  by:lfping
 *  time:2017年8月31日16:24:21
 *  time:2017年9月1日11:29:44
 *  log:网站头部 js
 */

//自定义模块化加载 引入jQ jQui
define(['config'],function(){
	
	//顶部 个人信息 显示隐藏
	var $topMyshow = $('.top-myshow');
	//给隐藏的个人信息 设置宽度
	$topMyshow.next().css({width:[$topMyshow.parent('li').width()]});
	//鼠标移入移出
	$topMyshow.parent('li').on('mouseenter',function(){
		$(this).css({
			background:"#fff",
			border: "1px solid #e6e6e6"
		}).children('a').css({
			color:"#f33"
		});
		$topMyshow.next().show();
	})
	.on('mouseleave',function(){
		var time = setTimeout(function(){
			$topMyshow.parent('li').css({
				background:"#333",
				border: "1px solid #333"

			}).children('a').css({
				color:"#e6e6e6"
			});		
			$topMyshow.next().hide();
		},200);
	});



	//顶部搜索框特效
	var $topSeach = $(".top-seach");
	$topSeach.children("#top-keywd").focus(function(){
		$topSeach.children().eq(0).hide()
	}).blur(function(){
		$topSeach.children().eq(0).show()
	});

	//导航菜单
	var $topMenu = $('.top-menu-wrap');
	$topMenu.on("mouseover","span",function(){
		$(this).next().stop().show();
		$(this).css({
			background:"#fff",
			borderTop:"1px solid #d7d7d7",
			borderLeft:"1px solid #d7d7d7",
			borderRight:"1px solid #d7d7d7",
			borderBottom:"1px solid #fff"
		})
	})
	.on("mouseleave","span",function(){
		var $there = $(this);
		var time = setTimeout(function(){
			$there.next().stop().hide();
		},200)
		$(this).css({
			background:"#f7f7f7",
			erTop:"1px solid #f7f7f7",
			borderLeft:"1px solid #f7f7f7",
			borderRight:"1px solid #f7f7f7",
			borderBottom:"0 none"
		})		
		//使用清除定时器 来解决移动到子菜单时 自动隐藏的问题
		$there.next().on("mouseenter",function(){
			$there.css({
				background:"#fff",
				borderTop:"1px solid #d7d7d7",
				borderLeft:"1px solid #d7d7d7",
				borderRight:"1px solid #d7d7d7",
				borderBottom:"1px solid #fff"				
			})				
			clearTimeout(time);
		})
		.on("mouseleave",function(){
			$(this).stop().hide();
			$there.css({
			background:"#f7f7f7",
			borderTop:"1px solid #f7f7f7",
			borderLeft:"1px solid #f7f7f7",
			borderRight:"1px solid #f7f7f7",
			borderBottom:"0 none"
			})			
		})
	});



	/*--------------页脚JS--------------*/
	//关税说明显示隐藏
	$('.ft-state').on("mouseenter",function(){
		$(this).children('.tariffs-box').stop().fadeIn(200)
	})
	.on("mouseleave",function(){
		$(this).children('.tariffs-box').stop().fadeOut(200)
	})	

	//微信二维码 隐藏 显示 高亮图标
	var $ftIcon = $('.ft-foot-center').find("ul a");
	$ftIcon.each(function(idx,ele){
		$(ele).on("mouseenter",function(){
			if(idx == 0){
				$(this).css({
					backgroundPosition:"0 -261px"
				})
				.next().stop().fadeIn(200);
			}else if(idx == 1){
				$(this).css({
					backgroundPosition:"-70px -261px"
				})
			}else if(idx == 2){
				$(this).css({
					backgroundPosition:"-143px -261px"
				})
			}else if(idx == 3){
				$(this).css({
					backgroundPosition:"-210px -261px"
				})
			}
		}).on("mouseleave",function(){
			if(idx == 0){
				$(this).css({
					backgroundPosition:"0 -224px"
				})
				.next().stop().fadeOut(200);
			}else if(idx == 1){
				$(this).css({
					backgroundPosition:"-70px -224px"
				})
			}else if(idx == 2){
				$(this).css({
					backgroundPosition:"-143px -224px"
				})
			}else if(idx == 3){
				$(this).css({
					backgroundPosition:"-210px -224px"
				})
			}
		})
	});	
});