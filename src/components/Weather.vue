<template>
  <div class="bg-gradient-to-r from-purple-700 to-pink-500 p-6 rounded-2xl shadow-lg">
    <h1 class="text-xl font-bold text-center text-white mb-4">Weather Information</h1>
    
    <div v-if="latitude && longitude" class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-white/80 text-xs">Latitude</p>
          <p class="text-lg font-medium">{{ latitude.toFixed(4) }}</p>
        </div>
        <div class="h-8 w-px bg-white/20"></div>
        <div>
          <p class="text-white/80 text-xs">Longitude</p>
          <p class="text-lg font-medium">{{ longitude.toFixed(4) }}</p>
        </div>
      </div>
      
      <div class="mt-4 text-center text-sm">
        <p>Use these coordinates to get accurate weather data</p>
      </div>
    </div>
    
    <div v-else class="animate-pulse flex justify-center items-center h-24 bg-white/10 backdrop-blur-sm rounded-xl">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <p class="ml-2 text-white">Accessing location...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      latitude: null,
      longitude: null,
    };
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.getWeather();
          },
          (error) => {
            console.error("Error getting location:", error.message);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    getWeather() {
      console.log(`Fetching weather for ${this.latitude}, ${this.longitude}`);
    }
  },
};
</script>

<!-- <style scoped>
h1 {
  color: #42b983;
}
</style> -->
  