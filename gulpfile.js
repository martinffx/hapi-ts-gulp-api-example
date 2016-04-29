const gulp = require('gulp'),
      typescript = require('gulp-typescript'),
      tsProject = typescript.createProject('tsconfig.json', {
          typescript: require('typescript')
      }),
      nodemon = require('gulp-nodemon'),
      Cache = require('gulp-file-cache'),
      lab = require('gulp-lab'),
      env = require('gulp-env');

var cache = new Cache();

gulp.task('compile', function() {
    return gulp.src("src/**/*.ts")
        .pipe(cache.filter())
        .pipe(typescript(tsProject)).js
        .pipe(cache.cache())
        .pipe(gulp.dest('bin'));
});

gulp.task('server', function () {
    env({
        vars: {
            PORT: 3001
        }
    });

    nodemon({ script: 'bin/index.js'
              , ext: 'ts'
              , tasks: ['compile'] })
        .on('restart', function () {
            console.log('restarted!');
        });
});

gulp.task('test', function(){
    return gulp.src('spec')
        .pipe(env({
            vars: {
                PORT: 3002
            }
        }))
        .pipe(lab());
});

gulp.task('watch', function(){
    gulp.watch(['src/**/*.js', 'spec/**/*.js'], ['test']);
});

gulp.task('default', ['compile', 'server', 'watch']);
