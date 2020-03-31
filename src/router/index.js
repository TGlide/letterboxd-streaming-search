import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: "/movie-list",
    name: "MovieList",
    component: () =>
      import(/* webpackChunkName: "movielist" */ "../views/MovieList.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
