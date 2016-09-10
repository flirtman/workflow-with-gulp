var gulp = require('gulp');
var uglify = require('gulp-uglify'); 
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoPrefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

// Image compression
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

// File paths
var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js'
var CSS_PATH = 'public/css/**/*.css';
var IMAGE_PATH = 'public/images/**/*.{png,jpeg,jpg,svg,gif}';


// Styles
/*
gulp.task('styles',function(){
	console.log('Starting styles task!');

	return gulp.src(['public/css/reset.css',CSS_PATH])
	.pipe(plumber(function(err){
		console.log('Styles Task Error');
		console.log(err);
		this.emit('end');
	}))
	.pipe(sourcemaps.init())
	.pipe(autoPrefixer())
	.pipe(concat('styles.css'))
	.pipe(minifyCss())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(DIST_PATH))
	.pipe(livereload());
});
*/

// Styles for SCSS
gulp.task('styles',function(){
	console.log('Starting styles task!');

	return gulp.src('public/scss/styles.scss')
	.pipe(plumber(function(err){
		console.log('Styles Task Error');
		console.log(err);
		this.emit('end');
	}))
	.pipe(sourcemaps.init())
	.pipe(autoPrefixer())
	.pipe(sass({
		outputStyle: 'compressed'
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(DIST_PATH))
	.pipe(livereload());

});

// Scrips 
gulp.task('scripts',function(){
	console.log('Starting scripts task!');
	
	return gulp.src(SCRIPTS_PATH)
	.pipe(plumber(function(err){
		console.log('Scripts Task Error');
		console.log(err);
		this.emit('end');
	}))
	.pipe(sourcemaps.init())
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(uglify())
	.pipe(concat('scripts.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(DIST_PATH))
	.pipe(livereload());
});

// Images
gulp.task('images',function(){
	console.log('Starting images task!');

	return gulp.src(IMAGE_PATH)
	.pipe(imagemin(
		[
			imagemin.gifsicle(),
			imagemin.jpegtran(),
			imagemin.optipng(),
			imagemin.svgo(),
			imageminPngquant(),
			imageminJpegRecompress()
		]
	))
	.pipe(gulp.dest(DIST_PATH + '/images'));

	console.log('Ending images task!');
});


gulp.task('default',function(){
	console.log('starting default task');
});

// Watch
gulp.task('watch',function(){
	console.log('Starting watch task!');
	require('./server.js');
	livereload.listen();
	gulp.watch(SCRIPTS_PATH,['scripts']);
	//gulp.watch(CSS_PATH,['styles']);
	gulp.watch('public/scss/**/*.scss',['styles']);
});