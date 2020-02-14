import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    id: '',
    usersLink: 'http://188.225.47.187/api/jsonstorage/16511f65a152238deddcf81efe9fbcd7',
    postsLink: 'http://188.225.47.187/api/jsonstorage/04946c4bee9501b954a161959b17f05b',
    isLogined: false,

  },
  mutations: {
    SetUser(state, obj) {
      state.user = obj.user;
      state.id = obj.id;
      state.isLogined = true;
    },
    DelUser(state) {
      state.user = {};
      state.id = '';
      state.isLogined = false;
    }
  },
  actions: {
    setUser(ctx, obj) {
      ctx.commit('SetUser', obj);
    },
    delUser(ctx) {
      ctx.commit('DelUser');
    }
  },
  modules: {
  },
  getters: {
    getUser: function (state) { return state.user },
    getId: function (state) { return state.id },
    getIsLogined: function (state) { return state.isLogined },
    getUserLink: function (state) { return state.usersLink },
    getPostLink: function (state) { return state.postsLink },
  }
})
