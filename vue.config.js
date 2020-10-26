module.exports = {
  lintOnSave: true,
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
