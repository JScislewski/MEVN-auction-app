import Vue from "vue";
import Vuex from "vuex";
import io from "socket.io-client";
import router from "../router/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    newMessage: false,
    socket: null,
    //socketURI: "https://localhost:3000",
    socketURI: `https://${window.location.host}`,
    user: null,
  },
  mutations: {
    login(state, user) {
      state.socket = io(state.socketURI);
      state.socket.emit("notify", user.username);
      state.user = user;

      state.socket.on("msgNotify", () => {
        if (router.currentRoute.name !== "chat") {
          state.newMessage = true;
        }
        console.log("NEW MESSAGE");
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
