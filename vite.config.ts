import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

const commitHash = execSync('git rev-parse --short HEAD').toString().trim()
const timestamp = new Date().toISOString()

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_BUILD_TAG': JSON.stringify(`${commitHash}-${timestamp}`)
  }
})
