# Workflow CA

## Testing Status Badges

[![Automated Unit Testing](https://github.com/Anclagen/testing/actions/workflows/unit-test.yml/badge.svg)](https://github.com/Anclagen/testing/actions/workflows/unit-test.yml)

[![Automated E2E Testing](https://github.com/Anclagen/testing/actions/workflows/e2e-test.yml/badge.svg)](https://github.com/Anclagen/testing/actions/workflows/e2e-test.yml)

unit testing with environmental variables.

[Stack Overflow, found solution](https://stackoverflow.com/questions/57818181/how-to-use-process-env-variables-in-browser-running-by-cypress)

```
npm install --savedev dotenv
```

modify the `cypress.config.js` to match this setup to import env variables whioch can be called in tests using Cypress.env("key")

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

setup .env file like so with your own email and password

```
EMAIL=EXAMPLE@EXAMPLE?COM
PASSWORD=PASSWORD
```

create e2e-test.yml

```
name: Automated E2E Testing
on:
  - pull_request
  - workflow_dispatch

env:
  EMAIL: ${{secrets.TEST_EMAIL}}
  PASSWORD: ${{secrets.TEST_PASSWORD}}

jobs:
  run-e2e-tests:
    name: Run E2E Tests
    runs-on: ubuntu-latest

    steps:
      - name: Checkout under $GITHUB_WORKSPACE
        uses: actions/checkout@main
      - name: Install Dependencies
        run: npm i
      - name: Build SASS
        run: npm run build
      - name: run cypress tests with electron
        uses: cypress-io/github-action@v4
        with:
          start: npm run dev
          wait-on: "http://127.0.0.1:8080/"
          browser: electron
```
