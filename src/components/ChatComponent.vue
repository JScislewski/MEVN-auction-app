<template>
  <div class="messages_container">
    <button
      class="recipient_btn"
      v-for="(recipient, idx) in recipients"
      :key="'rec' + idx"
      v-on:click="joinChat(recipient)"
      v-bind:class="{ current: isCurrentRecipient(recipient) }"
    >
      {{ recipient }}
    </button>
    <template
      v-if="currentRecipient !== null && currentRecipient !== undefined"
    >
      <div id="message_box">
        <div
          class="message_row"
          v-bind:class="{ sender_row: isSender(message.from) }"
          v-for="(message, idx) in messages"
          :key="'msg' + idx"
        >
          <p v-bind:class="{ sender: isSender(message.from) }">
            {{ message.message }}
          </p>
        </div>
      </div>

      <textarea v-model="text" />
      <div>
        <button class="send_msg_btn" v-on:click="sendMsg">SEND</button>
      </div>
    </template>
    <template v-else> </template>
  </div>
</template>

<script>
import ChatService from "../service/ChatService";

export default {
  name: "ChatComponent",
  data() {
    return {
      recipients: [],
      currentRecipient: null,
      text: null,
      messages: [],
    };
  },
  methods: {
    isCurrentRecipient(username) {
      return username === this.currentRecipient;
    },
    isSender(username) {
      return username === this.$store.state.user.username;
    },
    joinChat(to) {
      this.currentRecipient = to;
      this.getMessages();
      this.$store.state.socket.emit("privateChat", {
        from: this.$store.state.user.username,
        to: to,
      });
    },
    sendMsg() {
      if (this.text.length > 0) {
        this.$store.state.socket.emit("privateMsg", {
          from: this.$store.state.user.username,
          to: this.currentRecipient,
          msg: this.text,
        });
        this.text = "";
      }
    },
    getMessages() {
      ChatService.getMessages(
        this.$store.state.user.username,
        this.currentRecipient
      )
        .then((res) => {
          this.messages = res;
        })
        .catch();
    },
  },
  created() {
    this.$store.state.newMessage = false;
    if (this.$store.state.user !== null) {
      ChatService.getRecipients(this.$store.state.user.username)
        .then((res) => {
          this.recipients = res;
          console.log(this.$cookies.keys());
          this.$store.state.socket.on("msg", (data) => {
            this.messages.push(data);
          });
          if (
            this.$route.params.recipient &&
            !this.recipients.includes(this.$route.params.recipient)
          ) {
            this.recipients.push(this.$route.params.recipient);
            this.joinChat(this.$route.params.recipient);
          } else if (this.recipients) {
            this.joinChat(this.recipients[0]);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            this.$store.commit("logout");
            this.$router.push("/login");
          }
        });
    } else {
      this.$store.commit("logout");
      this.$router.push("/login");
    }
  },
  destroyed() {
    this.$store.state.currentRecipient = null;
  },
};
</script>
<style scoped lang="scss">
.messages_container {
  margin-top: 40px;
  #message_box {
    padding: 10px;
    width: 400px;
    margin: 40px auto;
    max-height: 400px;
    overflow-y: scroll;
    text-align: left;
    display: flex;
    flex-direction: column;
    .message_row {
      display: flex;
      justify-content: left;
    }
    .sender_row {
      justify-content: right;
    }
    p {
      border: 2px solid black;
      padding: 7px;
      margin: 7px;
      display: inline-block;
    }
    .sender {
      background-color: #c9b0d4;
      align-self: flex-end;
      text-align: right;
    }
  }
  button,
  textarea,
  #message_box,
  p {
    border-radius: 10px;
    text-decoration: none;
    border: none;
  }

  button {
    cursor: pointer;
    background-color: #a2a5a8;
    color: white;
    font-weight: bold;
    padding: 10px;
  }
  .current {
    color: black;
    background-color: white;
    border: 2px blue solid;
  }
  textarea {
    border: 2px solid black;
    padding: 10px;
    resize: none;
    width: 400px;
  }
  .send_msg_btn {
    background-color: green;
    margin-top: 10px;
    width: 200px;
  }

  .recipient_btn {
    margin: 0 5px;
  }
}
</style>
