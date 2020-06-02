<template>
  <div class="top_bar">
    <div id="nav">
      <router-link to="/">HOME</router-link>
      <template v-if="!this.$store.state.user">
        <router-link to="/login">LOGIN</router-link>
        <router-link to="/register">REGISTER</router-link>
      </template>
      <template v-else>
        <router-link to="/newAuction">NEW AUCTION</router-link>
        <router-link to="/my-auctions">MY AUCTIONS</router-link>
        <a v-on:click="logout()">LOGOUT</a>
      </template>
      <div id="username" v-if="this.$store.state.user !== null">
        USER: {{ this.$store.state.user.username }}
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "../service/AuthService";
export default {
  name: "NavBarComponent",
  methods: {
    logout() {
      AuthService.logout();
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
.top_bar {
  margin-top: 5px;
  #nav {
    display: flex;
    justify-content: center;
    a,
    span, #username {
      white-space: nowrap;
      text-align: left;
      display: inline-block;
      font-size: 20px;
      font-weight: bold;
      color: black;
      padding: 10px;
      text-decoration: none;
    }
    a.router-link-exact-active {
      color: green;
    }
  }
}
</style>
