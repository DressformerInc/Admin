/**
 * Created by Miha-ha on 01.09.14.
 */
var gulp = require('gulp'),
    exec = require('child_process').exec;
//    exec = require('gulp-exec');

gulp.task('rsync', ['build'], function (cb) {
    exec('rsync -crv --delete ./build/production/Admin/ v2.dressformer.com:/opt/www/admin-test', function (err, stdout, stderr) {
        stdout && console.log('output:',stdout);
        stderr && console.log('error:', stderr);
        cb(err);
    });
});

gulp.task('build', function (cb) {
    exec('~/bin/Sencha/Cmd/5.0.1.231/sencha app build', function (err, stdout, stderr) {
        stdout && console.log('output:',stdout);
        stderr && console.log('error:', stderr);
        cb(err);
    });
});

gulp.task('watch', function (cb) {
    exec('~/bin/Sencha/Cmd/5.0.1.231/sencha app watch', function (err, stdout, stderr) {
        stdout && console.log('output:',stdout);
        stderr && console.log('error:', stderr);
        cb(err);
    });
//    var options = {
//        silent: false
//    };
//
//    return gulp.src('')
//        .pipe(exec('~/bin/Sencha/Cmd/5.0.1.231/sencha app watch', options));
});

gulp.task('deploy', ['rsync']);

gulp.task('default', ['watch']);