<template>
  <div class="login_form">
    <div class="errors_container">
      <p class="error" v-for="(error, idx) in this.errors" :key="idx">
        {{ error }}
      </p>
    </div>

    <label for="username">Username:</label>
    <input type="text" v-model="username" id="username" value="username" />
    <label for="password">Password:</label>
    <input type="password" v-model="password" id="password" value="password" />
    <button v-on:click="login">LOGIN</button>
  </div>
</template>

<script>
import AuthorizationService from "../service/AuthorizationService";
export default {
  name: "LoginComponent",
  data() {
    return {
      username: null,
      password: null,
      errors: [],
    };
  },
  methods: {
    async login() {
      this.errors = [];
      AuthorizationService.login(this.username, this.password)
        .then((res) => {
          if (res.status === 200) {
            this.$store.commit("login", res.data.user);
            this.$router.push("/");
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.errors.push(err.response.data.message);
          }
        });
    },
  },
};
</script>
