<template>
  <div id="app" class="font-sans antialiased text-gray-900 min-h-screen">
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

#app {
  width: 100%;
  height: 100%;
  min-width: 300px;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
