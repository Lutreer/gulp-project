'use strict';

//load gulp and all plugins
//var plugins = require('gulp-load-plugins')();//load "gulp-load-plugins",并立即执行
var gulp 			= require('gulp'),
	browserSync 	= require('browser-sync').create(),
	reload      	= browserSync.reload,
	sass 			= require('gulp-sass'),
	cssmin 			= require('gulp-minify-css'),
	autoprefixer 	= require('gulp-autoprefixer'),
	useref		 	= require('gulp-useref'),
	uglify		 	= require('gulp-uglify'),
	concat 			= require('gulp-concat'),
	clean 			= require('gulp-clean'),
	gulpif 			= require('gulp-if'),
	htmlmin 		= require('gulp-html-minifier');

var paths = {
	app: 				'app/',
	html: 				'app/**/*.html',
	sass: 				['app/sass/**/*.scss','app/sass/**/*.css'],
	css: 				'app/css/',
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
	console.log('');
	console.log('-----------------------------------------------------------------');
	console.log('......gulp default....本项目gulp任务说明，即gulp help');
	console.log('......gulp run-p......启动产品环境项目，即gulp server-product');
	console.log('......gulp run-d......启动开发环境项目，即gulp server-develope');
	console.log('......gulp clean......清除gulp run-p编译的所有文件');
	console.log('-----------------------------------------------------------------');
	console.log('');
});

//default task
gulp.task('default',function(){
	gulp.start('help');
});

//run project
gulp.task('run-p',['server-product']);
gulp.task('run-d',['server-develope']);

gulp.task('clean', function () {
    return gulp.src(paths.dist, {read: false})
        .pipe(clean({force: true}));
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//静态服务器 + 监听 scss/html 文件(开发环境)
gulp.task('server-develope', ['css'], function() {
    browserSync.init({
    	//proxy: "localhost:8081"
    	port: 8082,
        server: paths.app
    });

    gulp.watch([paths.html,paths.js_main,paths.js_plugins,paths.fonts,paths.img,]).on('change', browserSync.reload);
    gulp.watch(paths.sass, ['css']);
});
//静态服务器 + 监听 scss/html 文件(产品环境)
gulp.task('server-product', ['clean', 'js-plugin', 'font', 'image', 'useref'], function() {
    browserSync.init({
    	port: 8081,
        server: paths.dist
    });

    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.sass, ['css', 'useref']);
    gulp.watch(paths.js_main, ['useref']);
    gulp.watch(paths.js_plugins, ['js_plugin']);
    gulp.watch(paths.fonts, ['font']);
    gulp.watch(paths.img, ['image']);
});

//替换合并的css js(pro)
gulp.task('useref', ['html' ,'css'], function () {  
	return gulp.src(paths.app + 'index.html')  
    	.pipe(useref())
    	.pipe(gulpif('*.js', uglify({mangle: false})))
        .pipe(gulpif('*.css', cssmin()))
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
	    .pipe(gulp.dest(paths.dist));
});
//copy html to dist(pro)
gulp.task('html', function(){
	return gulp.src(paths.html)
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(paths.dist_html))
		.pipe(reload({stream: true}));
});


//sass→css,添加前缀，压缩，并注入到浏览器里实现更新(pro)
gulp.task('css', function () {
	return gulp.src(paths.sass)
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'Firefox >= 20', 'ios 7', 'android 4', '>5%'))
        .pipe(gulp.dest(paths.css))
        .pipe(reload({stream: true}));
});

//copy js plugin(pro)
gulp.task('js-plugin', function() {
  return gulp.src(paths.js_plugins)
  		.pipe(gulp.dest(paths.dist_js_plugins))
	    .pipe(reload({stream: true}));
});

//copy fonts(pro)
gulp.task('font',function(){
	return gulp.src(paths.fonts)
		.pipe(gulp.dest(paths.dist_fonts))
		.pipe(reload({stream: true}));
});
//copy images(pro)
gulp.task('image',function(){
	return gulp.src(paths.img)
		.pipe(gulp.dest(paths.dist_img))
		.pipe(reload({stream: true}));
});





