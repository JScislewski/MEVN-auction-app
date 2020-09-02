<template>
  <div class="auction_box" v-if="auction">
    <h3 class="auction_title" v-on:click="getAuction">
      {{ auction.name }}
      <span class="status sale" v-if="auction.isActive">available</span>
      <span class="status sold" v-else>sold</span>
    </h3>
    <h5 class="auction_seller">seller: {{ auction.sellerName }}</h5>
    <div class="spoiler_bar">
      <h2>{{ auction.highestBid }}zł</h2>
      <input v-model="bidPrice" type="number" step="0.01" />
      <button v-on:click="bid()">Bid</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyBidsPreview",
  props: ["auction"],
  data() {
    return {
      bidPrice: null,
    };
  },
  methods: {
    getAuction() {
      this.$router.push("/auction/" + this.$props.auction._id);
    },
    bid() {
      if (this.$store.state.user === null) {
        this.$store.commit("logout");
        this.$router.push("/login");
      } else {
        if (this.bidPrice > this.$props.auction.highestBid) {
          this.$store.state.socket.emit("newBid", {
            auctionId: this.$props.auction._id,
            bidder: this.$store.state.user.username,
            bidPrice: this.bidPrice,
          });
          this.bidPrice = null;
        }
      }
    },
  },
  created() {
    this.$store.state.socket.emit("watchLiveBid", {
      auctionId: this.$props.auction._id,
    });
    this.$store.state.socket.on("bid", (data) => {
      if (this.$props.auction._id === data._id) {
        this.$props.auction.highestBid = data.highestBid;
      }
    });
    this.$store.state.socket.on("sold", () => {
      this.$props.auction.isActive = false;
    });
  },
};
</script>

<style scoped lang="scss">
.auction_box {
  margin-top: 50px;
  margin-left: 5px;
  margin-right: 5px;
  border: 2px solid black;
  border-radius: 10px;
  background-color: white;
  padding: 5px 20px;
  .auction_title {
    cursor: pointer;
    margin-bottom: 0;
  }
  .auction_seller {
    margin-top: 5px;
  }
  .status {
    padding: 5px;
    color: white;
    border-radius: 10px;
    border: none;
    font-size: 12px;
    font-weight: normal;
  }
  .sale {
    background-color: green;
  }
  .sold {
    background-color: red;
  }
  .spoiler_bar {
    grid-template-columns: 250px 100px;
    grid-template-rows: 40px;
    margin-bottom: 10px;
    input {
      border-radius: 10px;
      border: 2px solid black;
      background-color: white;
      padding: 5px;
      margin: 5px;
    }
    button {
      padding: 5px;
      margin: 5px;
      cursor: pointer;
      background-color: green;
      border-radius: 10px;
      color: white;
      font-weight: bold;
      text-decoration: none;
      border: none;
    }
    h2 {
      line-height: 40px;
      vertical-align: middle;
      margin: 0;
    }
  }
}
</style>
