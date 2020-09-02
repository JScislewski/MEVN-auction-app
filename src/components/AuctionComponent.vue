<template>
  <div class="auction_container" v-if="this.auction !== null">
    <p class="live_bid" v-if="isActiveBid()">ACTIVE</p>
    <p>Title: {{ this.auction.name }}</p>
    <p>
      Seller: {{ this.auction.sellerName }}
      <button v-if="!isSeller()" v-on:click="openChat" class="chatButton">
        chat
      </button>
    </p>
    <div class="auction_body">
      <p>Description: {{ this.auction.description }}</p>
      <template v-if="this.auction.isActive">
        <template v-if="auction.buyoutPrice">
          <h2>{{ auction.buyoutPrice }} zł</h2>
          <button v-on:click="buyout">BUY</button>
        </template>
        <template v-else>
          <h5 class="auction_ends">Ends: {{ getEndsTime() }}</h5>
          <h3>Highest bidder: {{ auction.highestBidder }}</h3>
          <h2>{{ auction.highestBid }} zł</h2>
          <input v-model="bidPrice" type="number" step="1" />
          <button v-on:click="bid">Bid</button>
        </template>
      </template>
      <template v-else>
        <template v-if="this.auction.buyerName != null">
          <h5>Buyer: {{ auction.buyerName }}</h5>
        </template>
        <template v-else>
          <h5>Buyer: NONE</h5>
        </template>
        <h1>AUCTION ENDED</h1>
      </template>
    </div>
  </div>
  <div v-else></div>
</template>

<script>
import AuctionsService from "../service/AuctionsService";
import moment from "moment";
export default {
  name: "Auction",
  data() {
    return {
      bidPrice: null,
      auction: null,
    };
  },
  methods: {
    getEndsTime() {
      return moment(this.auction.endsDate).format("MMMM Do YYYY, h:mm:ss a");
    },
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
        return this.$store.state.user.username === this.auction.sellerName;
      }
      return false;
    },
    openChat() {
      this.$router.push("/chat/" + this.auction.sellerName);
    },
    buyout() {
      if (this.$store.state.user === null) {
        this.$store.commit("logout");
        this.$router.push("/login");
      } else {
        console.log("buyout");
        AuctionsService.buyout(this.$route.params.id)
          .then((res) => {
            if (res.status === 200) {
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
        console.log("LogOut");
      } else {
        if (this.bidPrice > this.auction.highestBid) {
          this.$store.state.socket.emit("newBid", {
            auctionId: this.auction._id,
            bidder: this.$store.state.user.username,
            bidPrice: this.bidPrice,
          });
          this.bidPrice = null;
        }
      }
    },
  },
  checkForAuctionEnd() {
    console.log("checkForAuctionEnd");
    this.$store.state.socket.emit("checkForAuctionEnd", this.auction._id);
  },
  created() {
    AuctionsService.getAuction(this.$route.params.id)
      .then((res) => {
        this.auction = res;
        if (this.$store.state.user && this.auction.highestBid) {
          this.$store.state.socket.emit("joinLiveBid", {
            auctionId: this.auction._id,
          });
          this.$store.state.socket.on("bid", (data) => {
            this.auction.highestBid = data.highestBid;
            this.auction.highestBidder = data.highestBidder;
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped lang="scss"></style>
