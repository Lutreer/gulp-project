'use strict';

//load gulp and all plugins
//var plugins = require('gulp-load-plugins')();//load "gulp-load-plugins",并立即执行
var gulp 			= require('gulp'),
	browserSync 	= require('browser-sync').create(),
	reload      	= browserSync.reload,
	copy 			= require('gulp-copy'),
	sass 			= require('gulp-sass'),
	cssmin 			= require('gulp-minify-css'),
	autoprefixer 	= require('gulp-autoprefixer'),
	useref		 	= require('gulp-useref'),
	concat 			= require('gulp-concat'),
	clean 			= require('gulp-clean'),
	flatten 		= require('gulp-flatten');

var paths = {
	app: 				'app/',
	html: 				'app/**/*.html',
	sass: 				['app/sass/**/*.scss','app/sass/**/*.css'],
	js_main: 			'app/js/main/**/*.js',
	js_plugins: 		'app/js/plugins/**/*.js',
	fonts: 				'app/fonts/**/*.*',
	img: 				'app/img/**/*.*',

	dist: 				'dist/',
	dist_html: 			'dist/',
	dist_css_main: 		'dist/css/',
	dist_js_main: 		'dist/js/main/',
	dist_js_plugins: 	'dist/js/plugins/',
	dist_fonts: 		'dist/fonts/',
	dist_img: 			'dist/img/'
};
//help
gulp.task('help',function () {
	console.log('......gulp default......gulp参数说明==gulp help');
	console.log('......gulp run......启动项目==gulp server');
});

//default task
gulp.task('default',function(){
	gulp.start('help');
});

//run project
gulp.task('run',['server']);

gulp.task('clean', function () {
    return gulp.src(paths.dist, {read: false})
        .pipe(clean({force: true}));
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//静态服务器 + 监听 scss/html 文件
gulp.task('server', ['clean', 'css-main', 'js-main', 'font', 'image', 'html'], function() {
    browserSync.init({
        server: paths.dist
    });

    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.sass, ['css-main']);
    gulp.watch(paths.js_main, ['js-main']);
    gulp.watch(paths.js_plugins, ['js_plugin']);
    gulp.watch(paths.fonts, ['font']);
    gulp.watch(paths.img, ['image']);
});

//替换合并的css js(暂时不执行)
gulp.task('useref', ['html'], function () {  
	var assets = useref.assets();  
	return gulp.src(paths.app + 'index.html')  
		.pipe(assets)  
		.pipe(assets.restore())  
	    .pipe(useref())  
	    .pipe(gulp.dest(paths.dist))  
		.pipe(reload({stream: true}));
});
//copy html to dist
gulp.task('html', function(){
	return gulp.src(paths.html)
		.pipe(gulp.dest(paths.dist_html))
		.pipe(reload({stream: true}));
});


//sass→css,添加前缀，压缩，并注入到浏览器里实现更新
gulp.task('css-main', function () {
    return gulp.src(paths.sass)
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'Firefox >= 20', 'ios 7', 'android 4', '>5%'))
        .pipe(cssmin())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest(paths.dist_css_main))
        .pipe(reload({stream: true}));
});

//concat JavaScript
gulp.task('js-main', ['js-plugin'], function() {
  return gulp.src(paths.js_main)
		.pipe(concat('main.min.js'))
	    .pipe(gulp.dest(paths.dist_js_main))
	    .pipe(reload({stream: true}));
});
//copy js plugin
gulp.task('js-plugin', function() {
  return gulp.src(paths.js_plugins)
  		.pipe(gulp.dest(paths.dist_js_plugins))
	    .pipe(reload({stream: true}));
});

//copy fonts
gulp.task('font',function(){
	return gulp.src(paths.fonts)
		.pipe(gulp.dest(paths.dist_fonts))
		.pipe(reload({stream: true}));
});
//copy images
gulp.task('image',function(){
	return gulp.src(paths.img)
		.pipe(gulp.dest(paths.dist_img))
		.pipe(reload({stream: true}));
});





