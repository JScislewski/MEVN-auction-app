<template>
  <div v-if="this.$store.state.user" class="auction_editor">
    <EditAuctionComponent />
  </div>
  <div v-else>
    <h2>401 UNAUTHORIZED</h2>
  </div>
</template>

<script>
import EditAuctionComponent from "../components/EditAuctionComponent";
export default {
  name: "EditAuctionView",
  components: { EditAuctionComponent },
};
</script>
