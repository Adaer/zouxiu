/**	
 *  header js
 *  by:lfping
 *  time:2017年9月1日17:29:45
 *  log:网站主页 js
 */

//模块化加载 引入jQ
require(['config','../lib/jquery-3.2.1'],function(){
		//引入头部 尾部 由于代码执行顺序问题，要先加载页面
		$("#header").load("../src/html/header.html header");
		$("#footer").load("../src/html/footer.html footer");

	require(['headJS','carouselJS','commonJS'],function(){
		
		//首页轮播图
		Carousel({
			imgs:[{
					imgurl:'./img/banner/banner1.jpg',
					goal:'javascript:;'
				},{
					imgurl:'./img/banner/banner2.jpg',
					goal:'javascript:;'
				},{
					imgurl:'./img/banner/banner3.jpg',
					goal:'javascript:;'
				},{
					imgurl:'./img/banner/banner4.jpg',
					goal:'javascript:;'
				},{
					imgurl:'./img/banner/banner5.jpg',
					goal:'javascript:;'
				}
			],
			width:1200,
			height:610,
			tips:true,
			tipsSty:'nothing',/*参数:num,nothing*/
			control:false,
			seamless:false,
			type:'fade'
		});		

		//请求生成数据 
		var pro1 = new Promise(function(resolve,reject){
		//板块：首页 尖货推荐 板块
			$.ajax({
				url:"./api/homeRecom.php",
				type:"get",
				data:{recommend:"recommend"},
				success:function(data){
					resolve(data);
				}
			})
		})		
		var pro2 = new Promise(function(resolve,reject){
		//板块：首页 热荐专题
			$.ajax({
				url:"./api/homeRecom.php",
				type:"get",
				data:{recommend:"hot"},
				success:function(data){
					resolve(data);
				}
			})			
		})
		var pro3 = new Promise(function(resolve,reject){
		//板块：首页 热荐专题
			$.ajax({
				url:"./api/homeRecom.php",
				type:"get",
				data:{recommend:"found"},
				success:function(data){
					resolve(data);
				}
			})			
		})	

		Promise.all([pro1,pro2,pro3]).then(function(data){
				try{
					var imgData = JSON.parse(data[0]);
					var $uls = $('<ul/>');
						$uls.addClass('uls-sty');
					var $h3 = $('<h3/>');
					$h3.html(`<img src="./img/home/goods_t.jpg">`)
					$uls.html(imgData.map(function(ele,idx){
							return `<li>
										<a href="${ele.imghref}" target="_blank">
										<img src="${ele.imgdefault}"  data-src="${ele.imgurl}">
										</a>
									</li>`
						}))		
					$('.recommend').append($h3,$uls);
				}catch(error){
					console.log("非标准json字符串1f")
				}

				try{
					var imgData = JSON.parse(data[1]);
					var $uls = $('<ul/>');
					$uls.addClass('uls-sty');
					var $h3 = $('<h3/>');
					var $more = $('<a href="#" target="_blank"/>');
						$more.addClass('look-more').html('查看更多专题');
					$h3.html(`<img src="./img/home/topic_t.jpg">`)
					$uls.html(imgData.map(function(ele,idx){
							return `<li>
										<a href="${ele.imghref}" target="_blank">
											<img src="${ele.imgdefault}"  data-src="${ele.imgurl}">
											<p><img src="${ele.imgbg}"></p>
										</a>
									</li>`
						}))		
					$('.sohot').append($h3,$uls,$more);
				}catch(error){
					console.log("非标准json字符串2f")
				}

				try{
					var imgData = JSON.parse(data[2]);
					var $uls = $('<ul/>');
					$uls.addClass('uls-sty');
					var $h3 = $('<h3/>');
					var $more = $('<a href="#" target="_blank"/>');
						$more.addClass('look-more').html('发现更多好货');
					$h3.html(`<img src="./img/home/found_t.jpg">`)
					$uls.html(imgData.map(function(ele,idx){
							return `<li>
										<a href="${ele.imghref}" target="_blank">
											<img src="${ele.imgdefault}"  data-src="${ele.imgurl}">
										</a>
									</li>`
						}))		
					$('.found-goods').append($h3,$uls,$more);
				}catch(error){
					console.log("非标准json字符串3f")
				}

				//图片懒加载
				var n = 0;
				var	imgs = $("img");
				var	imgNum = $("img").length;		
				
				$(window).scroll(imgLoad);
				function imgLoad(){
					for(var i = n;i<imgNum;i++){
						if(imgs.eq(i).offset().top < parseInt($(window).height()) + parseInt($(window).scrollTop())){
							// console.log(imgs.eq(i).offset().top)
							if(imgs.eq(i).attr("src").indexOf('default') >= 0){// == "./img/index/default.jpg"
								var src = imgs.eq(i).attr("data-src");
								// console.log(src)
								imgs.eq(i).attr("src",src);
								n = i + 1;
							}
						}
					}
				}
				function thro(fun, delay, time) {
						var timeout,
						startTime = new Date();
						return function() {
							var context = this,
							args = arguments,
							curTime = new Date();
							clearTimeout(timeout);
							// 如果达到了规定的触发时间间隔，触发 handler
							if (curTime - startTime >= time) {
								fun.apply(context, args);
								startTime = curTime;
								// 没达到触发间隔，重新设定定时器
							} else {
								timeout = setTimeout(fun, delay);
							}
						};
				};

				// 采用了节流函数
				window.addEventListener('scroll',thro(imgLoad,600,1000));				
				})
	})
})