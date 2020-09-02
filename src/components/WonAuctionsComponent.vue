<template>
  <div id="auctions_container">
    <h3>WON AUCTIONS</h3>
    <div
      class="auctions_container"
      v-for="(auction, idx) in this.auctions"
      :key="idx"
      :auction="auction"
    >
      <my-auction-preview-component :auction="auction" />
    </div>

    <h5 v-if="auctions.length === 0">No auctions found.</h5>
  </div>
</template>

<script>
import AuctionsService from "../service/AuctionsService";
import MyAuctionPreviewComponent from "./MyAuctionPreviewComponent";

export default {
  name: "WonAuctionsComponent",
  components: { MyAuctionPreviewComponent },
  data() {
    return {
      auctions: [],
    };
  },
  created() {
    AuctionsService.getWonAuctions()
      .then((res) => {
        this.auctions = res;
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.$store.commit("logout");
          this.$router.push("/login");
        }
      });
  },
};
</script>

<style scoped lang="scss">
.auctions_container {
  max-width: 400px;
  margin: 0 auto;
}
</style>
