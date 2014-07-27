var gulp        = require('gulp');
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');
var buffer      = require('gulp-buffer');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var header      = require('gulp-header');
var saveLicense = require('uglify-save-license');

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * Is bundled with Node.JS EventEmitter (see copyright below)',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('build', function() {
  return browserify('./index.js', {
      standalone: 'eObserve'
    })
    .bundle()
    .pipe(source('observe-event.js'))
    .pipe(buffer())
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify({ preserveComments: saveLicense }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['build']);