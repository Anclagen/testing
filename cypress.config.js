require("dotenv").config();
const { defineConfig } = require("cypress");
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      video = false;
      config.env = {
        ...process.env,
        ...config.env,
      };
      return config;
    },
  },
});
