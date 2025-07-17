
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      "36d3624d-d6b8-44c2-aa3d-5e74376284c4.lovableproject.com",
      "8080-iyzh4ybq817pa0xwg4vwu-72bb8412.manusvm.computer",
    ],
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            if (id.includes('@radix-ui')) {
              return 'ui-components';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            if (id.includes('@tanstack') || id.includes('algoliasearch')) {
              return 'external-apis';
            }
            if (id.includes('three') || id.includes('@react-three')) {
              return '3d-libs';
            }
            return 'vendor';
          }
          if (id.includes('src/components/3d/')) {
            return '3d-components';
          }
          if (id.includes('src/pages/admin/')) {
            return 'admin';
          }
        },
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
    sourcemap: mode === 'development',
    cssMinify: 'lightningcss',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));
