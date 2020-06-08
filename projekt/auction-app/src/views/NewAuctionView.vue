<template>
  <div class="auction_form">
    <div class="errors_container">
      <p class="error" v-for="(error, idx) in this.errors" :key="idx">
        {{ error }}
      </p>
    </div>

    <p><label for="title">Title:</label></p>
    <p><input type="text" v-model="title" id="title" /></p>

    <p>
      <label for="description">Description:</label>
    </p>
    <p><textarea v-model="description" id="description" /></p>
    <p>
      <label>Auction type:</label>
    </p>
    <p>
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
    </p>
    <label v-if="auctionType" class="price_label">
      <p v-if="auctionType === 'Buyout'">Buyout price:</p>
      <p v-if="auctionType === 'Bid'">Starting bid:</p>
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
    <p>
      <label v-if="auctionType === 'Bid'" for="ends_date">Auction ends: </label>
      <input
        id="ends_date"
        type="date"
        v-if="auctionType === 'Bid'"
        v-model="ends"
      />
    </p>
    <button v-on:click="createAuction">CREATE</button>
  </div>
</template>

<script>
import AuctionsService from "../service/AuctionsService";
export default {
  name: "NewAuction",
  data() {
    return {
      title: null,
      description: null,
      auctionType: null,
      buyoutPrice: null,
      startingBid: null,
      ends: null,
      errors: [],
    };
  },
  methods: {
    async createAuction() {
      this.errors = [];
      let auction = {
        title: this.title,
        description: this.description,
        ends: this.ends,
        buyoutPrice: null,
        startingBid: null,
      };
      if (this.auctionType === "Buyout") {
        auction.buyoutPrice = Math.round(this.buyoutPrice * 100) / 100;
      } else {
        auction.startingBid = Math.round(this.startingBid * 100) / 100;
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

<style lang="scss"></style>
