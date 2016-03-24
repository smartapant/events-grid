'use strict'

const $ = require('gulp-load-plugins')()
const conf = require('./conf')
const gulp = require('gulp')
const path = require('path')
const pjson = require('../package.json')

gulp.task('favicons', () => {
  return gulp.src(path.join(conf.paths.src, '/favicon.png'))
      .pipe($.favicons({
        appName: pjson.name || 'SRP',
        appDescription: pjson.description || 'SRP',
        developerName: pjson.author && pjson.author.name ? pjson.author.name : 'SRP',
        developerURL: pjson.author && pjson.author.url ? pjson.author.name : 'SRP',
        background: '#fff',
        path: 'assets/favicons/',
        url: '/',
        display: 'standalone',
        orientation: 'portrait',
        version: 1.0,
        logging: false,
        online: false,
        html: '../index.html',
        pipeHTML: true,
        replace: true
      }))
      .on('error', conf.errorHandler('Favicons'))
      .pipe(gulp.dest(path.join(conf.paths.tmp, '/favicons/assets')))
})