const path = require('path')
//less文件的路径
// const myTheme = require(path.join(process.cwd(), '/src/assets/less/vantChange.less'))
const myTheme = path.resolve(__dirname, './src/assets/less/vantChange.less')

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api/': '',
        },
      },
    },
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${myTheme}";`,
        },
      },
    },
  },
}
