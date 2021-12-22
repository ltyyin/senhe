import Vue from 'vue'
import Vuex from 'vuex'
// 关于登录的状态共享
import { loginAbout } from '@/store/login.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loginAbout,
  },
})
