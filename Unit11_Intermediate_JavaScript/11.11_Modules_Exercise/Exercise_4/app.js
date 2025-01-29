//Dynamic imports
async function loadConfig(hour) {
  const themeModule = await import("./theme.mjs");

  if (hour < 18) {
    themeModule.setLightTheme();
  } else {
    themeModule.setDarkTheme();
  }
}

// Load
loadConfig(19);
