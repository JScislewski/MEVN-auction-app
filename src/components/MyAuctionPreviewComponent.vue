<template>
  <div class="auction_box">
    <div class="spoiler_bar">
      <h3 class="auction_title" v-on:click="getAuction()">
        {{ auction.name }}
        <span class="status sale" v-if="auction.isActive">available</span>
        <span class="status sold" v-else>sold</span>
      </h3>
      <template
        v-if="
          this.$props.auction.sellerName === this.$store.state.user.username &&
          isEditable()
        "
      >
        <p>
          <button v-on:click="editAuction" class="button_sm">edit</button>
          <button v-on:click="deleteAuction" class="button_sm">delete</button>
        </p>
      </template>
      <template v-else>
        <template
          v-if="this.auction.buyerName != this.$store.state.user.username"
        >
          <p>You can no longer edit this auction.</p>
        </template>
      </template>
    </div>

    <h5 class="auction_seller">Seller: {{ auction.sellerName }}</h5>
    <template v-if="this.auction.buyerName != null">
      <h5>Buyer: {{ auction.buyerName }}</h5>
    </template>
    <template v-else>
      <h5>Buyer: NONE</h5>
    </template>
    <div class="spoiler_bar">
      <h2 v-if="auction.buyoutPrice">{{ auction.buyoutPrice }} zł</h2>
      <h2 v-if="auction.highestBid">{{ auction.highestBid }} zł</h2>
      <button v-on:click="getAuction">View</button>
    </div>
  </div>
</template>

<script>
import AuctionsService from "../service/AuctionsService";

export default {
  name: "MyAuctionPreviewComponent",
  props: ["auction"],
  methods: {
    isEditable() {
      if (this.$props.auction.isActive) {
        if (this.$props.auction.highestBid > this.$props.auction.startingBid) {
          return 0;
        }
        return 1;
      }
      return 0;
    },
    editAuction() {
      this.$router.push("/edit-auction/" + this.$props.auction._id);
    },
    getAuction() {
      this.$router.push("/auction/" + this.$props.auction._id);
    },
    deleteAuction() {
      AuctionsService.deleteAuction(this.$props.auction._id)
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$store.commit("logout");
            this.$router.push("/login");
          }
        });
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
      width: 10em;
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
