<template>
  <div class="box" v-on:click="getAuction">
    <p>
      Title:
      {{ auction.name}}
      <span class="auctionStatus sold" v-if="!auction.isActive">sold</span>
    </p>
    <p>CREATOR: {{ auction.sellerName }}</p>
    <p>
      <template v-if="auction.buyoutPrice">
        <span>Type: Buyout</span>
        <span>{{ auction.buyoutPrice }} zł</span>
      </template>
      <template v-else>
        <p>Type: Highest bid</p>
        <p>{{ auction.highestBid }}zł</p>
      </template>
    </p>
  </div>
</template>

<script>
export default {
  name: "AuctionSpoiler",
  props: ["auction"],
  methods: {
    getAuction() {
      this.$router.push("/auction/" + this.$props.auction._id);
    },
  },
};
</script>

<style scoped lang="scss">
.box {
  cursor: pointer;
  margin: 10px;
  border-radius: 25px;
  background-color: whitesmoke;
  padding: 5px 20px;
  text-align: left;
  .auction_title {
    cursor: pointer;
    color: black;
    margin-bottom: 0;
  }
  .auctionStatus {
    color: #c03546;
    font-size: 20px;
    font-weight: normal;
  }
}
</style>
