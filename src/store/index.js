import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    banners: [],
    products: [],
    categories: [],
    isLoggedIn: false,
    categoryName: '',
    carts: []
  },
  mutations: {
    SET_BANNERS (state, payload) {
      state.banners = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CATEGORIES (state, payload) {
      state.categories = payload
    },
    SET_ISLOGGEDIN (state, payload) {
      state.isLoggedIn = payload
    },
    SET_CATEGORY_NAME (state, payload) {
      state.categoryName = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    }
  },
  actions: {
    fetchBanners (context, payload) {
      axios({
        method: 'GET',
        url: '/banners'
      })
        .then(({ data }) => {
          context.commit('SET_BANNERS', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    fetchProducts (context, payload) {
      axios({
        method: 'GET',
        url: '/products'
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    fetchCategories (context, payload) {
      axios({
        method: 'GET',
        url: '/categories'
      })
        .then(({ data }) => {
          context.commit('SET_CATEGORIES', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    handleLogin (context, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          context.commit('SET_ISLOGGEDIN', true)
          localStorage.setItem('access_token', data.access_token)
          router.push('/')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    handleRegister (context, payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          console.log(data)
          router.push('/login')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    handleLogout (context, payload) {
      localStorage.clear()
      context.commit('SET_ISLOGGEDIN', payload)
      this.state.categoryName = ''
      router.push('/')
    },
    handleAddProductToCart (context, payload) {
      axios({
        method: 'POST',
        url: '/carts/' + payload.ProductId,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
        // data: {
        //   amount: payload.amount
        // }
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCarts (context, payload) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_CARTS', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    addMoreQuantity (context, payload) {
      console.log('from store', payload)
    }
  },
  getters: {
    filterByCategory: state => {
      if (state.categoryName === '' || state.categoryName === 'allData') {
        return state.products
      } else {
        return state.products.filter(product => {
          return product.Category.name === state.categoryName
        })
      }
    }
  },
  modules: {
  }
})
