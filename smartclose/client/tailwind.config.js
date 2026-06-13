const path = require('path');

/** @type {import('tailwindcss').Config} */
// Absolute globs so content resolves whether Tailwind runs from the repo root
// (`vite client`) or from inside the client/ directory.
module.exports = {
  content: [
    path.join(__dirname, 'index.html'),
    path.join(__dirname, 'src/**/*.{js,jsx}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
