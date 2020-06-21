import Vue from "vue";
import Vuex from "vuex";
import io from "socket.io-client";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: {
    socket: null,
    socketURI: `https://${window.location.host}`,
    user: null
  },
  mutations: {
    login(state, user) {
      state.socket = io(state.socketURI);
      state.user = user;
    },
    logout(state) {
      state.user = null;
    }
  }
});

export default store;
