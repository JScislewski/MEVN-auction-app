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
    <button v-if="this.page > 1" v-on:click="previousPage()">
      Previous page
    </button>
    <button v-if="this.auctions.length == 3" v-on:click="nextPage()">
      Next page
    </button>
    <h2>Page:{{ this.page }}</h2>
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
      page: 1,
      auctions: [],
    };
  },
  methods: {
    previousPage() {
      this.page -= 1;
      AuctionsService.getAuctions(this.page)
        .then((res) => {
          this.auctions = res;
        })
        .catch();
    },
    nextPage() {
      this.page += 1;
      AuctionsService.getAuctions(this.page)
        .then((res) => {
          this.auctions = res;
        })
        .catch();
    },
  },
  created() {
    AuctionsService.getAuctions(1)
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
