const path = require('path');

// `vite client` runs with the cwd at the repo root, so point Tailwind at this
// directory's config explicitly instead of relying on cwd-based discovery.
module.exports = {
  plugins: {
    tailwindcss: { config: path.join(__dirname, 'tailwind.config.js') },
    autoprefixer: {},
  },
};
