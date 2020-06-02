import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("../views/HomePage"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/auction/:id",
    name: "Auction View",
    component: () => import("../views/Auction.vue"),
  },
  {
    path: "/newAuction",
    name: "New Auction",
    component: () => import("../views/NewAuction.vue"),
  },
  {
    path: "/my-auctions",
    name: "my-auctions",
    component: () => import("../views/MyAuctions.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
