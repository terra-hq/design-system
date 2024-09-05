import { resolve } from 'path'
import path from 'path';
import { defineConfig } from 'vite'

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [],
  build: {
    outDir,
    emptyOutDir: true,
    lib: {
      entry: 'src/scss/index.scss', // Punto de entrada de tu biblioteca
      name: 'terra-design-system', // Nombre global si se incluye mediante una etiqueta <script>
      // Especifica los formatos de salida deseados
      // formats: ['es', 'umd', 'cjs'],
    },
    rollupOptions: {
      input: {
        main: resolve(root, './scss/index.scss'),
      },
      output: {
        // entryFileNames: `[name].[format].js`,
      }
    }
  },
  resolve: {
    alias: {
      '@scss': path.resolve(__dirname, './src/scss'),

    },
  },
  
})