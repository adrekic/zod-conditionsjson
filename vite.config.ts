import { resolve } from "node:path"

import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig(({ mode }) => {
	const productionLike = mode === "production" || mode === "prod"

	return {
		plugins: [
			dts({
				tsconfigPath: "./tsconfig.lib.json",
				exclude: ["**/*.test.*", "**/*.test-d.*"],
				afterDiagnostic: (diagnostics) => {
					if (diagnostics.length === 0) return
					throw new Error(`Failed to generate ${diagnostics.length} .d.ts files`)
				},
			}),
		],
		build: {
			lib: {
				entry: resolve(import.meta.dirname, "src/index.ts"),
				formats: ["es", "cjs"],
				fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
			},
			minify: productionLike,
			sourcemap: !productionLike,
			rolldownOptions: {
				external: (id) => id === "zod" || id.startsWith("zod/"),
			},
		},
	}
})
