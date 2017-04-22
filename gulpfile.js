var gulp = require('gulp'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	pug = require('gulp-pug'),
	data = require('gulp-data'),
	prettify = require('gulp-html-prettify'),
	plumber = require('gulp-plumber'),
	plumberNotifier = require('gulp-plumber-notifier'),
	browserSync = require('browser-sync'),
	reload      = browserSync.reload,
	rename = require("gulp-rename"),
	uglify = require('gulp-uglify');

function requireUncached( $module ) {
    delete require.cache[require.resolve( $module )];
    return require( $module );
}


var config = {
    server: {
        baseDir: "app/"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "localhost"
};

gulp.task('webserver', function() {
    browserSync(config);
});


gulp.task('styles', function(){
	gulp.src('app/sass/style.sass')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(prefix())
	.pipe(gulp.dest('app/css/'))
	.pipe(reload({stream: true}));
});

gulp.task('views', function(){
	gulp.src('app/templates/*.pug')
	.pipe(data(function(file){
		return requireUncached('./app/templates/data/data.json')
	}))
	.pipe(plumber())
	.pipe(plumberNotifier())
	.pipe(pug())
	.pipe(prettify({indent_char: ' ', indent_size: 2}))
	.pipe(gulp.dest('app/'))
	.pipe(reload({stream: true}));
});



gulp.task('watch', function(){
	gulp.watch('app/sass/**/*.sass', ['styles']);
	gulp.watch('app/templates/**/*.pug', ['views']);
	gulp.watch('app/templates/data/data.json', ['views']);
});

gulp.task('script', function(){
	gulp.src(['app/js/*.js', '!app/js/*.min.js'])
	.pipe(uglify())
	.pipe(rename({
		sunffix: '.min'
	}))
	.pipe(gulp.dest('app/js/'));
})
gulp.task('default', ['styles', 'views', 'watch', 'webserver']);
gulp.task('final', ['scripts']);