import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allMenus: [],
    cartMenu: [],
    userData: ''
  },
  mutations: {
    GET_ALL_MENU (state, data) {
      state.allMenus = data
    },
    ADD_TO_CART (state, { data, count }) {
      const cart = state.cartMenu.find((a) => {
        return a.data.id_menu === data.id_menu
      })
      if (!cart) {
        state.cartMenu.push({
          data,
          count
        })
      } else {
        cart.count += 1
      }
    },
    ADD_COUNT_CART (state, data) {
      const cnt = state.cartMenu.find((e) => {
        return e.data.id_menu === data.data.id_menu
      })
      if (cnt) {
        cnt.count += 1
      }
    },
    MIN_COUNT_CART (state, data) {
      const cnt = state.cartMenu.find((e) => {
        return e.data.id_menu === data.data.id_menu
      })
      if (cnt) {
        cnt.count -= 1
        if (cnt.count < 1) {
          cnt.count += 1
        }
      }
    },
    CLEAR_CART (state) {
      state.cartMenu = []
    },
    USER_DATA (state, data) {
      state.userData = data
    }
  },
  actions: {
    getAllMenus (context, { page, search }) {
      axios.get(`${process.env.VUE_APP_BASE_URL}/api/AllMenu/page/?page=${page}&limit=12&search=${search}`).then((result) => {
        context.commit('GET_ALL_MENU', result.data)
        console.log(page)
      })
    },
    addMenu (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_URL}/api/AllMenu/add`, data).then((res) => {
          resolve(res)
        })
      })
    },
    loginAction (context, data) {
      console.log(process.env.VUE_APP_BASE_URL)
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_URL}/api/user/login`, data).then((res) => {
          resolve(res)
        })
      })
    },
    getUserById (context, data) {
      axios.get(`${process.env.VUE_APP_BASE_URL}/api/user/get/${data}`).then((result) => {
        context.commit('USER_DATA', result.data)
      })
    },
    checkOutOrder (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_URL}/api/AllMenu/order`, data).then((result) => {
          resolve(result)
        })
      })
    },
    getAllOrder (context, data) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_BASE_URL}/api/AllMenu/AllOrder`).then((result) => {
          resolve(result)
        })
      })
    }
  },
  modules: {
  }
})
