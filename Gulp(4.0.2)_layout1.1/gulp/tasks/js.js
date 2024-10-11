import webpack from "webpack-stream";

export const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development',
            optimization: {
                splitChunks: {
                    chunks: 'all',
                    cacheGroups: {
                        // reactVendor: {
                        // test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                        // name: 'vendor-react',
                        // chunks: 'all',
                        // },
                        corejsVendor: {
                                test: /[\\/]node_modules[\\/]/,
                                name: 'vendors',
                                chunks: 'all',
                        },
                    },
                },
            },
            output: {
                filename: '[name].min.js',
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browserSync.stream());
}