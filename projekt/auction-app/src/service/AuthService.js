import axios from "axios";

const url = "http://localhost:5000";

class AuthService {
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

export default AuthService;
