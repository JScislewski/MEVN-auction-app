<template>
  <div>
    <h1>MY AUCTIONS</h1>
    <div
      class="auctions_container"
      v-for="(auction, idx) in this.auctions"
      :key="idx"
    >
      <MyAuctionPreviewComponent :auction="auction" />
    </div>
  </div>
</template>

<script>
import AuctionsService from "../service/AuctionsService";
import MyAuctionPreviewComponent from "./MyAuctionPreviewComponent";

export default {
  name: "MyAuctionsComponent",
  components: { MyAuctionPreviewComponent },
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
<style scoped lang="scss">
.auctions_container {
  max-width: 400px;
  margin: 0 auto;
}
button {
  cursor: pointer;
  padding: 10px;
  background-color: green;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  text-decoration: none;
  border: none;
}
</style>
