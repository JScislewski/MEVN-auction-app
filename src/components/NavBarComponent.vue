<template>
  <div class="nav">
    <input type="checkbox" id="nav-check" />
    <div class="nav-header">
      <div class="nav-title">AUCTION-APP</div>
    </div>
    <div class="nav-btn">
      <label for="nav-check">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
    <div class="nav-links">
      <router-link to="/">HOME</router-link>
      <template v-if="!this.$store.state.user">
        <router-link to="/login">LOGIN</router-link>
        <router-link to="/register">REGISTER</router-link>
      </template>
      <template v-else>
        <router-link to="/newAuction">NEW AUCTION</router-link>
        <router-link to="/my-auctions">MY AUCTIONS</router-link>
        <router-link to="/won-auctions">WON AUCTIONS</router-link>
        <router-link to="/my-bids">MY BIDS</router-link>
        <router-link to="/chat">CHAT</router-link>
        <span class="new_message_alert" v-if="this.$store.state.newMessage">
          NEW MSG!
        </span>
        <a v-on:click="logout()">LOGOUT</a>
      </template>
      <div id="username" v-if="this.$store.state.user !== null">
        USER: {{ this.$store.state.user.username }}
      </div>
    </div>
  </div>
</template>

<script>
import AuthorizationService from "../service/AuthorizationService";
export default {
  name: "NavBarComponent",
  methods: {
    logout() {
      AuthorizationService.logout();
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0px;
  font-family: "segoe ui";
}

.new_message_alert {
  color: #664176;
}
.nav {
  height: 50px;
  width: 100%;
  background-color: #48a9a6;
  position: relative;
}

.nav > .nav-header {
  display: inline;
}

.nav > .nav-header > .nav-title {
  display: inline-block;
  font-size: 22px;
  color: #2e3738;
  padding: 10px 10px 10px 10px;
}

.nav > .nav-btn {
  display: none;
}

.nav > .nav-links {
  display: inline;
  float: right;
  font-size: 18px;
}

.nav > .nav-links > a,
#username {
  display: inline-block;
  padding: 13px 10px 13px 10px;
  text-decoration: none;
  color: #2e3738;
}

.nav > .nav-links > a:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.nav > #nav-check {
  display: none;
}

@media (max-width: 600px) {
  .nav > .nav-btn {
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .nav > .nav-btn > label {
    display: inline-block;
    width: 50px;
    height: 50px;
    padding: 13px;
  }
  .nav > .nav-btn > label:hover,
  .nav #nav-check:checked ~ .nav-btn > label {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .nav > .nav-btn > label > span {
    display: block;
    width: 25px;
    height: 10px;
    border-top: 2px solid #eee;
  }
  .nav > .nav-links {
    position: absolute;
    display: block;
    width: 100%;
    background-color: #2e3738;
    height: 0px;
    transition: all 0.3s ease-in;
    overflow-y: hidden;
    top: 50px;
    left: 0px;
  }
  .nav > .nav-links > a {
    display: block;
    width: 100%;
  }
  .nav > #nav-check:not(:checked) ~ .nav-links {
    height: 0px;
  }
  .nav > #nav-check:checked ~ .nav-links {
    height: calc(100vh - 50px);
    overflow-y: auto;
  }
}
a.router-link-exact-active {
  background-color: #ad8350;
}
</style>
