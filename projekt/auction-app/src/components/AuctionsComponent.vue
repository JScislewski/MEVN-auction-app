<template>
  <div>
    <h1>AUCTIONS</h1>
    <div
      class="auctions_container"
      v-for="(auction, idx) in this.auctions"
      :key="idx"
    >
      <AuctionPreview :auction="auction" />
    </div>
    <button v-if="this.amount <= auctions.length" v-on:click="loadMore()">
      show more!
    </button>
  </div>
</template>

<script>
import AuctionsService from "../service/AuctionsService";
import AuctionPreview from "../components/AuctionPreview.vue";
export default {
  name: "AuctionsComponent",
  components: { AuctionPreview },
  data() {
    return {
      amount: 3,
      auctions: [],
    };
  },
  methods: {
    loadMore() {
      this.amount += 3;
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
