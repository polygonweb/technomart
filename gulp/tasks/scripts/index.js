module.exports = (gulp, plugins, config) => {
  const webpack = require('webpack');
  const webpackConfig = config.webpackConfig;

  return (done) => {
    return new Promise(resolve => webpack(webpackConfig, (err, stats) => {
      if(err) console.log('Webpack', err)
      console.log(stats.toString({ colors: true }))
      resolve()
    }))
  };
};
