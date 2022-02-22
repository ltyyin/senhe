import Vue from 'vue'
import Vuex from 'vuex'
// 关于登录的状态共享
import { loginModel } from '@/store/login.js'
import { articleModel } from '@/store/article.js'
import { searchModel } from '@/store/search.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loginModel,
    articleModel,
    searchModel,
  },
})
