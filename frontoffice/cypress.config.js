import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost/',
    setupNodeEvents(on, config) {

    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});