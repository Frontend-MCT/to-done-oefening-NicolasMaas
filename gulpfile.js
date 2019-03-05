// Import van toegevoegde packages (iva npm of yarn)

// Basic packages
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const plumber = require('gulp-plumber');

// HTML packages
const htmlmin = require('gulp-htmlmin');

// JS packages
const webpack = require('webpack');
const webpackconfig = require('./webpack.config.js');
const webpackstream = require('webpack-stream');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');

// De tasks / watchers zelf die we aanmaken

    // We willen een development server opzetten
    function browserSync(done) {
        browsersync.init({
            server: {
                baseDir: './dist/'
            },
            port: 3000
        });
        done();
    }

    // BrowserSync Reload
    function browserSyncReload(done) {
        browsersync.reload();
        done();
    }

    // HTML moet geminified naar de dist-map gezet worden
    function minifyHTML() {
        return gulp
            .src('./src/**/*.html')
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(gulp.dest('./dist'));
    }

    // JS willen we samenvoegen, minifien en compatibel maken
    function scriptsLint() {
        return gulp
            .src(['./src/script/**/*', './gulpfile.js'])
            .pipe(plumber())
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    }

    function scripts() {
        return gulp
            // .src(['./src/script/lib/todo.js', 
            //       './src/script/lib/todoModule.js', 
            //       './src/script/lib/dataAccess.js',
            //       './src/script/app.js'])
            // .pipe(plumber())
            // .pipe(webpackstream(webpackconfig, webpack))
            .src(['./src/script/lib/*.js', './src/script/*.js'])
            .pipe(plumber())
            .pipe(concat('app.bundle.js'))
            .pipe(gulp.dest('./dist/script/'))
            .pipe(browsersync.stream());
    }

    // Watchen van veranderingen
    const serve = gulp.parallel(watchFiles, browserSync, scripts);

    function watchFiles() {
        gulp.watch(['./src/script/**/*'],
        gulp.series(scripts, browserSyncReload));

        gulp.watch(['./src/**/*.html'], 
        gulp.series(minifyHTML, browserSyncReload));
    }

// Export van onze eigen tasks (functions)
// Dan kunnen we ze gebruiken vai de de command line
// exports.minifyHTML = minifyHTML;
// exports.watchFiles = watchFiles;

exports.serve = serve;