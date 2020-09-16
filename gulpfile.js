//一、导入模块
let gulp = require('gulp');
let concat = require('gulp-concat');
let htmlmin = require('gulp-htmlmin');
let imagemin = require('gulp-imagemin');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify');
let babel = require('gulp-babel');
let cssnano = require('gulp-cssnano');
let sass = require('gulp-sass');
//优化js任务
function fnJS(){
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('dist/js'));
}

// 优化CSS任务
function fnCSS(){
    return gulp.src('src/sass/*.css')
        .pipe(cssnano())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('dist/css'));
}

function fnSass(){
    return gulp.src('src/sass/*.scss')
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(cssnano())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('./dist/css'));
}
//优化图片
function fnImg(){
    return gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}
//复制index.html
function fnCopyIndex(){
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'));
}
//事件监听
function fnWatch(){
    gulp.watch('src/js/*.js',fnJS);
    gulp.watch('src/sass/*.css',fnCSS);
    gulp.watch('src/*.html',fnCopyIndex);
    gulp.watch('src/sass/*.scss',fnSass);
    gulp.watch('src/images/*',fnImg);
}
exports.js = fnJS;
exports.css = fnCSS;
exports.images = fnImg;
exports.copyIndex = fnCopyIndex;
exports.default = fnWatch;
exports.sass = fnSass;