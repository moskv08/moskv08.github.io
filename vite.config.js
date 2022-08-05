// vite.config.js
import vitePluginString from 'vite-plugin-string'
import { defineConfig } from 'vite'

export default {
  plugins: [
    vitePluginString.default(),
    defineConfig({
      base: "./"
    })   
  ]
}