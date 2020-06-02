import axios from "axios";

const url = "http://localhost:5000";

axios.defaults.withCredentials = true;

class AuctionsService {
  static getAuction(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/auctions/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getAuctions(amount) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/auctions/all/${amount}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getMyAuctions() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/my-auctions`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static createAuction(auction) {
    return axios.post(`${url}/auctions`, auction);
  }
  static deleteAuction(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  static buyout(id) {
    return axios.patch(`${url}/buyout/${id}`);
  }
}

export default AuctionsService;
