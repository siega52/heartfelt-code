import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  base: '/heartfelt-code/', // Важно! То же имя, что и в homepage
})