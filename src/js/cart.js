/**	
 *  header js
 *  by:lfping
 *  time:2017年9月8日20:11:12
 *  log:网站购物车结算 js
 */

require(['config','../lib/jquery-3.2.1'],function(){
	require(['jQuery','commonJS'],function(){

		var $cart = $(".cart_body");
		//用于存储cookie信息
		var createCookie = [],cookObj = {};
		//判断cookie是否存在
		var cookies = document.cookie;
		if(cookies.length > 0){
			createCookie = JSON.parse(CookieMethd.get("goodsInfo"));
			var uls = document.createElement("ul");
 			uls.innerHTML = createCookie.map(function(item){
 				return `
 					<li>
 					<div class="goods_info">
 						<input type="checkbox" class="select_this" name="select_this" checked="checked">
 						<a href="./details.html?idx=${item.goodsid}" class="img_box">
 							<img src="${item.goodsimg}" onerror="this.src='/src/img/list/bg/default.66_88.jpg'" alt="">
 						</a>
 						<div class="goods_title">
 							<h4>${item.goodsbrand}</h4>
 							<h5><a href="javascript:;">${item.goodstype}</a></h5>
							<p><span>颜色：</span>${item.goodscolor}<span>尺码：</span>${item.goodssize}</p>
 						</div>
 					</div>
 					<aside class="goods_operation">
 						<div class="price_list">
 							<del>${item.goodsoldprice}</del>
 							<span>${item.goodsprice}</span>
 						</div>
 						<div class="goods_add">
 							<p><em onselectstart="return false">+</em><input type="number" value="${item.goodsqty}"><em onselectstart="return false">-</em></p>
 							<i class="stock_tips"></i>
 						</div>
 						<div class="goods_remove">
 							<p><a href="javascript:;">移至收藏夹</a></p>
 							<p><a href="javascript:;">删除</a></p>
 						</div>
 					</aside>
 					</li>
 				`
 			}).join("");
 			$cart.append(uls);
		}else{
			$(".cart_box").hide().next().show();
		}		
	})
})









