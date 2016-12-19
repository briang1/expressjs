var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function() {
    gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }));
});

// gulp.task('serve', ['style'], function() {
//     return nodemon({
//         //script: '',
//         delayTime: 1,
//         watch: jsFiles
//     }).on('restart', function(ev) {
//         console.log('Restarting....');
//     });
// });
