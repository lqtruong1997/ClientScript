var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var uglify = require("gulp-uglify");
const { series } = require("gulp");
var browserify = require("browserify");
var tsify = require("tsify");
var source = require("vinyl-source-stream");
var rename = require("gulp-rename");
var babelify = require("babelify");
var fs = require("fs");
var sourcemaps = require("gulp-sourcemaps");
var uglifycss = require("gulp-uglifycss");
var babel = require("gulp-babel");
var buffer = require("vinyl-buffer");
var clean = require("gulp-clean");
var merge = require("merge-stream");
var concat = require("gulp-concat");

var cssLib = ["src/styles/sass/vendors/react-datepicker.css"];

function scripts() {
    var files = "./src/scripts/index.tsx";
    var libFile = [
        // "@material-ui/icons/*",
        // "react",
        // "@material-ui/core/*",
        // "@material-ui/core",
        // "react-datepicker",
        // "react-router-dom",
        // "react-dom"
        //"date-fns/locale/vi/index.js"
    ];

    return (
        browserify()
            .add(files)
            .exclude(libFile)
            .plugin(tsify, { target: "es2015" })
            .transform(babelify, { extensions: [".tsx", ".ts", ".js", ".jsx"] })
            .bundle()
            .on("error", function(error) {
                console.error(error.toString());
            })
            .pipe(source("bundle.js"))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(
                babel({
                    compact: true,
                    presets: ["@babel/preset-env"]
                })
            )
            //.pipe(uglify())
            .pipe(sourcemaps.write("./"))
            .pipe(gulp.dest("public"))
    );
}

function lib() {
    var tsFile = [
        "./src/scripts/vendors/material-ui-icons/AccessTime.d.ts",
        "./src/scripts/vendors/material-ui-icons/AccountCircle.d.ts",
        "./src/scripts/vendors/material-ui-icons/Add.d.ts",
        "./src/scripts/vendors/material-ui-icons/BusinessCenter.d.ts",
        "./src/scripts/vendors/material-ui-icons/CalendarToday.d.ts",
        "./src/scripts/vendors/material-ui-icons/ChevronRight.d.ts",
        "./src/scripts/vendors/material-ui-icons/Comment.d.ts",
        "./src/scripts/vendors/material-ui-icons/FilterList.d.ts",
        "./src/scripts/vendors/material-ui-icons/Home.d.ts",
        "./src/scripts/vendors/material-ui-icons/List.d.ts",
        "./src/scripts/vendors/material-ui-icons/NotificationsNone.d.ts",
        "./src/scripts/vendors/material-ui-icons/Person.d.ts",
        "./src/scripts/vendors/material-ui-icons/Refresh.d.ts",
        "./src/scripts/vendors/material-ui-icons/Timelapse.d.ts"
    ];
    var jsFile = [
        //"./src/scripts/vendors/date-fns.js",
        "./src/scripts/vendors/material-ui-cores.js",
        "./src/scripts/vendors/react-datepicker.js",
        "./src/scripts/vendors/react-router-dom.js",
        "./src/scripts/vendors/material-ui-icons/AccessTime.js",
        "./src/scripts/vendors/material-ui-icons/AccountCircle.js",
        "./src/scripts/vendors/material-ui-icons/Add.js",
        "./src/scripts/vendors/material-ui-icons/BusinessCenter.js",
        "./src/scripts/vendors/material-ui-icons/CalendarToday.js",
        "./src/scripts/vendors/material-ui-icons/ChevronRight.js",
        "./src/scripts/vendors/material-ui-icons/Comment.js",
        "./src/scripts/vendors/material-ui-icons/FilterList.js",
        "./src/scripts/vendors/material-ui-icons/Home.js",
        "./src/scripts/vendors/material-ui-icons/List.js",
        "./src/scripts/vendors/material-ui-icons/NotificationsNone.js",
        "./src/scripts/vendors/material-ui-icons/Person.js",
        "./src/scripts/vendors/material-ui-icons/Refresh.js",
        "./src/scripts/vendors/material-ui-icons/TimeLapse.js",
        "./src/scripts/vendors/react.js",
        "./src/scripts/vendors/react-dom.js"
    ];

    var tsStream = browserify()
        .add(tsFile)
        .plugin(tsify, { target: "es2015" })
        .transform(babelify, { extensions: [".tsx", ".ts", ".js", ".jsx"] })
        .bundle()
        .on("error", function(error) {
            console.error(error.toString());
        })
        .pipe(source("tsVendor.js"))
        .pipe(buffer())
        .pipe(gulp.dest("public"));

    var jsStream = gulp.src(jsFile);

    return merge(tsStream, jsStream)
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest("public"));
}

function scss() {
    var sassStream, cssStream;

    sassStream = gulp
        .src("src/styles/sass/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass());
    cssStream = gulp.src(cssLib);

    return merge(sassStream, cssStream)
        .pipe(concat("index.css"))
        .pipe(
            uglifycss({
                maxLineLen: 80,
                uglyComments: true
            })
        )
        .on("error", sass.logError)
        .pipe(rename("index.min.css"))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("public"))
        .pipe(
            browserSync.reload({
                stream: true
            })
        );
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "public"
        }
    });
    gulp.watch("src/styles/sass/**/*.scss", scss);
}

exports.scripts = scripts;

exports.lib = lib;

exports.watch = series(scss, watch);
