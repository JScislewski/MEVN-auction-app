<template>
  <div v-if="this.auction" class="auction_form">
    <label for="title">Title:</label>
    <input type="text" v-model="auction.name" id="title" />
    <label for="description">Description:</label>
    <textarea v-model="auction.description" id="description" />

    <input
      step="0.01"
      v-model="auction.buyoutPrice"
      v-if="!auction.endsDate"
      type="number"
    />
    <label v-if="auction.endsDate" for="ends_date">Auction ends: </label>
    <div class="date">
      <input
        id="ends_date"
        :min="getFormatedDate()"
        type="date"
        v-if="auction.endsDate"
        v-model="auction.endsDate"
        v-bind:class="{ err: errors.date }"
      />
    </div>
    <button v-on:click="editAuction">SAVE CHANGES</button>
    <div class="errors_container">
      <p class="error" v-for="(error, idx) in this.errors" :key="idx">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
import AuctionsService from "../service/AuctionsService";

export default {
  name: "EditAuctionComponent",
  data() {
    return {
      auction: null,
      errors: [],
    };
  },
  methods: {
    async editAuction() {
      if (this.errors.length === 0) {
        console.log("EDIT AUCTION ODPALONE");
        console.log(this.auction);
        AuctionsService.editAuction(this.auction)
          .then(() => {
            this.$router.push("/my-auctions");
          })
          .catch((err) => {
            if (err.response.status === 409) {
              this.errors.push(err.response.data.message);
            }
            if (err.response.status === 401) {
              this.$store.commit("logout");
              this.$router.push("/login");
            }
          });
      }
    },
    getFormatedDate() {
      const today = new Date();
      return `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(
        -2
      )}-${("0" + today.getDate()).slice(-2)}`;
    },
  },
  created() {
    AuctionsService.getAuction(this.$route.params.id)
      .then((res) => {
        this.auction = res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped lang="scss">
.auction_form {
  color: black;
  text-align: left;
  margin: 20px auto 0 auto;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  font-size: 16px;

  button,
  input,
  textarea {
    color: black;
    padding: 10px;
    border-radius: 10px;
    margin: 20px;
  }

  button {
    cursor: pointer;
    background-color: #48a9a6;
    color: white;
    font-weight: bold;
    text-decoration: none;
    border: none;
  }

  label {
    margin-top: 10px;
    margin-left: 30px;
    font-weight: bold;
  }

  input {
    text-align: left;
    border: 2px solid black;
  }

  input:focus {
    background-color: #c9b0d4;
  }

  .error {
    padding: 10px;
    border-radius: 25px;
    margin: 10px 20px;
    color: white;
    background-color: #c03546;
    font-size: 13px;
  }
}
</style>
