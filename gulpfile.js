let gulp = require("gulp");
let babel = require("gulp-babel");

gulp.task("babel-prod", function () {
    return gulp.src(['app/**/*.js', '!app/scripts/*'])
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});

gulp.task("default", function (dist) {
    return gulp.src(['app/**/*.js', '!app/scripts/*'])
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});
