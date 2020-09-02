import axios from "axios";

//const url = "http://localhost:3000/api/authentication";

const url = "api/authentication";

class AuthorizationService {
  static register(username, password) {
    return axios.post(`${url}/register`, {
      username: username,
      password: password,
    });
  }

  static login(username, password) {
    return axios.post(`${url}/login`, {
      username: username,
      password: password,
    });
  }

  static logout() {
    return axios.get(`${url}/logout`);
  }
}

export default AuthorizationService;
