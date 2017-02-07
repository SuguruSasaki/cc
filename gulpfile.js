var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var browserify = require("browserify");
var babelify   = require("babelify");
var source     = require("vinyl-source-stream");


gulp.task('babelify', function () {
    browserify({
        entries: "./src/cc.es6",
        extensions: [".es6"]
    })
        .transform(babelify)
        .bundle()
        .on("error", function (err) {
            console.log("Error : " + err.message);
            this.emit("end");
        })
        .pipe(source("cclibs.js"))
        .pipe(gulp.dest("./dist/assets/js/libs/"));
});

gulp.task('watch', function() {
    gulp.watch(['src/*.es6','./src/**/*.es6'], ['babelify'])
});

gulp.task('default', ['babelify', 'watch']);
