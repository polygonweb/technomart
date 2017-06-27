module.exports = {
  taskName: 'server',
  description: 'Запуск сервера Browsersync для разработки',
  webpackConfig: require('../scripts/webpack.config.js'),
  enableHot: true,
  bsConfig: {
    server: {
      baseDir: 'build',
      directory: true
    },
    host: 'localhost',
    port: 3000,
    notify: true,
    injectChanges: true,
    open: true,
    tunnel: false
  }
}
