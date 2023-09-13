Steps to run the automation:

1. Start the app by running: `MAX_RATE=300000 PORT=3001 npm start`
2. Run or debug the tests (See notes):
   a. `"e2e": "npx playwright test"`,
   b. `"e2e-ui": "npx playwright test --headed"`,
   b. `"debug": "npx playwright test --headed --debug"`
3. Check out the results: `npx playwright show-report`

Notes:
Specify NODE_ENV and browser in the command to run e2e tests like:
`NODE_ENV=local yarn run debug register.spec.ts --project=chromium`
