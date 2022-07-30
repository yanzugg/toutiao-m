import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

const TOUTIAO_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // user: JSON.parse(window.localStorage.getItem(TOUTIAO_KEY))
    user: getItem(TOUTIAO_KEY)
  },
  getters: {
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // window.localStorage.setItem(TOUTIAO_KEY, JSON.stringify(state.user))
      setItem(TOUTIAO_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
