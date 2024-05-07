import dotenv from 'dotenv'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

dotenv.config()
// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
    if (command === 'serve') {
        return {
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
        }
    } else {
        // command === 'build'
        return {
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
            build: {
                outDir: path.resolve(__dirname, 'dist'),
            },
        }
    }
})
