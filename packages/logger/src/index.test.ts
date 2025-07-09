import { describe, expect, it } from "vitest";
import { createLogger } from "./index";

describe("Logger", () => {
	it("should create a logger instance", () => {
		const logger = createLogger();
		expect(logger).toBeDefined();
	});

	it("should create a logger with custom options", () => {
		const logger = createLogger({
			level: "debug",
			name: "test-logger",
			pretty: true,
		});
		expect(logger).toBeDefined();
	});
});
