chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getGeolocation") {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        sendResponse({ latitude, longitude });
      },
      (error) => {
        console.error("Geolocation error:", error.message);
        sendResponse({ error: error.message });
      }
    );
    return true;
  }
});
