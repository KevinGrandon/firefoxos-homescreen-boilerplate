var gulp = require('gulp');
var to5 = require('gulp-6to5');

gulp.task('to5', function () {
	var files = ['./fxos_apps.js'];
	return gulp.src(files)
		.pipe(to5({
			modules: 'amd'
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['to5'], function () {
	console.log('all done.');
});
