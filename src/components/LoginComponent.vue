<template>
  <div class="login_form">
    <label for="usernameInput">Username:</label>
    <input type="text" v-model="username" id="usernameInput" value="username" />
    <label for="password">Password:</label>
    <input type="password" v-model="password" id="password" value="password" />
    <button v-on:click="login">LOGIN</button>
    <span class="error" v-if="error">{{ error }}</span>
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
      error: null,
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
            this.error = err.response.data.message;
          }
        });
    },
  },
};
</script>
<style scoped lang="scss">
.login_form {
  color: black;
  text-align: left;
  margin: 20px auto 0 auto;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  font-size: 16px;

  button,
  input,
  textarea {
    color: black;
    padding: 10px;
    border-radius: 10px;
    margin: 20px;
  }

  button {
    cursor: pointer;
    background-color: #48a9a6;
    color: white;
    font-weight: bold;
    text-decoration: none;
    border: none;
  }

  label {
    margin-top: 10px;
    margin-left: 30px;
    font-weight: bold;
  }

  input {
    text-align: left;
    border: 2px solid black;
  }

  input:focus {
    background-color: #c9b0d4;
  }

  .error {
    padding: 10px;
    border-radius: 25px;
    margin: 10px 20px;
    color: white;
    background-color: #c03546;
    font-size: 13px;
  }
}
</style>
