import * as dartSass from 'sass';
import gulpSass from 'gulp-sass'
import rename from 'gulp-rename';

import rtlcss from 'gulp-rtlcss' // rtl версия
import cleanCss from 'gulp-clean-css';//сжатие css файла
import sourcemaps from 'gulp-sourcemaps';//mapinings показ в консоли SCSS файлов
import webpcss from 'gulp-webpcss';//вывод WEBP изображений
import autoprefixer from 'gulp-autoprefixer';//добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'
import webp from "gulp-webp";

//групировка медиа запросов

const sass = gulpSass(dartSass);

export const rtlCss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
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
        .pipe(rtlcss()) // Convert to RTL.
        .pipe(rename({suffix: '-rtl'})) // Append "-rtl" to the filename.
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(cleanCss())
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