/**	
 *  header js
 *  by:lfping
 *  time:2017年9月1日14:10:44
 *  log:网站尾部 js
 */
//模块化加载 引入jQ jQui
;require(['config'],function(){
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
	})
});