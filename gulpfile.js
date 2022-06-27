require('@babel/register');
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

let jsScript = 'node';
if (
	process.env.npm_config_argv !== undefined &&
	process.env.npm_config_argv.indexOf('debug') > 0
) {
	jsScript = 'node debug';
}
gulp.task('nodemon', () =>
	nodemon({
		script: 'build/dev-server.js',
		execMap: {
			js: jsScript,
		},
		verbose: true,
		ignore: [
			'build/*.js',
			'dist/*.js',
			'nodemon.json',
			'.git',
			'node_modules/**/node_modules',
			'gulpfile.js',
		],
		env: {
			NODE_ENV: 'development',
		},
		ext: 'js json',
	}),
);
