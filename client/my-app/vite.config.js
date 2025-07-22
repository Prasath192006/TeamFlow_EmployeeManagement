import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
        '@emotion/react': '@emotion/react',
        '@emotion/styled': '@emotion/styled',
    },
},
})
