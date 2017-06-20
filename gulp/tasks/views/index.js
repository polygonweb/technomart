/**
 * Обработка представлений
 */
module.exports = (gulp, plugins, config) => (done) => {
  return plugins.combiner(
    gulp.src(config.src),
    plugins.pug(config.engineOptions),
    gulp.dest(config.dest),
    plugins.if(
      !!plugins.browserSync.active,
        plugins.browserSync.stream({
          once: true
        }),
        plugins.util.noop()
    )
  ).on('error', config.onError);
}
