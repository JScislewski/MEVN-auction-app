<template>
  <div v-if="this.$store.state.user">
    <MyBidsComponent />
  </div>
  <div v-else>
    <h2>401 UNAUTHORIZED</h2>
  </div>
</template>

<script>
import MyBidsComponent from "../components/MyBidsComponent";
export default {
  name: "MyBidsView",
  components: { MyBidsComponent },
};
</script>
