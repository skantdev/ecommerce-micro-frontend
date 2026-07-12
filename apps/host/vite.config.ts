import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        // Micro Frontend remotes (will be created in later steps)
        // auth: 'http://localhost:3001/assets/remoteEntry.js',
        // home: 'http://localhost:3002/assets/remoteEntry.js',
        // products: 'http://localhost:3003/assets/remoteEntry.js',
        // cart: 'http://localhost:3004/assets/remoteEntry.js',
        // checkout: 'http://localhost:3005/assets/remoteEntry.js',
        // orders: 'http://localhost:3006/assets/remoteEntry.js',
        // profile: 'http://localhost:3007/assets/remoteEntry.js',
        // admin: 'http://localhost:3008/assets/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.0.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.0.0',
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^7.0.1',
        },
        redux: {
          singleton: true,
          requiredVersion: '^5.0.1',
        },
        'react-redux': {
          singleton: true,
          requiredVersion: '^9.1.2',
        },
        '@reduxjs/toolkit': {
          singleton: true,
          requiredVersion: '^2.2.5',
        },
      },
    }),
  ],
  server: {
    port: 3000,
    cors: true,
    strictPort: true,
  },
  preview: {
    port: 3000,
    cors: true,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
