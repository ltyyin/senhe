/* 搜索模块状态 */

export const searchModel = {
  namespaced: true,

  state: {
    searchText: '', // 搜索框中的内容，搜索关键词
  },

  actions: {},

  mutations: {
    // 搜索框中的内容，搜索关键词
    searchTextMu(state, payload) {
      state.searchText = payload
    },
  },

  getters: {},
}
