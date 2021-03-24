import Vue from 'vue'
import Vuex from 'vuex'
// 引入子状态
import city from './city'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    city,
  }
})
