import Vue from "vue";
import Vuex from "vuex";
import io from "socket.io-client";
import createPersistedState from "vuex-persistedstate";
import router from "../router/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      paths: ["unreadMessagesCount"],
    }),
  ],
  state: {
    isOutbid: false,
    currentRecipient: null,
    unreadMessagesCount: {},
    unreadMessagesOverall: 0,
    socket: null,
    socketURI: "https://localhost:3000",
    //socketURI: `https://${window.location.host}`,
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
      state.socket.on("outbid", () => {
        console.log("YOU GOT OUTBIDDED");
        if (router.currentRoute.name !== "Current auctions") {
          state.isOutbid = true;
        }
      });
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
