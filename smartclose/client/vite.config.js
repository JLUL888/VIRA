const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

// The dev/build scripts run `vite client`, so the project root is this folder.
module.exports = defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Forward API calls to the Express server during development.
      '/api': 'http://localhost:3001',
    },
  },
});
