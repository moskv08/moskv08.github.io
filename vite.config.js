// vite.config.js
import vitePluginString from 'vite-plugin-string'
import { defineConfig } from 'vite'

export default defineConfig ({
  plugins: [
    vitePluginString.default(), 
  ],
  base: "/vite-3dglobe-threejs/"
});