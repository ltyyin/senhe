const path = require('path')

//  less文件的路径
/* const myTheme = require(path.join(process.cwd(), './src/assets/less/vantChange.less'))*/

// 引入自定义样式变量 + vant-theme (less)
const variables = path.resolve(__dirname, './src/assets/less/variables.less')

module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/webapi/api': {
        target: 'http://localhost:5000',
        // target: 'http://4871o44a00.wicp.vip',
        changeOrigin: true, // 允许跨域
        ws: true,
        pathRewrite: {
          '^/webapi/': '',
        },
      },
    },
  },

  /* vant ui 组件库提示 */
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 直接覆盖变量
          // 'text-color': '#111',
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${variables}"`,
        },
        // globalVars: {
        //   'theme-color': 'red',
        // },
      },
    },
  },
}
