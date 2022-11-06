const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      video = false;
    },
  },
  env: {
    login_url: "/login",
    products_url: "/products",
  },
});
