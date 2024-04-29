import dotenv from 'dotenv'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: '/src',
            },
        ],
    },
    define: {
        'process.env': process.env,
    },
})
