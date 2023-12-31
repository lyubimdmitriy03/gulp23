import * as dartSass from 'sass';
import gulpSass from 'gulp-sass'
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css';//сжатие css файла
import webpcss from 'gulp-webpcss';//вывод WEBP изображений
import autoprefixer from 'gulp-autoprefixer';//добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'
import webp from "gulp-webp";
import sourcemaps from "gulp-sourcemaps";
//групировка медиа запросов

const sass = gulpSass(dartSass);

export const rtl_scss = () => {
    return app.gulp.src(app.path.src.rtl_scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "rtl_SCSS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(app.plugins.replace(/(\.\.\/){2}img\//g, '../img/'))
        .pipe(app.plugins.replace(/(\.\.\/){2}files\//g, '../files/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss({
                    webpClass: ".webp",
                    noWebpClass: ".no-webp"
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ["last 3 versions"],
                    cascade: true
                })
            )
        )
        .pipe(sourcemaps.init())
        //раскоментировать если нужен не сжатый файл стилей
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(sourcemaps.write())
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browserSync.stream());
}