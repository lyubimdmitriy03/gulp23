//Основной модуль
import gulp from "gulp";
//импорт путей
import { path } from "./gulp/config/path.js";
//Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

//Передача значения в глобальную переменную
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

//Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { libs } from "./gulp/tasks/libs.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { rtlCss } from "./gulp/tasks/rtlcss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

//Наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.files, libs);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.scss, rtlCss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

//создание спрайтов 'npm run svgSprive' - для запуска
export { svgSprive }

//последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)

//основные задачи
//основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, libs, html, scss, js, images));

const rtlVariant = gulp.series(fonts, gulp.parallel(copy, libs, html, scss, rtlCss, js, images));

//Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const dev_rtl = gulp.series(reset, rtlVariant, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build_rtl = gulp.series(reset, rtlVariant, gulp.parallel(watcher, server));
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

//экспорт сценариев
export { dev } //npm run dev
export { build } //npm run build
//для создания rtl версии
export { dev_rtl } //npm run build_rtl
export { build_rtl } //npm run build_rtl
//для создания архива
export { deployZIP } //npm run zip
export { deployFTP }

//Выполнение сценария по умолчанию
gulp.task('default', dev);
