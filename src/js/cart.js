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
			var calc_qty = 0, calc_sale_price = 0, calc_sale = 0, calc_old_price = 0;
 			uls.innerHTML = createCookie.map(function(item){
 				// console.log(item)
 				calculate(item);
 				return `
 					<li>
 					<div class="goods_info">
 						<input type="checkbox" class="select_this" name="select_this" checked="checked">
 						<a href="./details.html?idx=${item.goodsid}" class="img_box">
 							<img src="${item.goodsimg}" onerror="this.src='/src/img/list/bg/default.66_88.jpg'" alt="">
 						</a>
 						<div class="goods_title">
 							<h4>${item.goodsbrand}</h4>
 							<h5><a href="./details.html?idx=${item.goodsid}">${item.goodstype}</a></h5>
							<p><span>颜色：</span>${item.goodscolor}<span>尺码：</span>${item.goodssize}</p>
 						</div>
 					</div>
 					<aside class="goods_operation">
 						<div class="price_list">
 							<del>${item.goodsoldprice}</del>
 							<span>${item.goodsprice}</span>
 						</div>
 						<div class="goods_add">
 							<p><em onselectstart="return false">+</em><input type="number" value="${item.goodsqty}" class="gz_qty"><em onselectstart="return false">-</em></p>
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

		//计算商品总价 数量 已优惠 原总价
		var resQty = $("#res_qty"),//购买商品总数
			resPrice = $("#res_price"),//购买优惠后的价格
			allOnsale = $("#all_onsale"),//优惠了多少
			allPrice = $("#all_price");//原价格总价
console.log(resQty)
		function calculate(item){
				calc_qty += item.goodsqty * 1;
				calc_sale_price += (item.goodsqty * item.goodsprice);
				calc_sale += (item.goodsoldprice - item.goodsprice)*item.goodsqty;
				calc_old_price += (item.goodsqty * item.goodsoldprice);
				
		}
				resQty.html(calc_qty);
				resPrice.html(calc_sale_price);
				allOnsale.html(calc_sale);
				allPrice.html(calc_old_price);
	})
})









