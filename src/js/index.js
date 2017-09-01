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
	require(['config','headJS','footJS'],function(){
		console.log($)
	})
})