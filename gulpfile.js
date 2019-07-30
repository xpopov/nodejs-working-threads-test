let gulp = require("gulp");
let babel = require("gulp-babel");

gulp.task("default", function (dist) {
  return gulp.src(['**/*.js', '!node_modules/**', '!dist/**', '!gulpfile.js'])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest("dist"));
});
