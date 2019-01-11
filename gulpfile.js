var gulp = require("gulp");
var htmlmin = require("gulp-html-minifier2");
var uglify = require("gulp-uglify");
var cssmin = require("gulp-minify-css");
var imagemin = require("gulp-imagemin");
var amdOptimize = require('gulp-amd-optimize');
var concat = require("gulp-concat");
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require("gulp-jshint");
var babel = require("gulp-babel");
var del = require("gulp-clean");

// 路径配置
var htmlSrc = "./src/*.html",
    htmlDest = "./built",
    jsSrc = ["./src/js/**/*.js", '!./src/**/bscroll.js'],
    jsDest = "./built/js",
    cssSrc = "./src/css/**/*.css",
    cssDest = "./built/css",
    imageSrc = "./src/images/**/*",
    imageDest = "./built/images",
    concatIndexjsSrc = ['./src/js/**/*.js', '!./src/**/bscroll.js'],
    concatIndexjsDest = './built/js';

// require路径配置
var requireConfig = {
    baseUrl: __dirname + '/src',
    paths: {
        "zepto": "./js/lib/zepto",
        "underscore": "./js/lib/underscore-min",
        "template": "./js/lib/arttemplate",
        "api": "./js/api/api",
        "util": "./js/util/util",
        "catch": "./js/catch",
        "lib": "./js/lib/",
        "plugins": "./js/plugins"
    },
    exclude: ['lib']
}

// 任务定义
gulp.task("html", function() {
    return gulp.src(htmlSrc)
        .pipe(htmlmin({
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            processScripts: ['text/template'],
        }))
        // .pipe(cssmin())
        // .pipe(uglify())
        .on("error", function(err) {
            console.log(err);
        })
        .pipe(gulp.dest(htmlDest));
})
gulp.task("js", function() {
        return gulp.src(jsSrc)
            .pipe(uglify({
                mangle: { except: ['require', 'exports', 'module', '$'] }
            }).on("error", function(err) {
                console.log(err);
            }))
            .pipe(gulp.dest(jsDest))
    })
    // gulp.task("jsconcat",function(){
    //  return gulp.src(concatIndexjsSrc)
    //          .pipe(requirejsOptimize({

//          }))
//          .pipe(rename("index.all.js"))
//          .pipe(gulp.dest(concatIndexjsDest))
//          .on("error",function(err){
//              console.log(err);
//          });
// })
// gulp.task("jsconcat", function() {
//     return gulp.src(concatIndexjsSrc)
//      .pipe(jshint())
//         // .pipe(uglify())
//         .pipe(sourcemaps.init())
//         .pipe(amdOptimize(requireConfig,{
//             umd:false
//         }))
//         .pipe(sourcemaps.write('./', { includeContent: false, sourceRoot: '../src' }))
//         .pipe(concat("index.js"))
//         .pipe(rename("index.all.js"))
//         .pipe(jshint())
//         // .pipe(babel({
//         //     presets:['es2015'],
//         //     plugins: ['transform-runtime']
//         // }))
//         .pipe(gulp.dest("./built/js"))
//         .on("error",function(err){
//          console.log(err);
//         });
// })
gulp.task("jsconcat", function() {
    return gulp.src(concatIndexjsSrc)
        .pipe(amdOptimize("js/index", {
            baseUrl:__dirname+"/src",
            paths: {
                "zepto": "js/lib/zepto",
                "underscore": "js/lib/underscore-min",
                "template": "js/lib/arttemplate",
                "api": "js/api/api",
                "util": "js/util/util",
                "catch": "js/catch",
                "lib": "js/lib/",
                "plugins": "js/plugins"
            }
        }))
        .pipe(concat("index.all.js"))
        .pipe(gulp.dest("./built/js"));
})
gulp.task("toes5", ['jsconcat'], function() {
    return gulp.src("./built/js/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("./built/js"))
})
gulp.task("css", function() {
    return gulp.src(cssSrc)
        .pipe(cssmin())
        .pipe(gulp.dest(cssDest));
})
gulp.task("image", function() {
    return gulp.src(imageSrc)
        .pipe(imagemin({
            interlace: true
        }))
        .pipe(gulp.dest(imageDest))
})
gulp.task("watch", function() {
    gulp.watch(htmlSrc, ['html']);
    gulp.watch(cssSrc, ['css']);
    gulp.watch(jsSrc, ['js']);
    gulp.watch(imageSrc, ['image']);
})
gulp.task("clean", function() {
    return gulp.src(["built/*", "!built"])　.pipe(del());
})
gulp.task("optimize", ["html", "css", "image","js"]);

gulp.task("built", ["clean"], function() {
    gulp.start("optimize");
});
gulp.task("default", ['watch', 'built'])
