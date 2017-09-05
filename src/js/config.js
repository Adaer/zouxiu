/**	
 *  header js
 *  by:lfping
 *  time:2017年8月31日16:24:21
 *  log:require JS配置文件
 */
require.config({
	urlArgs: "bust=" +  (new Date()).getTime(),//(版本号)时间戳解决浏览器缓存问题
	paths:{	
		//路径别名 注意路径基于data-main js文件的路径
		jQuery:'../lib/jquery-3.2.1',
		jQueryui:'../lib/jquery-ui-1.12.1/jquery-ui',
		carouselJS:'../lib/Carousel/js/ObjCarousel',
		codeVerify:'../lib/gVerify',
		commonJS:'../lib/myCommon',
		zoomImg:'../lib/Magnifier/js/Magnifier',
		headJS:'./header'
	},
	shim:{
		jQueryui:['jQuery'],
		carouselJS:['jQuery'],
		headJS:['jQuery']
	}
});