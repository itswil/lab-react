var gulp = require('gulp');
var rimraf = require('rimraf');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var sass = require('gulp-sass');

var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var reactify = require('reactify');


gulp.task('rmrf', function() {
  rimraf.sync('build');
});

gulp.task('css', function() {
  gulp.src([
      'static/css/styles.scss',
    ])
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('build'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('images', function() {
  rimraf.sync('build/images');
  gulp.src([
      'static/images/**/*.*',
    ])
    .pipe(gulp.dest('build/images'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('js', function() {

  var b = browserify({
    entries: 'static/js/main.js',
    debug: true,
    transform: ['reactify']
  });

  b.bundle()
    .on('error', function(err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('default', ['rmrf', 'css', 'images', 'js']);

gulp.task('watch', function() {
  gulp.start('default');

  browserSync({
    server: {
      baseDir: './'
    },
    open: false
  });

  gulp.watch('static/css/**/*.*', ['css']);
  gulp.watch('static/images/**/*.*', ['images']);
  gulp.watch('static/js/**/*.*', ['js']);
  gulp.watch('**/*.html').on('change', reload);
});
