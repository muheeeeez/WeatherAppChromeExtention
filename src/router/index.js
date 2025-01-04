import { createRouter, createWebHashHistory } from "vue-router";
import HomeViewVue from "../views/HomeView.vue";
import WeatherViewVue from "../views/WeatherView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: HomeViewVue },
    { path: "/weather", component: WeatherViewVue },
  ],
});

export default router;
