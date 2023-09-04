import replace from "gulp-replace"; //поиск замена
import plumber from "gulp-plumber"; //обработка ошибок
import notify from "gulp-notify"; //сообщения(подсказки)
import browserSync from "browser-sync"; //локальный сервер
import newer from "gulp-newer"; //проверка обновления(обновилась ли картинка действительно, тоесть если картинка уже есть то обновлятся не будет, если же нет то будет добавлятся нововствленая картинка)
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