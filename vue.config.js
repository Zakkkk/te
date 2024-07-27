module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "/tte-dist/" : "/",
  // a test

  chainWebpack: config => {
    config.module
      .rule('yaml')
      .test(/\.ya?ml$/)
      .use('yaml-loader')
      .loader('yaml-loader')
      .end();
  }
};