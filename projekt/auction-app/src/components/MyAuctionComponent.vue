<template>
  <div class="auction_box">
    <div class="spoiler_bar">
      <h3 class="auction_title" v-on:click="getAuction()">
        {{ auction.title }}
        <span class="status sale" v-if="auction.isActive">ACTIVE</span>
        <span class="status sold" v-else>ENDED</span>
      </h3>
      <template
        v-if="
          this.$props.auction.seller === this.$store.state.user.username &&
            isEditable()
        "
      >
        <button v-on:click="editAuction" class="button_sm">edit</button>
        <button v-on:click="deleteAuction" class="button_sm">delete</button>
      </template>
      <template v-else>
        <button class="button_sm disabled">edit</button>
        <button class="button_sm disabled">delete</button>
      </template>
    </div>

    <h5 class="auction_seller">od {{ auction.seller }}</h5>
    <div class="spoiler_bar">
      <h2 v-if="auction.buyoutPrice">{{ auction.buyoutPrice }} zł</h2>
      <h2 v-if="auction.highestBid">{{ auction.highestBid }} zł</h2>
      <button v-on:click="getAuction">View</button>
    </div>
  </div>
</template>

<script>
import AuctionsService from "../../service/AuctionsService";

export default {
  name: "AuctionSpoiler",
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
      this.$router.push("/auction_edit/" + this.$props.auction._id);
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
