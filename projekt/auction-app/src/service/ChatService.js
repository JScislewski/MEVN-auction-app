import axios from "axios";

const url = "http://localhost:5000/chat";

class ChatService {
  static getMessages(user, user2) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/${user}/${user2}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getRecipients(user) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/${user}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default ChatService;
