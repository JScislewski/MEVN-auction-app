import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("../views/HomeView"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/auction/:id",
    name: "Auction View",
    component: () => import("../views/AuctionView.vue"),
  },
  {
    path: "/newAuction",
    name: "New Auction",
    component: () => import("../views/NewAuctionView.vue"),
  },
  {
    path: "/edit-auction/:id",
    name: "Edit Auction",
    component: () => import("../views/EditAuctionView"),
  },
  {
    path: "/my-auctions",
    name: "my-auctions",
    component: () => import("../views/MyAuctionsView.vue"),
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("../views/ChatView.vue"),
  },
  {
    path: "/chat/:recipient",
    name: "chat",
    component: () => import("../views/ChatView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
