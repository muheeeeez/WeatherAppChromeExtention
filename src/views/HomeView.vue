<template>
  <section v-if="!isOnline" class="bg-red-100 text-red-800 p-3 rounded shadow-md mb-4 flex items-center justify-center space-x-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
    </svg>
    <span>You are offline! Please check your connection.</span>
  </section>
  <section class="bg-gradient-to-r from-purple-700 to-pink-500 min-h-screen flex flex-col justify-between pb-6">
    <div class="relative h-64 overflow-hidden rounded-b-3xl shadow-lg">
      <img src="../assets/images/home-page.jpg" alt="home page image" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-white text-5xl font-bold text-center mb-1 drop-shadow-lg">Weather</h1>
          <h1 class="text-yellow-300 text-5xl font-bold text-center drop-shadow-lg">ForeCasts</h1>
        </div>
      </div>
    </div>
    
    <div class="flex-1 flex flex-col items-center justify-center px-6 my-8">
      <p class="text-white text-lg text-center mb-6">Get accurate weather forecasts for any location instantly.</p>
      <button
        class="bg-yellow-300 text-xl text-purple-700 rounded-full font-semibold px-8 py-3 shadow-lg transition-all duration-300 hover:bg-white hover:text-purple-600 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
      >
        <router-link to="/weather" class="flex items-center">
          Get Started
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </router-link>
      </button>
    </div>
    
    <div class="mt-auto text-center text-white text-xs opacity-80">
      <p>Weather data powered by OpenWeatherMap</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isOnline: navigator.onLine,
    };
  },
  methods: {
    updateOnlineStatus() {
      this.isOnline = navigator.onLine;
    },
  },
  mounted() {
    if (localStorage.getItem("hasVisitedIndex")) {
      this.$router.push("/weather");
    } else {
      localStorage.setItem("hasVisitedIndex", "true");
      this.updateOnlineStatus();
      window.addEventListener("offline", this.updateOnlineStatus);
      window.addEventListener("online", this.updateOnlineStatus);
    }
  },
  beforeDestroy() {
    window.removeEventListener("offline", this.updateOnlineStatus);
    window.removeEventListener("online", this.updateOnlineStatus);
  },
};
</script>

<style lang="scss" scoped></style>
