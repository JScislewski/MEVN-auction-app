import axios from "axios";

const url = "api/auctions";

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

  static getAuctions(page) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/all/${page}`)
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

  static getWonAuctions() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/won-auctions`, { withCredentials: true })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getMyBids() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/my-bids`, { withCredentials: true })
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
  static editAuction(auction) {
    return axios.patch(`${url}/${auction._id}`, auction);
  }
  static buyout(id) {
    return axios.patch(`${url}/buyout/${id}`);
  }
}

export default AuctionsService;
