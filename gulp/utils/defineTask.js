/**
 * Создание тасков, которые загружаются по требованию
 */
const path = require('path');
const fs = require('fs');

const defineTask = (gulp, plugins) => (config) => {
    var localConfig = {};
    try {
      localConfig = require(path.resolve(config.taskPath, 'config.js'));
      localConfig = typeof localConfig === 'function'
        ? localConfig({ localPath: config.taskPath })
        : localConfig;
    } catch(e) {}

    let taskConfig = Object.assign({}, localConfig, config);

    if (config.onError && typeof config.onError === 'function') {
      taskConfig.onError = config.onError;
    } else {
      taskConfig.onError = function(error) {
        !!plugins.browserSync && !!plugins.browserSync.active && plugins.browserSync.notify(`
          <div style="max-width: 480px; text-align: left; padding: 10px; background: red; color: #fff">
            <div>${taskConfig.taskName}</div>
            <div>${error.message}</div>
          </div>
        `, 5000);
        plugins.notify.onError({
          title: 'Gulp: <%= options.taskName %>',
          message: '<%= error.message %>',
          templateOptions: {
            taskName: taskConfig.taskName
          }
        })(error);
        // this - ссылка на поток
        // this.end()
        this.emit('end');
      }
    };

    let gulpFunc = done => {
      const taskPath = path.resolve(config.taskPath);
      try {
        let taskFn = require(taskPath)(gulp, plugins, taskConfig);
        return taskFn(done);
      } catch(e) {
        let util = plugins.util;
        util.log(util.colors.red(`Failed to load task in the directory ${taskPath}`));
        return done();
      }
    };

    if (taskConfig.description) gulpFunc.description = taskConfig.description;

    gulp.task(taskConfig.taskName, gulpFunc);
};

module.exports = defineTask;
