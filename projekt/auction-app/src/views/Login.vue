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
import AuthService from "../service/AuthService";
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
      AuthService.login(this.username, this.password)
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

<style lang="scss">
.errors_container {
  margin-bottom: 10px;
}
.login_form {
  text-align: left;
  margin: 20px auto 0 auto;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  button,
  input {
    padding: 10px;
    border-radius: 10px;
    margin: 20px;
  }
  button {
    cursor: pointer;
    background-color: green;
    color: white;
  }
  label {
    text-align: center;
    font-weight: bold;
    color: black;
  }
  input {
    color: #2c3e50;
    text-align: left;
    border: solid 1px;
  }
  input:focus {
    background-color: greenyellow;
  }
  .error {
    text-align: center;
    font-weight: bold;
    padding: 10px;
    border-radius: 10px;
    margin: 5px;
    color: white;
    background-color: red;
    font-size: 12px;
  }
}
</style>
