const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
    allowedHosts: [
      '3f53accb-b6ed-48fd-ae56-adb5b2e5db91-00-1yty5nneyu9p3.janeway.replit.dev'
    ]
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
