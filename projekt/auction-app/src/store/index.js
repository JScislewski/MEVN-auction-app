import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    user: null,
  },
  mutations: {
    login(state, user) {
      state.user = user;
    },
    logout(state) {
      sessionStorage.clear();
      state.user = null;
    },
  },
});

export default store;
