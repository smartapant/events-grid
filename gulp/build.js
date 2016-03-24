'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.html')
  ])
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe($.angularTemplatecache('templateCacheHtml.js', {
        module: 'talentNinja',
        root: 'app'
      }))
      .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials', 'favicons'], function () {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  const faviconsInjectFiles = gulp.src(path.join(conf.paths.tmp, '/favicons/index.html'))

  const faviconsInjectOptions = {
    starttag: '<!-- inject:favicons -->',
    transform: (filePath, file) => {
    return file.contents.toString('utf8')
  }
}

var htmlFilter = $.filter('*.html', { restore: true });
var jsFilter = $.filter('**/*.js', { restore: true });
var cssFilter = $.filter('**/*.css', { restore: true });
var assets;

return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe($.inject(faviconsInjectFiles, faviconsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.sourcemaps.init())
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe($.sourcemaps.write('maps'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.sourcemaps.init())
    .pipe($.replace('../../lib/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
    .pipe($.replace('../../lib/font-awesome/fonts/', '../fonts/'))
    .pipe($.minifyCss({ processImport: false }))
    .pipe($.sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
      .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe($.flatten())
      .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('assets', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}'),
    path.join('!' + conf.paths.src, '/favicon.png')
  ])
      .pipe(fileFilter)
      .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('favicons-assets', ['assets', 'favicons'], function () {
  return gulp.src([path.join(conf.paths.tmp, '/favicons/assets/*.*')])
      .pipe(gulp.dest(path.join(conf.paths.dist, '/assets/favicons')))
})

gulp.task('clean', function () {
  return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('build', ['html', 'fonts', 'assets', 'favicons-assets']);