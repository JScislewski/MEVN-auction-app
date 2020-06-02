<template>
  <div>
    <h1>AUCTIONS</h1>
    <div
      class="auctions_container"
      v-for="(auction, idx) in this.auctions"
      :key="idx"
    >
      <AuctionSpoiler :auction="auction" />
    </div>
    <button v-if="this.amount <= auctions.length" v-on:click="loadMore()">
      show more!
    </button>
    <h5 v-if="auctions.length === 0">No auctions found. :(</h5>
  </div>
</template>

<script>
import AuctionsService from "../service/AuctionsService";
import AuctionSpoiler from "../components/unauthorized/AuctionSpoiler";
export default {
  name: "AuctionsComponent",
  components: { AuctionSpoiler },
  data() {
    return {
      amount: 5,
      auctions: [],
    };
  },
  methods: {
    loadMore() {
      this.amount += 5;
      AuctionsService.getAuctions(this.amount)
        .then((res) => {
          this.auctions = res;
        })
        .catch();
    },
  },
  created() {
    AuctionsService.getAuctions(this.amount)
      .then((res) => {
        this.auctions = res;
      })
      .catch();
  },
};
</script>

<style scoped>
.auctions_container {
  max-width: 400px;
  margin: 0 auto;
}
button {
  cursor: pointer;
  padding: 10px;
  background-color: #c03546;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  text-decoration: none;
  border: none;
}
</style>
