module.exports = {
  taskName: 'deploy',
  description: 'Публикация сборки проекта в git-репозитории',
  src: 'build/**/*.*',
  deployOptions: {
    repository: 'https://github.com/polygonweb/technomart.git',
    message: 'deploy',
    branches: ['gh-pages'],
    verbose: true,
    debug: true
  }
}
