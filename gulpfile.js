'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')({pattern: ['*{-,.}*'] });
const browserSync = require('browser-sync').create();

const combine = require('stream-combiner2').obj;
const del = require('del');

const config = {
  dist: 'dist/',
  src: 'src/',
  data: 'data/data.json',
  html: 'src/index.html',
  css: 'src/css/main.css',
  js: ['src/js/components/*', 'src/js/main.js']
}

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: config.dist
    }
  });
});

gulp.task('clean', function() {
  return del(config.dist);
});

gulp.task('html', function() {
  return combine(
    gulp.src(config.html),
    gulp.dest(config.dist)
  )
});

gulp.task('data', function() {
  return combine(
    gulp.src(config.data),
    gulp.dest(config.dist)
  )
});

gulp.task('css', function() {

  return combine(
    gulp.src(config.css),
    $.plumber({ errorHandler: $.notify.onError("Error: <%= error.message %>")}),
    $.postcss([
      $.postcssCssnext({
        browsers: ['last 1 version']
      })
    ]),
    gulp.dest(config.dist + '/css/'),
    browserSync.stream()
  )
});

gulp.task('js', function() {
  return combine(
    gulp.src(config.js),
    $.concat('main.js'),
    gulp.dest(config.dist + '/js/')
  )
});

gulp.task('build', ['clean'], function(cb){
  let tasks = [
    ['html', 'data', 'css', 'js'],
    'server'
  ];

  tasks.push(cb);

  $.runSequence(...tasks);
});

gulp.task('default', ['build'], function () {
  gulp.watch(config.html, ['html', browserSync.reload]);
  gulp.watch(config.data, ['data', browserSync.reload]);
  gulp.watch(config.js, ['js', browserSync.reload]);
  gulp.watch(config.css, ['css']);
});


