/**	
 *  header js
 *  by:lfping
 *  time:2017年8月31日16:24:21
 *  log:require JS配置文件
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
		header:['jQuery']
	}
});