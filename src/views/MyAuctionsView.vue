<template>
  <div v-if="this.$store.state.user">
    <MyAuctionsComponent />
  </div>
  <div v-else>
    <h2>401 UNAUTHORIZED</h2>
  </div>
</template>

<script>
import MyAuctionsComponent from "../components/MyAuctionsComponent";
export default {
  name: "MyAuctionsView",
  components: { MyAuctionsComponent },
};
</script>

<style scoped></style>
