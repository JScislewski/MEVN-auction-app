<template>
  <div class="auction_box">
    <h3 class="auction_title" v-on:click="getAuction">
      {{ auction.name }}
      <span class="status sale" v-if="auction.isActive">available</span>
      <span class="status sold" v-else>sold</span>
    </h3>
    <h5 class="auction_seller">Seller: {{ auction.sellerName }}</h5>
    <div class="spoiler_bar">
      <template v-if="auction.buyoutPrice">
        <h2>{{ auction.buyoutPrice }} zł</h2>
        <button v-on:click="getAuction">Buy now</button>
      </template>
      <template v-else>
        <h2>{{ auction.highestBid }}zł</h2>
        <button v-on:click="getAuction">Bid</button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuctionPreviewComponent",
  props: ["auction"],
  methods: {
    getAuction() {
      this.$router.push("/auction/" + this.$props.auction._id);
    },
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
  text-align: left;
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

    button {
      margin-top: 10px;
      height: 40px;
      width: 80px;
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
