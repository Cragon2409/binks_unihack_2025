
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    console.log(command);
    return {
        define: {
            'process.env': env
        },
        plugins: [react()]
    };
});