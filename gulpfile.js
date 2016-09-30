'use strict';

var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var del = require('del');
var gulp = require('gulp');
var historyApiFallback = require('connect-history-api-fallback');
var plugins = require('gulp-load-plugins')();
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var watchify = require('watchify');



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

//clean folders before build
gulp.task('clean', function() {
    del('/dist');
});

//push index.html changes to dist folder
gulp.task('index', function() {
    return gulp.src('./app/index.html')
            .pipe(gulp.dest('./dist'))
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

//watch app folder for changes
function buildScript(file, watch) {
    var props = {
        entries: ['./app/' + file],
        debug: true,
        transform: [babelify]   
    };

    //watchify() if watch requested, otherwise run browserify() once
    var bundler = watch ? watchify(browserify(props)) : browserify(props);

    function rebundle() {
        var stream = bundler.bundle();
        return stream
                .on('error', handleErrors)
                .pipe(source(file))
                .pipe(gulp.dest('./dist/js'))
                .pipe(browserSync.reload({
                    stream: true
                }));
    }

    //listen for an update and run rebundle
    bundler.on('update', function () {
        rebundle();
    });

    //run it once the first time buildScript is called
    return rebundle();

}

