<template>
  <div>
    <div class="h-screen bg-gradient-to-r from-purple-700 to-pink-500">
      <div class="flex justify-around items-end">
        <div class="logo text-white my-10">
          <img src="../assets/images/logo.png" alt="" />
        </div>
        <div class="wrapper my-10">
          <div class="input-data">
            <input
              type="text"
              id="search"
              required
              class="border-none focus:outline-none"
              v-model="query"
              @keypress="fetchWeather"
            />
            <div class="underline"></div>
            <label for="search">Search</label>
          </div>
        </div>
      </div>
      <div class="flex justify-around items-center text-white m-auto">
        <div>
          <h1 class="text-4xl">
            {{ weather.main ? Math.round(weather.main.temp) : "--" }}°
          </h1>
        </div>
        <div>
          <div class="text-4xl">{{ weather.name }}</div>
          <div class="text-l">{{ dateBuilder() }}</div>
          <p>Local Time: {{ convertToLocalTime(weather.timezone) }}</p>
        </div>
        <div>
          <img
            :src="`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`"
            alt="Weather Icon"
          />
        </div>
      </div>
      <div class="text-white my-8">
        <p class="text-center text-xl">Weather Details...</p>
        <h1 class="text-center text-5 my-4">
          {{
            weather.weather &&
            weather.weather[0] &&
            weather.weather[0].description
              ? weather.weather[0].description.toUpperCase()
              : "LOADING..."
          }}
        </h1>
        <div>
          <div
            class="flex justify-around items-center text-white text-start mt-3"
          >
            <p class="text-xl">Temp max</p>
            <div class="flex justify-around items-center">
              <p class="text-xl">
                {{ weather.main ? Math.round(weather.main.temp_max) : "--" }}°
              </p>
              <img
                src="../assets/images/temp-max.png"
                alt="temp-max"
                class="ml-2.5"
              />
            </div>
          </div>
          <div
            class="flex justify-around items-center text-white text-start mt-3"
          >
            <p class="text-xl">Temp min</p>
            <div class="flex justify-around items-center">
              <p class="text-xl">
                {{ weather.main ? Math.round(weather.main.temp_min) : "--" }}°
              </p>
              <img
                src="../assets/images/temp-min.png"
                alt="temp-min"
                class="ml-2.5"
              />
            </div>
          </div>
          <div
            class="flex justify-around items-center text-white text-start mt-3"
          >
            <p class="text-xl text-start">Humidity</p>
            <div class="flex justify-around items-center">
              <p class="text-xl">
                {{ weather.main ? Math.round(weather.main.humidity) : "--" }}%
              </p>
              <img
                src="../assets/images/humadity.png"
                alt="humidity"
                class="ml-2.5"
              />
            </div>
          </div>
          <div
            class="flex justify-around items-center text-white text-start mt-3 justify-items-start"
          >
            <p class="text-xl text-start">Cloudy</p>
            <div class="flex justify-around items-center justify-items-start">
              <p class="text-xl">
                {{ weather.clouds ? Math.round(weather.clouds.all) : "--" }}%
              </p>
              <img
                src="../assets/images/cloudy-icon.png"
                alt="cloudy"
                class="ml-2.5"
              />
            </div>
          </div>
          <div
            class="flex justify-around items-center text-white text-start mt-3 justify-items-start"
          >
            <p class="text-xl">Wind</p>
            <div class="flex justify-around items-center justify-items-start">
              <p class="text-xl">
                {{ weather.wind ? Math.round(weather.wind.speed) : "--" }}km/h
              </p>
              <img src="../assets/images/wind.png" alt="wind" class="ml-2.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      api_key: "a99acda1a46562e6b50452999bf057a5",
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {},
    };
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    fetchWeather(e) {
      if (e.key === "Enter") {
        fetch(
          `${this.url_base}weather?q=${this.query}&units=metric&appid=${this.api_key}`
        )
          .then((res) => res.json())
          .then(this.setResults)
          .catch((err) => console.error("Error fetching weather:", err));
      }
    },
    setResults(results) {
      this.weather = results;
      console.log(this.weather);
    },
    dateBuilder() {
      if (this.weather.timezone !== undefined) {
        const utcTime =
          new Date().getTime() + new Date().getTimezoneOffset() * 60000;
        const localTime = new Date(utcTime + this.weather.timezone * 1000);

        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
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
.wrapper {
  width: 200px;
}
.wrapper .input-data {
  position: relative;
  background: transparent;
  height: 40px;
  width: 100%;
}

.wrapper .input-data input {
  background: transparent;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  font-size: 17px;
  color: white;
}
.wrapper .input-data input:focus ~ label,
.wrapper .input-data input:not(:placeholder-shown) ~ label {
  transform: translateY(-25px); /* Move the label above the underline */
  font-size: 14px;
  color: silver; /* Optional: Change label color on focus */
}
.wrapper .input-data label {
  position: absolute;
  bottom: 5px; /* Initially aligns with the underline */
  left: 0;
  font-size: 16px;
  color: white;
  pointer-events: none; /* Prevent interaction with the label */
  transition: all 0.3s ease; /* Smooth animation */
}
.wrapper .input-data .underline {
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 100%;
  background: silver;
  overflow: hidden;
}

.input-data .underline::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background: transparent;
  transform: scaleX(0);
  transform-origin: left;
  transition: all 0.3s ease;
}

.input-data input:focus ~ .underline::before {
  transform: scaleX(1);
}
</style>