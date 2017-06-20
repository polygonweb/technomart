module.exports = (gulp, plugins, config) => {
  const webpackStream = require('webpack-stream');
  // const webpack = require('webpack');
  const webpack = webpackStream.webpack;
  const named = require('vinyl-named');

  return (done) => {
    return plugins.combiner(
      gulp.src(config.src),
      named(),
      webpackStream(config.webpack, webpack),
      gulp.dest(config.dest)
    ).on('error', config.onError);
  };
};
