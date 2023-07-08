import replace from "gulp-replace"; //поиск замена
import plumber from "gulp-plumber"; //обработка ошибок
import notify from "gulp-notify"; //сообщения(подсказки)
import browserSync from "browser-sync"; //локальный сервер
import newer from "gulp-newer"; //локальный сервер
import ifPlagin from "gulp-if"; //условное ветвление


//Экспортируем обьект
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browserSync: browserSync,
    newer: newer,
    if: ifPlagin
}