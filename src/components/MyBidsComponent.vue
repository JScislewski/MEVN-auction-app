<template>
  <div>
    <h1>MY BIDS</h1>
    <div
      class="auctions_container"
      v-for="(auction, idx) in this.auctions"
      :key="idx"
    >
      <MyBidsPreview :auction="auction" :socket="socket" />
    </div>
  </div>
</template>

<script>
import AuctionsService from "../service/AuctionsService";
import MyBidsPreview from "./MyBidsPreview";
import io from "socket.io-client";

export default {
  name: "CurrentAuctionsComponent",
  components: { MyBidsPreview },
  data() {
    return {
      socket: null,
      auctions: [],
    };
  },
  methods: {},
  created() {
    AuctionsService.getMyBids()
      .then((res) => {
        this.auctions = res;
        this.socket = io(`https://${window.location.host}`);
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
  background-color: #f5f5f5;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 10px;

  input {
    width: 100px;
    position: relative;
    top: -75px;
    left: 10px;
    border-radius: 10px;
    border: 0;
    background-color: #dcdee0;
    padding: 12px;
  }
}
</style>
