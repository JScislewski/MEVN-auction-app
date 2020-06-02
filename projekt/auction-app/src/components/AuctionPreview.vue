<template>
  <div class="box" v-on:click="getAuction">
    <p>
      Status:
      <span v-if="auction.isActive">ACTIVE</span>
      <span v-if="!auction.isActive">ENDED</span>
    </p>
    <p>
      Title:
      {{ auction.name }}
    </p>
    <p>CREATOR: {{ auction.sellerName }}</p>
    <p>
      <template v-if="auction.buyoutPrice">
        <p>Type: Buyout</p>
        <p>{{ auction.buyoutPrice }} zł</p>
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
