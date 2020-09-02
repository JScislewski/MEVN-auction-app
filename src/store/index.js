import Vue from "vue";
import Vuex from "vuex";
import io from "socket.io-client";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      paths: ["unreadMessagesCount"],
    }),
  ],
  state: {
    currentRecipient: null,
    unreadMessagesCount: {},
    unreadMessagesOverall: 0,
    socket: null,
    //socketURI: "http://localhost:3000",
    socketURI: `http://${window.location.host}`,
    user: null,
  },
  mutations: {
    resetNewMsgs(state) {
      console.log("SEEN!");
      state.newMsgsCount = 0;
      state.newMsgs = {};
    },
    login(state, user) {
      state.socket = io(state.socketURI);
      state.socket.emit("notify", user.username);
      state.user = user;
      console.log(state.unreadMessagesCount);
      console.log(state.unreadMessagesOverall);
    },
    logout(state) {
      if (state.socket) {
        state.socket.disconnect();
      }
      state.socket = null;
      state.user = null;
    },
  },
});

export default store;
