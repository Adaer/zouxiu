//nodeJS模块，commonJS规范
'use strict'; //严格模式
var gulp = require('gulp');	//引用模块
var sass = require('gulp-sass');
//创建任务，编译sass文件
gulp.task('compileSass',function(){
	//用于scss引用其他scss文件时 可能报错，延迟代码执行
	setTimeout(function(){
		return gulp.src('./src/scss/*.scss')	//添加scss文件
			.pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))	//进行编译 输出风格类型 error：报错不影响输出
			.pipe(gulp.dest('./src/css/'))	//输出路径		
		},400);

});
// 文件变动监听 自动编译处理
gulp.task('listenSass',function(){
	return gulp.watch(
		['./src/**/*.scss'],['compileSass']	//监听文件夹 文件，执行任务
	);
});

//合并 压缩 重命名 插件
//pump可以使我们更容易找到代码出错位置
var pump = require('pump');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('compress',function(cb){
	return pump([
			gulp.src('./src/js/*.js'),
			concat('all.js'),
			gulp.dest('./dist/js'),
			uglify(),
			rename({suffix:'.min'}),
			gulp.dest('./dist/js')
		],
		cb
	);
});

// 自动刷新网页
var BOMSync  = require('browser-sync');
gulp.task('refreshWeb',function(){
	return BOMSync({
		// refreshWeb:'./src/', //静态服务器 无法链接API php接口
		port:10086,//静态端口
		//代理服务器
		proxy:'http://localhost/xiu',
		//监听文件
		files:['./src/**/*.html','./src/css/*.css','./src/api/*.php']
	});
	//开启自动刷新
	gulp.watch(
		['./src/**/*.scss'],['compileSass']	//监听文件夹 文件，执行任务
	);
});











