import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	server: {
		fs: {
			strict: false, // Prevents Vite from scanning unintended directories
		},
	},
	optimizeDeps: {
		exclude: ['.git'], // Excludes .git from dependency pre-bundling
	},
	build: {
		rollupOptions: {
			external: ['.git'], // Ensures Rollup doesn’t process .git files
		},
	},
	esbuild: {
		jsxInject: `import React from 'react'`,
	},
});
