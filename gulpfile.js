var gulp = require('gulp'),
    gutil = require('gulp-util'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename');

gulp.task('webserver', function() {
    gulp.src('builds/')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('html', function() {
    gulp.src('builds/*.html')
});

gulp.task('sass', function() {
    return sass('builds/sass', { })
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(rename({
            suffix: '.min'
        }))
         .pipe(minifycss())
        .pipe(gulp.dest('builds/css'));
});

gulp.task('watch', function() {
    gulp.watch('builds/sass/*', ['sass']);
    gulp.watch('builds/*.html', ['html']);
});
 
 gulp.task('copy', function() {
    gulp.src(['node_modules/font-awesome/**/*'])
        .pipe(gulp.dest('builds/css/plugins/font-awesome/'));  // Copy font-awesome
        gulp.src(['node_modules/angular/angular.min.js', 
            'node_modules/angular-animate/angular-animate.min.js',
            'node_modules/angular-route/angular-route.min.js',
            'node_modules/angular-google-maps/dist/angular-google-maps.min.js' ])
        .pipe(gulp.dest('builds/js/plugins/angular/')); // Copy angular
         gulp.src(['node_modules/lodash/index.js'])
    .pipe(gulp.dest('builds/js/plugins/lodash/')); // Copy Lo-Dash for Google maps needed
     gulp.src(['node_modules/jquery/dist/jquery.js'])
     .pipe(gulp.dest('builds/js/plugins/jquery/')); // Copy Lo-Dash for Google maps needed
          gulp.src(['node_modules/animate-css-optim/node_modules/animate.css/animate.min.css'])
    .pipe(gulp.dest('builds/css/plugins/animate-css/')); // Copy Lo-Dash for Google maps needed
    gulp.src(['node_modules/ng-flow/dist/ng-flow-standalone.min.js'])
    .pipe(gulp.dest('builds/js/plugins/ng-flow/')); // Copy Lo-Dash for Google maps needed
});



gulp.task('default', ['watch', 'copy', 'sass', 'html', 'webserver']);
