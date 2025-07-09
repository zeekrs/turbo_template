import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
		include: ["src/**/*.test.ts"],
		coverage: {
			provider: "istanbul",
			reporter: ["text", "json", "html"],
			exclude: ["node_modules/", "dist/"],
		},
	},
});
