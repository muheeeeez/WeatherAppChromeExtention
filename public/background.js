async function createOffscreen() {
  if (await chrome.offscreen.hasDocument()) {
    console.log("Offscreen document already exists.");
    return;
  }
  console.log("Creating offscreen document...");
  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: [chrome.offscreen.Reason.GEOLOCATION],
    justification: "To access geolocation for weather updates.",
  });
}

async function getGeolocation() {
  await createOffscreen();

  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "getGeolocation" }, (response) => {
      console.log("Geolocation response:", response);
      if (response && response.error) {
        console.error("Error:", response.error);
        resolve(null);
      } else if (response) {
        resolve(response);
      } else {
        console.error("No response received.");
        resolve(null);
      }
    });
  });
}
async function getUserLocationAndNotify() {
  const position = await getGeolocation();
  if (position) {
    const { latitude, longitude } = position;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    const weather = await fetchWeather(latitude, longitude);
    if (weather) {
      showWeatherNotification(weather.temp, weather.description);
    }
  }
}
async function fetchWeather(lat, lon) {
  const API_KEY = "a99acda1a46562e6b50452999bf057a5";
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    if (response.ok) {
      return {
        temp: data.main.temp,
        description: data.weather[0].description,
      };
    } else {
      console.error("Weather API error:", data.message);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
function showWeatherNotification(temp, description) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "/images/icon-128.png",
    title: "Weather Update",
    message: `Current Temp: ${temp}°C\nCondition: ${description}`,
  });
}
// getUserLocationAndNotify();
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed. Setting up alarm...");
  chrome.alarms.create("weatherAlarm", { periodInMinutes: 180 });
});
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log(`Alarm triggered: ${alarm.name}`);
  if (alarm.name === "weatherAlarm") {
    getUserLocationAndNotify();
  }
});
