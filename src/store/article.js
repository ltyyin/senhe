export const articleModel = {
  namespaced: true,

  state: {
    /* 一上来是否获取用户频道 */
    isGetChannels: true,
  },

  /* actions */
  actions: {},

  mutations: {
    setGetChannels(state, val) {
      state.isGetChannels = val
    },
  },

  getters: {},
}
