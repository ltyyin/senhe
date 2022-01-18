import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局引入 vant 组件
import Vant from 'vant'

import 'vant/lib/index.css'
// 加载全局样式
import './styles/index.less'
// 加载图标样式
import './assets/iconfont/iconfont.css'
// dayjs 时间处理
import './utils/dayjs'

// 阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

// 注册vant组件
Vue.use(Vant)

// 把 App 根组件渲染到 #app 节点
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
