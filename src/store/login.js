import { getItem, setItem, removeItem } from '@/utils/storage'

const USER_KEY = 'user'
const USER_INFO = 'userInfo'

export const loginModel = {
  namespaced: true,

  state: {
    showLogin: false,
    showVerification: false,
    // 当前登录用户的登录状态(token等数据)
    user: getItem(USER_KEY),
    userInfo: null,
    phoneNum: '',
    // 控制验证码输入框的焦点问题
    codeInputFocus: true,
    /* 显示哪个登录框 */
    displayField: true,
  },

  /* actions */
  actions: {},

  mutations: {
    // 是否显示整个登录组件
    switchShowLogin(state, val) {
      state.showLogin = val
    },

    // 是否显示验证码输入组件的显示
    switchVerification(state, val) {
      state.showVerification = val
    },

    // 改变用户电话号码
    switchPhoneNum(state, val) {
      state.phoneNum = val
    },

    // 切换验证码输入组件里面的输入框焦点状态问题
    switchCodeInputFocus(state, status) {
      state.codeInputFocus = status
    },

    // 切换显示哪个用户登录输入框
    switchField(state, status) {
      state.displayField = status
    },

    // 验证成功后后台返回来的数据进行处理
    setUser(state, data) {
      state.user = data

      // 为了防止页面刷新数据丢失，还需要把数据持久化存储。
      if (!!data) {
        setItem(USER_KEY, data)
      } else {
        removeItem(USER_KEY)
      }
    },

    /* 用户信息的处理 */
    setUserInfo(state, data) {
      state.userInfo = data
    },
  },

  getters: {},
}
