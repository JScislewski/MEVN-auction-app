<template>
  <div class="auction_form">
    <label for="title">Title:</label>
    <input type="text" v-model="name" id="title" />

    <label for="description">Description:</label>

    <textarea v-model="description" id="description" />

    <label>Auction type:</label>

    <label class="radio_label">
      <input
        v-model="auctionType"
        type="radio"
        name="auction_type"
        value="Buyout"
      />Buyout</label
    >
    <label class="radio_label">
      <input
        v-model="auctionType"
        type="radio"
        name="auction_type"
        value="Bid"
      />Bid</label
    >

    <label v-if="auctionType" class="price_label">
      <span v-if="auctionType === 'Buyout'">Buyout price:</span>
      <span v-if="auctionType === 'Bid'">Starting bid:</span>
    </label>

    <input
      step="0.01"
      v-model="buyoutPrice"
      v-if="auctionType === 'Buyout'"
      type="number"
    />

    <input
      step="0.01"
      v-model="startingBid"
      v-if="auctionType === 'Bid'"
      type="number"
    />

    <label v-if="auctionType === 'Bid'" for="ends_date">Auction ends: </label>
    <div class="date">
      <input
        id="ends_date"
        :min="getFormatedDate()"
        type="date"
        v-if="auctionType === 'Bid'"
        v-model="endsDate"
        v-bind:class="{ err: errors.date }"
      />
      <input
        id="hour_date"
        type="time"
        v-if="auctionType === 'Bid'"
        v-model="endsTime"
        v-bind:class="{ err: errors.date }"
      />
    </div>
    <button v-on:click="createAuction">CREATE</button>
    <div class="errors_container">
      <span class="error" v-for="(error, idx) in this.errors" :key="idx">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script>
import AuctionsService from "../service/AuctionsService";

export default {
  name: "NewAuction",
  data() {
    return {
      name: null,
      description: null,
      auctionType: null,
      buyoutPrice: null,
      startingBid: null,
      ends: null,
      errors: [],
      endsDate: null,
      endsTime: null,
    };
  },
  methods: {
    getFormatedDate() {
      const today = new Date();
      return `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(
        -2
      )}-${("0" + today.getDate()).slice(-2)}`;
    },
    async createAuction() {
      this.errors = [];
      let auction = {
        name: this.name,
        description: this.description,
        sellerName: this.$store.state.user.username,
        endsDate: null,
        endsTime: null,
        buyoutPrice: null,
        startingBid: null,
      };
      if (this.auctionType === "Buyout") {
        auction.buyoutPrice = Math.round(this.buyoutPrice * 100) / 100;
      } else {
        auction.startingBid = Math.round(this.startingBid * 100) / 100;
        auction.endsDate = new Date(`${this.endsDate} ${this.endsTime}`);
        console.log(auction.endsDate);
      }
      AuctionsService.createAuction(auction)
        .then((res) => {
          if (res.status === 201) {
            this.$router.push("/");
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            this.errors.push(err.response.data.message);
          }
          if (err.response.status === 401) {
            this.$store.commit("logout");
            this.$router.push("/login");
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
.auction_form {
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
