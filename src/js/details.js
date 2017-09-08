/**	
 *  header js
 *  by:lfping
 *  time:2017年9月6日09:36:44
 *  log:网站男装 详情 js
 */


require(['config','../lib/jquery-3.2.1'],function(){
		//引入头部 尾部 由于代码执行顺序问题，要先加载页面
		$("#header").load("../html/header.html header");
		$("#footer").load("../html/footer.html footer");

	require(['lazyload','headJS','Magnifying','commonJS'],function(){
		//右侧悬浮效果
		var $aside = $(".aside"),
		frShut = $aside.children(".fr_shut");

		frShut.click(function(){
			$aside.fadeOut(200)
		})
		//非ajax请求的静态数据图片 使用 lazyload 懒加载插件
		$(function() {
     		 $("img.lazy").lazyload({effect: "fadeIn"});
      	});

/*-------------------------------------------*/
		//获取url中的id 通过id 去ajax请求 找对对应商品 生成结构
		// 截取url数据
		var ids = getURLParams("idx");
		
		var container = $(".container");

		//用于存储cookie信息
		var createCookie = [],cookObj = {};
		//判断cookie是否存在
		var cookies = document.cookie;
		if(cookies.length > 0){
			createCookie = JSON.parse(CookieMethd.get("goodsInfo"));
			console.log(createCookie)
		}
		showCart();
		function showCart(){
			var qty = 0;
			createCookie.map(function(item){
				console.log(item.goodsqty)
				qty += item.goodsqty;
				$("#cart_bag").children().html(qty);
			})
		}

		$.ajax({
			url:'../api/details.php',
			data:{
				guid:ids
			},
			success:function(res){
				var result = res;
				try{
					result = JSON.parse(res);
				}catch(error){console.log("非标准JSON字符串")}
				
				var $magnifier =  $("<div/>").addClass("Magnifier"); //图片展示 放大镜 lt
				var	$goodsInfo = $("<div/>").addClass("goods_container"); // 商品信息 rt
		
				cookObj.goodsid = result.id;//cookie 商品id
				cookObj.goodsbrand = result.brand;//cookie 商品品牌
				cookObj.goodstype = result.type;//cookie 商品类型

				var strData = $(result).map(function(idx,data){
					
					var imgS = result.imgS.split(" ");
					var imgM = result.imgM.split(" ");
					var imgL = result.imgL.split(" ");
					
					cookObj.goodsimg = imgS[0];//cookie 商品缩略图

					var imgS_res = imgS.map(function(ele){
						return `<li><a href="javascript:;"><img src="${ele}" onerror="this.src='/src/img/list/bg/default.66_88.jpg'" alt=""></a></li>`
					}).join("");

					//使用数组下标 i: 解决 2个中图大图 循环的问题
					var imgM_res = imgM.map(function(ele,i){
						return `<img src="${ele}" data-bgimg="${imgL[i]}" onerror="this.src='/src/img/list/bg/default.402_536.jpg'" class="m_pic" alt="">`;
					}).join("");
					
					return `
						<div class="bg_img">
							${imgM_res}
						</div>
						<div class="sm_img">
							<ul class="img_list">
								${imgS_res}
							</ul>
						</div>`
				})
				// strData是一个jq对象
				strData.each(function(idx,ele){
					$magnifier.html(ele);
				})
				container.append($magnifier);	

				//放大镜插件
				Magnifying({width:360,height:440,position:'right'});

				//切换展示图片
				//小图 默认选中 切换效果
				var $bigPics = $(".bg_img").children(); //所有中图
				var $bigImg = $(".Magnifier-big").children().eq(0); //展示大图

				$(".img_list").children().eq(0).addClass("li_active").siblings().addClass("li_active_line");
				$(".img_list").on("mouseenter","li",function(){
					var $idx = $(this).index();
					//小图选中
					$(this).removeClass().addClass("li_active").siblings().addClass("li_active_line");
					//中图 切换
					$bigPics.eq($idx).stop().fadeIn(200).siblings().stop().fadeOut(200);
					//大图src属性切换
					$bigImg.attr("src",[$bigPics.eq($idx).data("bgimg")]);

					// $(".bigImg").show(); bug!!
					// $(".Magnifier-big").show();
				})



				/*--右侧商品信息--*/
				var Colors = result.colors.split(" ");
				var Size = result.size.split(" ");
				var goodsColors = Colors.map(function(ele){
					return `<a href="javascript:;" class="goods_color">${ele}</a>`
				}).join("");
				var goodsSize = Size.map(function(ele){
					return `<a href="javascript:;" class="goods_size">${ele}</a>`
				}).join("");


				//打折后的价格
				var price = parseInt((result.cost * (result.discount/10))).toFixed(2);

				cookObj.goodsoldprice = result.cost; //cookie 商品原价格
				cookObj.goodsprice = price; //cookie 商品打折价格

				var goodsStr = `
					<div class="goods_head bd_line">
						<h3>${result.type}<span>[限时${result.discount}折]</span></h3>
						<p>品牌:<a href="#">${result.brand}</a><a href="#">已有${result.comment}条品牌评论</a><span>商品编号:${result.product}</span></p>
					</div>
					<div class="goods_body bd_line">
						<div><p class="time_buying">限&nbsp;时&nbsp;抢&nbsp;购：<span>${price}</span></p> <em></em></div>
						<p class="original_price">走&nbsp;秀&nbsp;价：<span>${result.cost}</span></p>
						<p>发&nbsp;货&nbsp;地：<span>国内</span><i>预计2-5个工作日送达</i></p>
					</div>
					<div class="goods_foot">
						<ul>
							<li><span>颜&nbsp;&nbsp;&nbsp;色：</span>${goodsColors}</li>
							<li><span>尺&nbsp;&nbsp;&nbsp;码：</span>${goodsSize}</li>
							<li onselectstart="return false">
								<span>数&nbsp;&nbsp;&nbsp;量：</span>
								<em class="goods_num_sub"></em><input type="number" value="1" id="goods_num"><em class="goods_num_add"></em>
								<span>件</span>
							</li>
							<li><a href="###">由腾达名品店提供</a><a href="javascript:;">由走秀网提供售后服务</a></li>
						</ul>
					</div>
					<div class="goods_buy bd_line">
						<a href="javascript:;" class="go_buy" data-id="${result.id}">立即购买</a>
						<a href="javascript:;" class="join_cart">放入购物袋</a>
						<a href="javascript:;" class="my_collect">收藏</a>
						<p>电话订购：<span>400-888-4499</span> <em>（08:00-24:00）</em></p>
					</div>
					<div class="goods_share">
						<div>
							<img src="../img/list/bg/45210355.jpg" alt=""><span>扫一扫二维码分享给朋友</span>
						</div>
						<div>
							<span>分享到：</span>
							<a href="javascript:;"></a>
							<a href="javascript:;"></a>
							<a href="javascript:;"></a>
							<a href="javascript:;"></a>
							<a href="javascript:;"></a>
						</div>
					</div>
				`;
				$goodsInfo.html(goodsStr);
				container.append($goodsInfo);

				//点击购买商品信息 尺码 颜色 数量
				/*------输入框只允许数字------*/
				$("#goods_num").attr("onkeypress","return (/\\d/.test(String.fromCharCode(event.keyCode)))");
				var gzSize,gzColor,gzNum = 1;

				//点击选中商品参数
				$(".goods_foot").on("click",function(e){
					if($(e.target).hasClass("goods_color")){
						$(e.target).addClass("select_sty").siblings('.goods_color').removeClass("select_sty");
						gzColor = $(e.target).text();
						cookObj.goodscolor = gzColor;//cookie 商品颜色
					};
					if($(e.target).hasClass("goods_size")){
						$(e.target).addClass("select_sty").siblings('.goods_size').removeClass("select_sty");
						gzSize = $(e.target).text();
						cookObj.goodssize = gzSize;//cookie 商品尺码
					};	
					if($(e.target).hasClass("goods_num_sub")){
						gzNum--;
						if(gzNum < 1){
							gzNum = 1;
						}
						$("#goods_num").val(gzNum); //更新输入框的值
					};
					if($(e.target).hasClass("goods_num_add")){
						gzNum++;
						$("#goods_num").val(gzNum);	 //更新输入框的值
					};
					console.log(gzSize,gzColor,gzNum)	
				})
			
				//输入框失去焦点获得数值，只能获得到数字 上面已做判断
				$("#goods_num").blur(function(){
					gzNum = Number($(this).val());
				})

				/*-----------点击飞入购物车-----------*/
				var $cartBag = $("#cart_bag");
				var num = 0;//用于累加商品数量
	
				//加入购物车时 先检查cookie 商品信息
				$(".join_cart").on("click",function(){
					if(gzSize != undefined &&  gzColor != undefined){
							for(var i=0;i<createCookie.length;i++){
								if(createCookie[i].goodsid == result.id){
									if(createCookie[i].goodscolor == gzColor && createCookie[i].goodssize == gzSize){
										// num += gzNum;
										createCookie[i].goodsqty = gzNum;
										createCookie.splice(i,1);
										// cookObj.goodsqty =num;
										// console.log(createCookie[i].goodsqty,cookObj.goodsqty);
										// setCookie();
										break;
									}
									// else{

									// }
								}
							}

						//购物车 目标位置
						var targetTop = parseInt($cartBag.offset().top);
						var targetLeft = parseInt($cartBag.offset().left);
					

						//获取小图 克隆
						var $flyImg = $(".li_active").eq(0).children().eq(0).children("img").clone();
						$flyImg.addClass("fly-img");

						//点击获取当前位置
						var currentTop = parseInt($(".join_cart").offset().top);
						var currentLeft = parseInt($(".join_cart").offset().left);
					
						$flyImg.css({
							top:[currentTop-40]+"px",
							left:[currentLeft+70]+"px"
						});

						//插入到body
						$(document.body).append($flyImg);

						$flyImg.animate({
							top:targetTop+10,
							left:targetLeft+20,
							width:20,
							height:24						
						},1000,function(){
							$(this).remove();

							$cartBag.animate({
								backgroundPositionX:-68							
							},0,function(){
								setTimeout(function(){
									$cartBag.css({
										backgroundPositionX:0
									})
								},1200)
								$cartBag.children()[0].innerHTML = num;
							});							
						});	

						num += gzNum; 


						cookObj.goodsqty = num; //cookie 商品数量
						setCookie();								
						//把商品数量放到 动画回调函数中，导致异步 在外面无法获取到，实际能看到，但是是引用类型的原因无法获取到 值
						function setCookie(){
							createCookie.push(cookObj);
							var createCookieVal = JSON.stringify(createCookie);
							var nowTime = new Date();
								nowTime.setDate(nowTime.getDate() + 10);
							CookieMethd.set("goodsInfo",createCookieVal,nowTime,"/");
						}
					}
				})
			}
		})

/*-------------------------------------------*/
		var $contents = $(".goods_content").children();
		/*--商品详情 评价 tab切换--*/
		$(".list_tag").on("click","a",function(){
			$(this).addClass("hover_active").parent("li").siblings("li").children().removeClass("hover_active");
			var idx = $(this).parent("li").index();
			$contents.eq(idx).show().siblings(".tags").hide();
		})
	})
})	


