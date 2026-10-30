import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Double-click support (file://):
 * Browser, file:// par "type=module" scripts aur "crossorigin" wale files ko block kar deta hai,
 * jisse page blank dikhta hai. Isliye build ke baad HTML se ye dono hata dete hain aur script ko
 * normal (defer) script bana dete hain. Netlify / server par bhi ye bilkul theek chalta hai.
 */
function fileProtocolFriendlyHtml() {
  return {
    name: 'file-protocol-friendly-html',
    enforce: 'post',
    transformIndexHtml(html) {
      return html
        .replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/g, '<script defer src="$1"></script>')
        .replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/g, '<link rel="stylesheet" href="$1">')
    },
  }
}

export default defineConfig({
  base: './', // relative paths: kisi bhi folder / hosting par chalta hai
  plugins: [react(), fileProtocolFriendlyHtml()],
  build: {
    chunkSizeWarningLimit: 900,
    modulePreload: false,
    rollupOptions: {
      output: {
        format: 'iife', // ek hi normal script file (module nahi)
        inlineDynamicImports: true,
      },
    },
  },
})
