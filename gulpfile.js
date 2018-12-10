var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var cleanCSS = require("gulp-clean-css");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("sass", function() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./public/css"))
    .pipe(browserSync.stream());
});

// IF BROWSER SYNC IS SET TO TRUE ITLL OPEN UP NEW WINDOW ONCE 'GULP' IS RAN.
gulp.task("browser-sync", function() {
  browserSync.init({
    server: "./public",
    notify: false,
    open: false
  });
});

gulp.task("sass:minify", function() {
  return gulp
    .src("./public/css/*.css")
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public/css"));
});

gulp.task("default", ["sass", "browser-sync"], function() {
  gulp.watch("./src/scss/**/*", ["sass"]);
});

gulp.task("production", ["sass:minify"]);
// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });
