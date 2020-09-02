<template>
  <div class="login_form">
    <label for="usernameInput">Username:</label>
    <input type="text" v-model="username" id="usernameInput" value="username" />
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
    <p class="error" v-for="(error, idx) in this.errors" :key="idx">
      {{ error }}
    </p>
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
