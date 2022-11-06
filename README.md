# Workflow CA

## Testing Status Badges

[![Automated Unit Testing](https://github.com/Anclagen/testing/actions/workflows/unit-test.yml/badge.svg)](https://github.com/Anclagen/testing/actions/workflows/unit-test.yml)

[![Automated E2E Testing](https://github.com/Anclagen/testing/actions/workflows/e2e-test.yml/badge.svg)](https://github.com/Anclagen/testing/actions/workflows/e2e-test.yml)

unit testing with environmental variables.

[Stack Overflow, found solution](https://stackoverflow.com/questions/57818181/how-to-use-process-env-variables-in-browser-running-by-cypress)

```
npm install --savedev dotenv
```

modify the `cypress.config.js` to match this setup

```
require("dotenv").config();
const { defineConfig } = require("cypress");
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env = {
        ...process.env,
        ...config.env,
      };
      return config;
    },
  },
});
```
