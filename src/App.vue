<template>
  <div id="app">
    <!-- <h1>Hello, Chrome Extension!</h1>
    <button @click="showAlert">Click Me</button>
    <weather /> -->
    <!-- <home-view></home-view> -->
    <router-view></router-view>
  </div>
</template>

<script>
import HomeView from "./views/HomeView.vue";
// import Weather from './components/Weather.vue';
export default {
  components: { HomeView },
};
</script>

<style>
/* #app {
  text-align: center;
  padding: 20px;
  width: 300px;
} */
</style>
