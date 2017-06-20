/**
 * Запуск сервера Browsersync для разработки
 */
module.exports = (gulp, plugins, config) => (done) => {
  plugins.browserSync
    .init(Object.assign({}, config.bsConfig || {}));
  done();
};
