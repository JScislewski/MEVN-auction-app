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
    <template v-else>
      <h3>You have no messages, sorry.</h3>
    </template>
  </div>
</template>

<script>
import io from "socket.io-client";
import ChatService from "../service/ChatService";

export default {
  name: "ChatComponent",
  data() {
    return {
      recipients: [],
      currentRecipient: null,
      socket: null,
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
      this.socket.emit("privateChat", {
        from: this.$store.state.user.username,
        to: to,
      });
    },
    sendMsg() {
      if (this.text.length > 0) {
        this.socket.emit("privateMsg", {
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
    if (this.$store.state.user !== null) {
      ChatService.getRecipients(this.$store.state.user.username)
        .then((res) => {
          this.recipients = res;
          console.log(this.$cookies.keys());
          this.socket = io(`https://${window.location.host}`);
          this.socket.on("msg", (data) => {
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
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>
