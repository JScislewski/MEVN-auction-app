import axios from "axios";

const url = "http://localhost:5000/auctions";

axios.defaults.withCredentials = true;

class AuctionsService {
  static getAuction(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/${id}`)
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
        .get(`${url}/all/${amount}`)
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
        .get(`${url}/myAuctions`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getWonAuctions() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/wonAuctions`, { withCredentials: true })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getCurrentAuctions() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/currentAuctions`, { withCredentials: true })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static createAuction(auction) {
    return axios.post(url, auction);
  }

  static buyAuction(id) {
    return axios.patch(`${url}/${id}/buyout`, {});
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
}

export default AuctionsService;
