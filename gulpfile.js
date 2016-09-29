'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var rimraf = require('rimraf');

var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var browserSync = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback');

//create local server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        middleware: [historyApiFallback()],
        ghostMode: false
    });
});

//compile sass to dist
gulp.task('sass', function () {
    return gulp.src(['app/styles/main.scss', 'app/styles/**/*.css'])
            .pipe(plugins.concat('main.css'))
            .pipe(plugins.sass())
            .pipe(gulp.dest('./dist/styles'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//push index changes to dist
gulp.task('index', function() {
    return gulp.src('./app/index.html')
            .pipe(gulp.dest('/dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//push assets to dist
gulp.task('assets', function() {
    return gulp.src('./app/assets/**/*')
        .pipe(gulp.dest('./dist/assets'));
});

//chain these tasks together
gulp.task('build', ['clean', 'browserify', 'sass', 'index', 'assets']);

//watch these folders for changes & run the appropriate tasks if changed
gulp.task('watch', function() {
    gulp.watch('app/*.html', ['index']);
    gulp.watch('app/assets/**/*', ['assets'])
    gulp.watch(['app/styles/**/*.scss', 'app/styles/**/*.css'], ['sass']);
    gulp.watch(['app/**/*.js'], ['browserify']);
});

//set default gulp task
gulp.task('default', ['build', 'browser-sync'], function () {
    gulp.watch('app/*.html', ['index']);
    gulp.watch('app/assets/*', ['assets']);
    gulp.watch(['app/styles/**/*.scss', 'app/styles/**/*.css'], ['sass']);
        return buildScript('app.js', true);
});

//end build
gulp.task('browserify', function () {
    return buildScript('app.js', false);
});

//show errors
function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    plugins.notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end'); //keep gulp from hanging on this task
}

function buildScript(file, watch) {
    var props = {
        
    }
}




//test functions
gulp.task("hello", function() {
    console.log("Hello!");
});

gulp.task("default", ["hello"], function() {
    console.log("This is the default task!");
})