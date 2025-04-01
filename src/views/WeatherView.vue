<template>
  <!-- Offline notification banner -->
  <section v-if="!isOnline" class="fixed top-0 left-0 right-0 z-50 bg-red-100 text-red-800 p-3 flex items-center justify-center space-x-2">
    <!-- Warning icon -->
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
    </svg>
    <span class="text-base">You are offline! Please check your connection.</span>
  </section>
  
  <!-- Main container with dynamic weather background -->
  <div class="relative">
    <!-- Dynamic background that changes based on weather conditions -->
    <div :class="weatherBackground" class="min-h-screen pb-6 transition-all duration-1000">
      <!-- Header section with logo and search bar -->
      <div class="px-4 pt-6 pb-2">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <!-- Logo container -->
          <div class="logo text-white w-28">
            <img src="../assets/images/logo.png" alt="Weather Forecast Logo" class="w-full" />
          </div>
          <!-- Search bar container -->
          <div class="search-wrapper w-full sm:w-72">
            <!-- Search input with glassmorphism effect -->
            <div class="flex rounded-full border-2 border-white overflow-hidden bg-white/10 backdrop-blur-sm">
              <!-- City search input -->
              <input
                type="text"
                placeholder="Search city..."
                class="w-full outline-none bg-transparent text-white text-base px-4 py-2.5 placeholder-white/70"
                v-model="query"
                @keypress.enter="fetchWeather"
              />
              <!-- Search button -->
              <button
                type="button"
                class="flex items-center justify-center bg-white/20 hover:bg-white/30 px-6 transition-colors"
                @click="fetchWeather"
              >
                <!-- Search icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 192.904 192.904"
                  width="20px"
                  class="fill-white"
                >
                  <path
                    d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main weather display card -->
      <div class="mt-4 px-4">
        <!-- Weather card with glassmorphism effect -->
        <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
          <!-- Temperature and weather icon section -->
          <div class="flex justify-center items-center text-white">
            <!-- Temperature and location info -->
            <div class="text-center">
              <!-- Current temperature -->
              <h1 class="text-8xl font-light">
                {{ weather.main ? Math.round(weather.main.temp) : "--" }}°
              </h1>
              <!-- Location name -->
              <div class="text-4xl mt-2 font-medium">{{ weather.name || 'Location' }}</div>
              <!-- Current date -->
              <div class="text-base mt-2 opacity-90">{{ dateBuilder() }}</div>
              <!-- Local time -->
              <div class="text-base opacity-80">Local Time: {{ convertToLocalTime(weather.timezone) }}</div>
            </div>
            <!-- Weather condition icon -->
            <div class="ml-4">
              <img
                :src="`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@4x.png`"
                alt="Weather Icon"
                class="w-40"
              />
            </div>
          </div>

          <!-- Weather description section -->
          <div class="mt-6 text-center text-white">
            <!-- Weather condition description -->
            <span class="px-6 py-2 rounded-full bg-white/20 text-base font-medium uppercase">
              {{
                weather.weather &&
                weather.weather[0] &&
                weather.weather[0].description
                  ? weather.weather[0].description
                  : "Weather condition"
              }}
            </span>
            <!-- Feels like temperature -->
            <div class="text-base mt-3">
              Feels like {{ weather.main ? Math.round(weather.main.feels_like) : "--" }}°
            </div>
          </div>

          <!-- Weather details grid -->
          <div class="grid grid-cols-2 gap-4 mt-8">
            <!-- Maximum temperature card -->
            <div class="bg-white/10 rounded-xl p-4 flex items-center">
              <img src="../assets/images/temp-max.png" alt="temp-max" class="w-10 h-10 mr-3" />
              <div>
                <div class="text-white/80 text-sm">Maximum</div>
                <div class="text-white text-xl">{{ weather.main ? Math.round(weather.main.temp_max) : "--" }}°</div>
              </div>
            </div>
            
            <!-- Minimum temperature card -->
            <div class="bg-white/10 rounded-xl p-4 flex items-center">
              <img src="../assets/images/temp-min.png" alt="temp-min" class="w-10 h-10 mr-3" />
              <div>
                <div class="text-white/80 text-sm">Minimum</div>
                <div class="text-white text-xl">{{ weather.main ? Math.round(weather.main.temp_min) : "--" }}°</div>
              </div>
            </div>
            
            <!-- Humidity card -->
            <div class="bg-white/10 rounded-xl p-4 flex items-center">
              <img src="../assets/images/humadity.png" alt="humidity" class="w-10 h-10 mr-3" />
              <div>
                <div class="text-white/80 text-sm">Humidity</div>
                <div class="text-white text-xl">{{ weather.main ? Math.round(weather.main.humidity) : "--" }}%</div>
              </div>
            </div>
            
            <!-- Wind speed card -->
            <div class="bg-white/10 rounded-xl p-4 flex items-center">
              <img src="../assets/images/wind.png" alt="wind" class="w-10 h-10 mr-3" />
              <div>
                <div class="text-white/80 text-sm">Wind</div>
                <div class="text-white text-xl">{{ weather.wind ? Math.round(weather.wind.speed) : "--" }} km/h</div>
              </div>
            </div>
            
            <!-- Cloudiness card -->
            <div class="bg-white/10 rounded-xl p-4 flex items-center col-span-2">
              <img src="../assets/images/cloudy-icon.png" alt="cloudy" class="w-10 h-10 mr-3" />
              <div>
                <div class="text-white/80 text-sm">Cloudiness</div>
                <div class="text-white text-xl">{{ weather.clouds ? Math.round(weather.clouds.all) : "--" }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 5-Day Forecast section -->
      <div class="mt-8 px-4" v-if="forecast.list && forecast.list.length">
        <h2 class="text-2xl font-semibold text-white mb-4">5-Day Forecast</h2>
        <!-- Horizontally scrollable forecast cards -->
        <div class="overflow-x-auto pb-2">
          <div class="flex space-x-4" style="min-width: min-content">
            <!-- Individual forecast day card -->
            <div 
              v-for="(item, index) in dailyForecast" 
              :key="index"
              class="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg flex flex-col items-center min-w-[120px]"
            >
              <!-- Day name -->
              <p class="text-white text-sm mb-2">{{ formatForecastDay(item.dt) }}</p>
              <!-- Weather icon -->
              <img 
                :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`" 
                :alt="item.weather[0].description"
                class="w-16 h-16"
              />
              <!-- Weather description -->
              <p class="text-white text-sm mt-2 mb-3 text-center">{{ item.weather[0].description }}</p>
              <!-- Temperature range bar -->
              <div class="flex justify-between w-full">
                <span class="text-white text-sm">{{ Math.round(item.temp.min) }}°</span>
                <div class="w-full mx-2 h-1.5 bg-white/20 rounded-full self-center">
                  <div 
                    class="h-full bg-yellow-300 rounded-full" 
                    :style="{width: `${tempPercentage(item.temp.min, item.temp.max)}%`}"
                  ></div>
                </div>
                <span class="text-white text-sm">{{ Math.round(item.temp.max) }}°</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Hourly Timeline section -->
      <div class="mt-8 px-4" v-if="forecast.list && forecast.list.length">
        <h2 class="text-2xl font-semibold text-white mb-4">Hourly Timeline</h2>
        <!-- Horizontally scrollable timeline cards -->
        <div class="overflow-x-auto pb-2">
          <div class="flex space-x-4" style="min-width: min-content">
            <!-- Individual hour card -->
            <div 
              v-for="(item, index) in forecast.list.slice(0, 8)" 
              :key="index"
              class="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg flex flex-col items-center min-w-[100px]"
            >
              <!-- Hour -->
              <p class="text-white text-sm mb-2">{{ formatForecastTime(item.dt) }}</p>
              <!-- Weather icon -->
              <img 
                :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`" 
                :alt="item.weather[0].description"
                class="w-14 h-14"
              />
              <!-- Temperature -->
              <p class="text-white text-lg font-medium">{{ Math.round(item.main.temp) }}°</p>
              <!-- Precipitation probability -->
              <div class="flex items-center mt-2">
                <svg viewBox="0 0 24 24" class="h-4 w-4 fill-white/80" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.625 7.5H7.5v4.125c0 .621-.504 1.125-1.125 1.125S5.25 12.246 5.25 11.625v-5.25C5.25 5.754 5.754 5.25 6.375 5.25h5.25c.621 0 1.125.504 1.125 1.125S12.246 7.5 11.625 7.5z"/>
                  <path d="M12.97 3.03a1.125 1.125 0 010 1.59l-7.5 7.5a1.125 1.125 0 01-1.59-1.59l7.5-7.5a1.125 1.125 0 011.59 0zm8.25 8.25a1.125 1.125 0 010 1.59l-7.5 7.5a1.125 1.125 0 01-1.59-1.59l7.5-7.5a1.125 1.125 0 011.59 0z"/>
                  <path d="M17.625 19.5h-5.25c-.621 0-1.125-.504-1.125-1.125s.504-1.125 1.125-1.125h4.125V13.125c0-.621.504-1.125 1.125-1.125s1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125z"/>
                </svg>
                <span class="text-white/80 text-sm ml-1">
                  {{ Math.round(item.pop * 100) }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer with API attribution -->
      <div class="text-center text-white/70 text-sm mt-8">
        <p>Powered by OpenWeatherMap API</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Component data properties
  data() {
    return {
      api_key: "a99acda1a46562e6b50452999bf057a5", // OpenWeatherMap API key
      url_base: "https://api.openweathermap.org/data/2.5/", // Base URL for API calls
      query: "", // Search query for city
      weather: {}, // Current weather data
      forecast: {}, // Forecast weather data
      isOnline: navigator.onLine, // Online status of the application
    };
  },
  // Computed properties
  computed: {
    // Determines background gradient based on weather conditions
    weatherBackground() {
      if (!this.weather.weather || !this.weather.weather[0]) {
        return 'bg-gradient-to-r from-purple-700 to-pink-500'; // Default gradient
      }

      const weatherCode = this.weather.weather[0].id;
      const isNight = this.isNightTime;

      // Different gradients for different weather conditions
      if (weatherCode >= 200 && weatherCode < 300) {
        return 'bg-gradient-to-r from-gray-900 to-gray-700'; // Thunderstorm
      }
      else if (weatherCode >= 300 && weatherCode < 400) {
        return 'bg-gradient-to-r from-gray-700 to-gray-500'; // Drizzle
      }
      else if (weatherCode >= 500 && weatherCode < 600) {
        return isNight ? 'bg-gradient-to-r from-blue-900 to-blue-700' : 'bg-gradient-to-r from-blue-600 to-blue-400'; // Rain
      }
      else if (weatherCode >= 600 && weatherCode < 700) {
        return 'bg-gradient-to-r from-blue-100 to-blue-200'; // Snow
      }
      else if (weatherCode >= 700 && weatherCode < 800) {
        return 'bg-gradient-to-r from-gray-600 to-gray-400'; // Atmosphere
      }
      else if (weatherCode === 800) {
        return isNight ? 'bg-gradient-to-r from-gray-900 to-blue-900' : 'bg-gradient-to-r from-blue-400 to-blue-200'; // Clear
      }
      else if (weatherCode > 800) {
        const cloudiness = this.weather.clouds?.all || 0;
        if (cloudiness < 50) {
          return isNight ? 'bg-gradient-to-r from-gray-800 to-gray-600' : 'bg-gradient-to-r from-gray-400 to-gray-200'; // Partly cloudy
        } else {
          return isNight ? 'bg-gradient-to-r from-gray-700 to-gray-500' : 'bg-gradient-to-r from-gray-500 to-gray-300'; // Mostly cloudy
        }
      }
      return 'bg-gradient-to-r from-purple-700 to-pink-500'; // Default
    },
    // Determines if it's night time based on local time
    isNightTime() {
      if (!this.weather.timezone) return false;
      const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
      const localTime = new Date(utcTime + this.weather.timezone * 1000);
      const hour = localTime.getHours();
      return hour < 6 || hour >= 18; // Night time is between 6 PM and 6 AM
    },
    // Processes forecast data to show one entry per day
    dailyForecast() {
      if (!this.forecast.list || this.forecast.list.length === 0) return [];
      
      const dailyData = {};
      const today = new Date().setHours(0, 0, 0, 0);
      
      this.forecast.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.setHours(0, 0, 0, 0);
        
        if (day === today) return; // Skip today
        
        if (!dailyData[day]) {
          dailyData[day] = {
            dt: item.dt,
            temp: { min: item.main.temp, max: item.main.temp },
            weather: item.weather,
            humidity: item.main.humidity,
            pop: item.pop || 0
          };
        } else {
          // Update min/max temperatures
          if (item.main.temp < dailyData[day].temp.min) {
            dailyData[day].temp.min = item.main.temp;
          }
          if (item.main.temp > dailyData[day].temp.max) {
            dailyData[day].temp.max = item.main.temp;
          }
          
          // Update precipitation probability if higher
          if ((item.pop || 0) > dailyData[day].pop) {
            dailyData[day].pop = item.pop;
          }
        }
      });
      
      return Object.values(dailyData).slice(0, 5); // Return next 5 days
    }
  },
  // Lifecycle hooks
  mounted() {
    this.getLocation(); // Get user's location on component mount
    this.updateOnlineStatus(); // Check online status
    window.addEventListener("offline", this.updateOnlineStatus); // Listen for offline event
    window.addEventListener("online", this.updateOnlineStatus); // Listen for online event
  },
  beforeUnmount() {
    // Clean up event listeners
    window.removeEventListener("offline", this.updateOnlineStatus);
    window.removeEventListener("online", this.updateOnlineStatus);
  },
  // Component methods
  methods: {
    // Updates online status
    updateOnlineStatus() {
      this.isOnline = navigator.onLine;
    },
    // Fetches current weather data
    fetchWeather() {
      fetch(
        `${this.url_base}weather?q=${this.query}&units=metric&appid=${this.api_key}`
      )
        .then((res) => res.json())
        .then(this.setResults)
        .then(() => this.fetchForecast())
        .catch((err) => console.error("Error fetching weather:", err));
    },
    // Fetches forecast data
    fetchForecast() {
      if (!this.weather.name) return;
      
      fetch(
        `${this.url_base}forecast?q=${this.weather.name}&units=metric&appid=${this.api_key}`
      )
        .then((res) => res.json())
        .then(this.setForecastResults)
        .catch((err) => console.error("Error fetching forecast:", err));
    },
    // Sets current weather results
    setResults(results) {
      this.weather = results;
      console.log("Current weather:", this.weather);
      this.query = ""; // Clear search query
    },
    // Sets forecast results
    setForecastResults(results) {
      this.forecast = results;
      console.log("Forecast data:", this.forecast);
    },
    // Formats forecast day name
    formatForecastDay(timestamp) {
      const date = new Date(timestamp * 1000);
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return days[date.getDay()];
    },
    // Formats forecast time
    formatForecastTime(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.getHours() + ':00';
    },
    // Calculates temperature bar width percentage
    tempPercentage(min, max) {
      const range = max - min;
      return range > 0 ? 100 : 50; // If no range, show 50%
    },
    // Builds formatted date string
    dateBuilder() {
      if (this.weather.timezone !== undefined) {
        const utcTime =
          new Date().getTime() + new Date().getTimezoneOffset() * 60000;
        const localTime = new Date(utcTime + this.weather.timezone * 1000);

        const months = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December",
        ];
        const days = [
          "Sunday", "Monday", "Tuesday", "Wednesday",
          "Thursday", "Friday", "Saturday",
        ];

        const day = days[localTime.getDay()];
        const date = localTime.getDate();
        const month = months[localTime.getMonth()];
        const year = localTime.getFullYear();

        return `${day} ${date} ${month} ${year}`;
      } else {
        return "Loading...";
      }
    },
    // Converts UTC time to local time
    convertToLocalTime(timezoneOffset) {
      if (timezoneOffset !== undefined) {
        const utcTime =
          new Date().getTime() + new Date().getTimezoneOffset() * 60000;
        const localTime = new Date(utcTime + timezoneOffset * 1000);

        const hours = localTime.getHours().toString().padStart(2, "0");
        const minutes = localTime.getMinutes().toString().padStart(2, "0");

        return `${hours}:${minutes}`;
      } else {
        return "--:--";
      }
    },
    // Gets user's location and fetches weather
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetch(
              `${this.url_base}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${this.api_key}`
            )
              .then((res) => res.json())
              .then(this.setResults)
              .then(() => this.fetchForecast())
              .catch((err) =>
                console.error("Error fetching location weather:", err)
              );
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      }
    },
  },
};
</script>

<style scoped>
/* Custom styles for input placeholder */
input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

/* Remove default input focus outline and add custom style */
input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
}

/* Search wrapper transition effect */
.search-wrapper {
  transition: all 0.3s ease;
}

/* Search wrapper hover effect */
.search-wrapper:focus-within {
  transform: translateY(-2px);
}

/* Custom scrollbar styles */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

/* Webkit scrollbar styles */
.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

/* Smooth transition for background changes */
.bg-gradient-to-r {
  transition: background-image 1s ease-in-out;
}
</style>
