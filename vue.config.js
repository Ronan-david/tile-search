module.exports = {
  lintOnSave: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/tile-search/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/styles/default.scss";
          `
      }
    }
  }
}
