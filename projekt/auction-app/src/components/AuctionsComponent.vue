<template>
  <div>
    <h1>AUCTIONS</h1>
    <div
      class="auctions_container"
      v-for="(auction, idx) in this.auctions"
      :key="idx"
    >
      <AuctionPreviewComponent :auction="auction" />
    </div>
    <button v-if="this.amount <= auctions.length" v-on:click="loadMore()">
      show more!
    </button>
  </div>
</template>

<script>
import AuctionsService from "../service/AuctionsService";
import AuctionPreviewComponent from "./AuctionPreviewComponent";

export default {
  name: "AuctionsComponent",
  components: { AuctionPreviewComponent },
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

<style scoped lang="scss">
.auctions_container {
  max-width: 500px;
  margin: 0 auto;
}
</style>
