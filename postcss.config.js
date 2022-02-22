/**
 *  postCSS 的配置文件
 *  使用 postcss-px-to-viewport 插件来适配移动端。
 *  使项目中的 px 单位能转换成 vm 单位。
 *  插件使用地址：https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
 *  注意：行内样式的单位是不会转换的。
 *
 * postCSS 是基于 Node.js 运行的一个处理 CSS 的工具
 * 所以它的配置文件也是运行在 Node.js 中
 */

// postCSS 配置文件需要导出一个对象
module.exports = {
  // 配置要使用的相关插件
  plugins: {
    // 自动添加浏览器厂商声明前缀，用来兼容不同的浏览器。
    // VueCLI 已经在内部默认配置了 autoprefixer
    // autoprefixer: {
    //   // browsers 用来配置要兼容到的系统(浏览器)环境
    //   // 为什么？ 因为 VueCLI 是通过项目中的 .browserslistrc 文件来配置兼容的环境信息的
    //   browsers: ['Android >= 4.0', 'ios >= 8'],
    // },

    'postcss-px-to-viewport': {
      /**
       * Vant 组件库是基于逻辑像素 375 写的
       * 移动端页面一般都是以 iPhone 6/7/8 为原型设计的
       * 设计稿都是基于物理像素 750 宽设计的
       * 所以如果设置成 750，那么我们就可以在设计稿中测量多少就写多少，但是 Vant 的样式就会变得很小，小了一半。
       * 所以我们还必须设置成 750，但是在测量我们的设计稿的时候我们必须让你的测量单位 / 2
       * 有没有更好的办法：不用计算
       */
      viewportWidth: 375, //视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667, //视窗的高度，对应的是我们设计稿的高度
      unitPrecision: 5, //制定‘px’转换为视窗单位的小数位数（很多时候无法整除）
      viewportUnit: 'vw', //指定需要转换成的视窗单位，建议使用vw
      // selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要转换的类，
      minPixelValue: 1, //小于或等于‘1px’不转换为视窗单位
      mediaQuery: false, //允许在媒体查询中转换为‘px’

      /* 以上都是默认的配置 */
      landscapeWidth: 667, //横屏时使用的视口宽度
    },
  },
}
