import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import changed from "gulp-changed";
import concat from "gulp-concat";
import minifyCSS from "gulp-minify-css";
import minifyHTML from "gulp-minify-html";
import sequence from "run-sequence";
import imagemin from "gulp-imagemin";
import rename from "gulp-rename";
import webpack from "webpack";
import { webpackConfig } from "./config.js"

const DIRS = {
    src : "./src",
    dest : "./build",
    styles : "/styles",
    globalStyles : "/global",
    homeStyles : "/home",
    servicesStyles : "/services",
    fonts : "/fonts",
    images : "/images",
    retina : "/retina",
    js : "/js"
};

const PATHS = {
    fontSrc : `${DIRS.src}${DIRS.styles}${DIRS.fonts}`,
    fontDest : `${DIRS.dest}${DIRS.styles}${DIRS.fonts}`,
    globalSrc : `${DIRS.src}${DIRS.styles}${DIRS.globalStyles}`,
    globalDest : `${DIRS.dest}${DIRS.styles}${DIRS.globalStyles}`,
    homeSrc : `${DIRS.src}${DIRS.styles}${DIRS.homeStyles}`,
    homeDest : `${DIRS.dest}${DIRS.styles}${DIRS.homeStyles}`,
    servicesSrc : `${DIRS.src}${DIRS.styles}${DIRS.servicesStyles}`,
    servicesDest : `${DIRS.dest}${DIRS.styles}${DIRS.servicesStyles}`,
    retinaDest : `${DIRS.dest}${DIRS.images}${DIRS.retina}`
};

let compiler = webpack(webpackConfig("global", `${DIRS.src}${DIRS.js}/global.js`));
compiler.watch({
    aggregateTimeout: 100,
    poll: true
}, (err, stats) => {
   if(err) {
       console.log(err);
   }
   else {
       console.log("webpack finished");
   }
});

let styles = (src, dest, name) => {
    return gulp.src(`${src}/*.+(scss|css)`)
        .pipe(changed(dest))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat(name))
        .pipe(minifyCSS())
        .pipe(gulp.dest(dest));
};

let copy = (src, dest) => {
    return gulp.src(src)
        .pipe(changed(dest))
        .pipe(gulp.dest(dest));
};

gulp.task("retina", () => {
    return copy(`${DIRS.src}${DIRS.images}/*.+(jpg|png)`, PATHS.retinaDest);
});

gulp.task("optimise-images", () => {
    return gulp.src(`${DIRS.src}${DIRS.images}/*.+(jpg|png)`)
        .pipe(changed(`${DIRS.dest}${DIRS.images}`))
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(gulp.dest(`${DIRS.dest}${DIRS.images}`));
});

gulp.task("fonts", () => {
    return copy(`${PATHS.fontSrc}/*.+(eot|ttf|woff|woff2|svg)`, PATHS.fontDest);
});

gulp.task("html", () => {
    return gulp.src(`${DIRS.src}/*html`)
        .pipe(minifyHTML())
        .pipe(gulp.dest(`${DIRS.dest}`));
});

gulp.task("home-styles", () => {
    return styles(PATHS.homeSrc, PATHS.homeDest, "home.css");
});

gulp.task("services-styles", () => {
    return styles(PATHS.servicesSrc, PATHS.servicesDest, "services.css");
});

gulp.task("global-styles", () => {
    return styles(PATHS.globalSrc, PATHS.globalDest, "global.css");
});

gulp.task("styles", () => {
    return sequence("global-styles", "home-styles", "services-styles");
});

gulp.task("assets", () => {
    return sequence("html", "fonts", "images");
});

gulp.task("images", () => {
    return sequence("optimise-images", "retina");
});

gulp.task("watch", () => {
    gulp.watch(`${DIRS.src}${DIRS.styles}/*/**.+(css|scss)`, ["styles"]);
    gulp.watch(`${DIRS.src}/*.html`, ["html"]);
});

gulp.task("default", ["styles", "assets", "watch"]);