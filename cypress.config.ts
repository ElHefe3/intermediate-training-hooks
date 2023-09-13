import { defineConfig } from 'cypress';
import 'dotenv/config';

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    setupNodeEvents(on, config) {},
    env: {
      username: process.env.CYPRESS_USERNAME,
      password: process.env.CYPRESS_PASSWORD,
    },
    experimentalRunAllSpecs: true,
  },
});
