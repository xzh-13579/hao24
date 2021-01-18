const {src,dest,watch} = require('gulp');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

//indexHtml
function fnCopyIndex(){
    return src('./src/index.html')
    .pipe(dest('./dist'));
}
//css
function fnCSS(){
    return src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/css'));
}
//js
function fnJS(){
    return src('./src/js/*.js')
    .pipe(babel({
        presets : ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/js'));
}
//html
function fnHTMl(){
    return src('./src/pages/*.html')
    .pipe(htmlmin())
    .pipe(dest('./dist/pages'));
}
//img
function fnIMG(){
    return src('./src/img/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'));
}
//watch
function fnWatch(){
    watch('./src/img/*',fnIMG);
    watch('./src/js/*.js',fnJS);
    watch('./src/pages/*.html',fnHTMl);
    watch('./src/sass/*.scss',fnCSS);
    watch('./src/index.html',fnCopyIndex);
}
exports.img = fnIMG;
exports.js = fnJS;
exports.html = fnHTMl;
exports.css = fnCSS;
exports.copy = fnCopyIndex;
exports.default = fnWatch;