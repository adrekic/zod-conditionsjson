import { configDefaults, defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		dir: "./tests",
		passWithNoTests: true,
		typecheck: {
			tsconfig: "./tsconfig.node.json",
		},
		exclude: [...configDefaults.exclude, "packages/template/*"],
	},
})
