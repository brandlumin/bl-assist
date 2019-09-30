// =========================================================
// GULPFILE - PURPOSE SPECIFIC
// =========================================================

// REQUIRE SECTION -----------------------------------------
var autoprefixer = require('autoprefixer'),
    gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    livereload   = require('gulp-livereload'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    stripCSS     = require('gulp-strip-css-comments'),
    stripJS      = require('gulp-strip-comments'),
    postcss      = require('gulp-postcss');
// ---------------------------------------------------------
var sassOptions = {grid: true};



// JS SECTION // ---------------------------------------
gulp.task('setSassScripts', function () {
  return gulp.src(['src/js/jquery-3.4.1.min.js','src/js/popper.min.js','src/js/bootstrap431.min.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('jQbootstrap431.min.js'))
    .pipe(stripJS({safe: true,
                  ignore: /url\([\w\s:\/=\-\+;,]*\)/g}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});
gulp.task('customScripts', function () {
  return gulp.src('src/js/site.js')
    .pipe(sourcemaps.init())
    .pipe(stripJS({safe: true,
                  ignore: /url\([\w\s:\/=\-\+;,]*\)/g}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});
// ---------------------------------------------------------



// SASS SECTION // -----------------------------------------
gulp.task('bootstrap', function () {
  return gulp.src('src/bootstrap431/scss/bootstrap.scss')
    .pipe(rename('bootstrap431.min.css'))
    .pipe(sourcemaps.init())
    .pipe(sass.sync({
                  errLogToConsole: true,
                  precision: 10,
                  outputStyle: 'compact'
                  }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer(sassOptions)]))
    .pipe(stripCSS({preserve: /^!|@|#/}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});
gulp.task('sass', function () {
  return gulp.src('src/sass/site.sass')
    .pipe(sourcemaps.init())
    .pipe(sass.sync({
                  errLogToConsole: true,
                  precision: 10,
                  outputStyle: 'nested' // 'compressed'
                  }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer(sassOptions)]))
    .pipe(stripCSS({preserve: /^!|@|#/}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});
// ---------------------------------------------------------



// SERVE SECTION // ----------------------------------------
gulp.task('serve', function(){ // This just displayes upon run and triggers the livereload listen to changes
  console.log(
              '\n' + 'LiveReload Server is now listening to your changes in files...' + '\n'
              );
  livereload.listen();
});
// ---------------------------------------------------------



// WATCH SECTION // ----------------------------------------
  gulp.task('watch:sass', function () {
    gulp.watch('src/sass/**/*.s?ss', gulp.series('sass'));
    gulp.watch('src/bootstrap431/**/*.s?ss', gulp.series('bootstrap'));
  });

  gulp.task('watch:scripts', function () {
    gulp.watch('src/js/!(site).js', gulp.series('setSassScripts'));
    gulp.watch('src/js/site.js', gulp.series('customScripts'));
  });

  gulp.task('watch:frontend', function () {
    gulp.watch(['*.html','*.php']).on('change', livereload.reload);
  });

gulp.task('watch', gulp.parallel('watch:sass','watch:scripts','watch:frontend'));
// ---------------------------------------------------------



// REQUIRE SECTION // --------------------------------------
gulp.task('default', gulp.series(
                                 'bootstrap',
                                 'sass',
                                 'setSassScripts',
                                 'customScripts',
                                  gulp.parallel(
                                                'watch',
                                                'serve'
                                                )
                                )
);
// ---------------------------------------------------------