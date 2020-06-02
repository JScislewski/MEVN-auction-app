<template>
  <div>
    <h1>MY AUCTIONS</h1>
    <div
      class="auctions_container"
      v-for="(auction, idx) in this.auctions"
      :key="idx"
    >
      <MyAuctionSpoiler :auction="auction" />
    </div>
  </div>
</template>

<script>
import AuctionsService from "../service/AuctionsService";
import MyAuctionSpoiler from "../components/AuctionPreview";
export default {
  name: "MyAuctions",
  components: { MyAuctionSpoiler },
  data() {
    return {
      auctions: [],
    };
  },
  created() {
    AuctionsService.getMyAuctions()
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

<style scoped>
.auctions_container {
  max-width: 400px;
  margin: 0 auto;
}
</style>
