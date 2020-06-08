<template>
  <div class="login_form">
    <p class="error" v-for="(error, idx) in this.errors" :key="idx">
      {{ error }}
    </p>
    <label for="username">Username:</label>
    <input type="text" v-model="username" id="username" value="username" />
    <label for="username2">Repeat username:</label>
    <input type="text" v-model="username2" id="username2" value="username" />
    <label for="password">Password:</label>
    <input type="password" v-model="password" id="password" value="password" />
    <label for="password2">Repeat password:</label>
    <input
      type="password"
      v-model="password2"
      id="password2"
      value="password"
    />
    <button v-on:click="register">Register</button>
  </div>
</template>

<script>
import AuthService from "../service/AuthorizationService";

export default {
  name: "RegisterComponent",
  data() {
    return {
      username: null,
      username2: null,
      password: null,
      password2: null,
      errors: [],
    };
  },
  methods: {
    async register() {
      this.errors = [];
      if (this.username !== this.username2) {
        this.errors.push("Usernames are not the same!");
      }

      if (this.password !== this.password2) {
        this.errors.push("Passwords do not match!");
      }

      if (this.errors.length === 0) {
        AuthService.register(this.username, this.password)
          .then((res) => {
            if (res.status === 201) {
              this.$router.push("/login");
            }
          })
          .catch((err) => {
            if (err.response.status === 409) {
              this.errors.push(err.response.data.message);
            }
          });
      }
    },
  },
};
</script>
