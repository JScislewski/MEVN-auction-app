<template>
  <div class="auction_container" v-if="this.auction !== null">
    <p class="live_bid" v-if="isActiveBid()">ACTIVE</p>
    <p>Title: {{ this.auction.name }}</p>
    <p>Creator:{{ this.auction.sellerName }}</p>
    <div class="auction_body">
      <p>Description: {{ this.auction.description }}</p>
      <template v-if="this.auction.isActive">
        <template v-if="auction.buyoutPrice">
          <h2>{{ auction.buyoutPrice }} zł</h2>
          <button v-on:click="buyout">BUY</button>
        </template>
        <template v-else>
          <h2>{{ auction.highestBid }} zł</h2>
          <input v-model="bidPrice" type="number" step="0.01" />
          <button v-on:click="bid">Bid</button>
        </template>
      </template>
      <template v-else>
        <h1>AUCTION ENDED</h1>
      </template>
    </div>
  </div>
  <div v-else>
    <h1>404 AUCTION NOT FOUND</h1>
  </div>
</template>

<script>
import AuctionsService from "../service/AuctionsService";
import io from "socket.io-client";
export default {
  name: "Auction",
  data() {
    return {
      bidPrice: null,
      auction: null,
      socket: null,
    };
  },
  methods: {
    isActiveBid() {
      if (
        this.auction.isActive &&
        this.auction.highestBid &&
        this.$store.state.user
      ) {
        return 1;
      }
      return 0;
    },
    isSeller() {
      if (this.$store.state.user !== null) {
        return this.$store.state.user.username === this.auction.seller;
      }
      return false;
    },
    message() {
      this.$router.push("/messages/" + this.auction.seller);
    },
    buyout() {
      if (this.$store.state.user === null) {
        this.$store.commit("logout");
        this.$router.push("/login");
      } else {
        console.log("buyout");
        AuctionsService.buyAuction(this.$route.params.id)
          .then((res) => {
            if (res.status === 200) {
              console.log("BOUGHT");
              this.$router.push("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    bid() {
      if (this.$store.state.user === null) {
        this.$store.commit("logout");
        this.$router.push("/login");
      } else {
        if (this.bidPrice > this.auction.highestBid) {
          this.socket.emit("newBid", {
            auctionId: this.auction._id,
            bidder: this.$store.state.user.username,
            bidPrice: this.bidPrice,
          });
          this.bidPrice = null;
        }
      }
    },
  },
  created() {
    AuctionsService.getAuction(this.$route.params.id)
      .then((res) => {
        this.auction = res;
        if (this.$store.state.user && this.auction.highestBid) {
          this.socket = io("http://localhost:5000");
          this.socket.emit("joinLiveBid", {
            auctionId: this.auction._id,
          });
          this.socket.on("bid", (data) => {
            this.auction.highestBid = data.highestBid;
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  destroyed() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>

<style scoped lang="scss"></style>
