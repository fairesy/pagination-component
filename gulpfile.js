var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var jscs = require("gulp-jscs");
var watch = require("gulp-watch");

gulp.task("default", ["watch", "concat-production"], function() {
  console.log("헬로");
});

gulp.task("jscs", function(){
  return gulp.src("js/*.js")
        .pipe(jscs({fix:true}))
        .pipe(jscs.reporter())
        .pipe(gulp.dest("js/"));
});

gulp.task("concat-production", function(){
  return gulp.src("js/*.js")
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/"));
});

gulp.task("concat-lib", function(){
  return gulp.src([])
  .pipe(concat("lib.js"))
  .pipe(uglify())
  .pipe(gulp.dest("dist/"))
});

gulp.task("watch", function () {
   gulp.watch("js/*.js", ["jscs"]);
});

//css-concat, cssLint, jsHint
