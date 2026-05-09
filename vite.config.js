import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    // 代碼分割優化
    rollupOptions: {
      output: {
        manualChunks: {
          // 將 React 分割成獨立的 chunk
          'react-vendor': ['react', 'react-dom'],
          // 將大型組件數據分割
          'site-data': ['./src/data/siteData.js'],
        },
      },
    },
    // 啟用 CSS 代碼分割
    cssCodeSplit: true,
    // 最小化後的 chunk 大小
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  preview: {
    allowedHosts: true,
  },
  // 開發環境優化
  server: {
    middlewareMode: false,
  },
});
