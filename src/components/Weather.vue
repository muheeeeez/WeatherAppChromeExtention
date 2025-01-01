<template>
    <div class="font-roboto p-4">
      <h1 class="text-xl font-bold text-center text-lime-700">Weather App</h1>
      <p v-if="latitude && longitude" class="mt-4 text-center">
        Latitude: {{ latitude }} <br>
        Longitude: {{ longitude }}
      </p>
      <p v-else class="text-center text-gray-500">
        Getting location...
      </p>
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
              // You can now fetch weather data using these coordinates.
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
        // You can now use the latitude and longitude to get the weather data
        // For example, you can call a weather API like OpenWeatherMap.
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
  