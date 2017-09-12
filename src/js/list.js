/**	
 *  header js
 *  by:lfping
 *  time:2017年9月5日09:33:44
 *  log:网站男装 列表页 js
 */


require(['config','../lib/jquery-3.2.1'],function(){
		//引入头部 尾部 由于代码执行顺序问题，要先加载页面
		$("#header").load("../html/header.html header");
		$("#footer").load("../html/footer.html footer");

	require(['headJS','commonJS'],function(){
		//请求后台数据
		//默认请求数据
		var $pageNo = 1;
		var $qty = 24;

		var $goodsWrap = $(".container");
		$.ajax({
			url:"../api/shopdata.php",
			data:{
				pageNo:$pageNo,
				qty:$qty,
				sort:'normal'
			},
			success:function(res){
				ajaxRes(res);
			}
		})

		//点击标签 翻页
		$goodsWrap.on("click",".tips span",function(){
			//高亮当前标签
			$(this).addClass("actives").siblings().removeClass("actives");
			//禁止同一按钮重复请求
			if($pageNo == $(this).text()){
				return;
			}else{
				//更新pageNo 用于请求
				$pageNo = $(this).text();
				$.ajax({
					url:"../api/shopdata.php",
					data:{
						pageNo:$pageNo,
						qty:$qty,
						sort:'normal'					
					},
					success:function(res){
						ajaxRes(res);
						//如何局部刷新页面 (方法2：返回到顶部)
					}
				})								
			}
		})
		// 点击排序
		var sorts = document.querySelector(".sort");
		var flag = true;
		var flags = true;
		var sort_price_res;
		sorts.addEventListener("click",function(e){
			var target = e.target;
			if(target.classList.contains("sort_price")){
				if(flag){
					flag = false;
					$.ajax({
						url:"../api/shopdata.php",
						data:{
							pageNo:$pageNo,
							qty:$qty,
							sort:"max"					
						},
						success:function(res){
							// console.log(res);
							ajaxRes(res)
							//如何局部刷新页面 (方法2：返回到顶部)
						}
					})
				}else{
					flag = true;
					$.ajax({
						url:"../api/shopdata.php",
						data:{
							pageNo:$pageNo,
							qty:$qty,
							sort:"min"					
						},
						success:function(res){
							// console.log(res);
							ajaxRes(res)
							//如何局部刷新页面 (方法2：返回到顶部)
						}						
					})
				}
			}
			if(target.classList.contains("sort_normal")){
				if(!flags){
					return;
				}else{
					flags = false;
					setTimeout(function(){
						flags = true;
					},3000)
				}
					$.ajax({
						url:"../api/shopdata.php",
						data:{
							pageNo:$pageNo,
							qty:$qty,
							sort:"normal"					
						},
						success:function(res){
							// console.log(res);
							ajaxRes(res)
							//如何局部刷新页面 (方法2：返回到顶部)
						}
					})				
			}
		})						

		//将结果 封装出来 以便重复调用
		function ajaxRes(res){
				var resData = res;
				try{
					resData = JSON.parse(res);
					// console.log(resData)
				}catch(error){
					try{
						resData = JSON.parse(res)[0];
						// console.log(resData)

					}catch(err){
						
					}
				}
				var $uls = $("<ul/>");
				var $tips = $("<div/>").addClass("tips");
					$tips.attr("onselectstart","return false");
				//分页数量
				var lenPage = Math.ceil(resData.total / resData.qty);
				//生成分页标签 从1开始
				for(let i=1;i<=lenPage;i++){
					var $spans = $("<span/>");
					$spans.html(i);
					if(i == $pageNo){
						$spans.addClass("actives");
					}
					$tips.append($spans);
				}
				var brandType = document.querySelector(".brand_type");
				//遍历数据 生成结构
				// console.log(resData.data)
				var res = resData.data.map(function(dom,idx){
					brandType.innerHTML += `<a href="javascript:;">${dom.brand}</a>`;
					var sizeArr = dom.size.split(" ");
					var resss = sizeArr.map(function(ele){
							return `<span>${ele}</span>`
						}).join("")
						

					if(dom.discount !== "10"){
						var discounts = `<div class="count">限时${dom.discount}折</div>`; 
					}
					if(discounts == undefined){
						discounts = "";
					}
					var price = parseInt((dom.cost * (dom.discount/10))).toFixed(2);

					return `
						<li data-guid="${dom.id}">
							<a href="./details.html?idx=${dom.id}" target="_blank">
								<img src="../img/list/bg/default.jpg" data-src="${dom.imgurl}">
							</a>
							${discounts}
							<div class="size_tab">${resss}</div>
							<div class="tab_footer">
								<h4>${dom.brand}</h4>
								<p><a href="#">${dom.type}</a></p>
								<div class="price"><span>${price}</span><del>${dom.cost}</del></div>
							</div>
						</li>
					`
				})
				$goodsWrap.html("");
				$uls.html(res);
				$goodsWrap.append($uls,$tips);	

				//鼠标移入移出效果
				$goodsWrap.on("mouseenter","li",function(){
					$(this).find(".count").stop().animate({bottom:70},200,function(){
						$(this).stop().fadeOut(50);
					}).end().find(".size_tab").stop().show().animate({bottom:70},200);
				})
				.on("mouseleave","li",function(){
					$(this).find(".size_tab").stop().animate({bottom:42},200,function(){
						$(this).stop().fadeOut(50);
					}).end().find(".count").stop().show().animate({bottom:90},200);
				})


				//图片懒加载
				//n = 0 不用从每一次都从第一张图片开始遍历 而是加载最新图片的那个位置开始
				var n = 0;
				var	imgs = $("img");
				var	imgNum = $("img").length;		
				
				$(window).scroll(imgLoad);
				function imgLoad(){
					for(var i = n;i<imgNum;i++){
						if(imgs.eq(i).offset().top < parseInt($(window).height()) + parseInt($(window).scrollTop())){

							if(imgs.eq(i).attr("src").indexOf('default') >= 0){
								var src = imgs.eq(i).attr("data-src");
								imgs.eq(i).attr("src",src);
								n = i + 1;
							}
						}
					}
				}	

				//商品品牌标题高度调试
				
				var $ht = $(brandType).outerHeight();
				$(brandType).prev().height($ht);	
				if($(brandType).outerHeight() > 100){
					$(brandType).removeAttr("min-height").css({
						height: "70px",
						overflowY:"auto"
					}).end().prev().height(70);
				}							
		}

		//吸顶菜单
		var topNav = document.querySelector(".top-nav");
		var topNavTop = topNav.offsetTop;

		window.addEventListener("scroll",function(){
			var winTop = window.scrollY;
			
			if(winTop > topNavTop){
				topNav.classList.add("top-nav-fix");
			}else{
				$(topNav).removeClass("top-nav-fix");
			}
		})

		//右侧悬浮效果
		var $aside = $(".aside"),
		frShut = $aside.children(".fr_shut");

		frShut.click(function(){
			$aside.fadeOut(200)
		})

		//用于存储cookie信息
		var createCookie = [];
		//判断cookie是否存在
		var cookies = document.cookie;
		if(cookies.length > 0){
			createCookie = JSON.parse(CookieMethd.get("goodsInfo"));
			showCart();
		}
		function showCart(){
			createCookie = JSON.parse(CookieMethd.get("goodsInfo"));
			var qty = 0;
			createCookie.map(function(item){
				// console.log(item.goodsqty)
				qty += item.goodsqty;
				$("#cart_bag").children().html(qty);
			})
		}

		
	})
})