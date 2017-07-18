/**
 * Публикация сборки проекта в git-репозитории
 */
module.exports = (gulp, plugins, config) => (done) => {
  return plugins.combiner(
      gulp.src(config.src),
      plugins.deployGit(config.deployOptions)
    ).on('error', config.onError);
};
