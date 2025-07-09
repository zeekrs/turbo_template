import pino from "pino";
import { roll } from "pino-roll";

export type LogLevel = "fatal" | "error" | "warn" | "info" | "debug" | "trace";

export interface LoggerOptions {
	level?: LogLevel;
	name?: string;
	browser?: boolean;
	pretty?: boolean;
	file?: {
		enabled: boolean;
		path?: string;
		retention?: number; // 保留天数
	};
}

type LogArgs = unknown[];

declare global {
	var window: Window & typeof globalThis;
}

const isBrowser = typeof globalThis.window !== "undefined";

export class Logger {
	private logger: pino.Logger;

	constructor(options: LoggerOptions = {}) {
		const {
			level = "info",
			name = "app",
			browser = isBrowser,
			pretty = process.env.NODE_ENV !== "production",
			file = { enabled: false },
		} = options;

		const baseConfig = {
			level,
			name,
			browser: {
				asObject: browser,
			},
		};

		if (file.enabled) {
			const fileStream = roll({
				file: file.path || "logs/app.log",
				size: "1d", // 按天轮换
				keep: file.retention || 30, // 保留30天
			});

			this.logger = pino(baseConfig, fileStream);
		} else if (pretty) {
			this.logger = pino({
				...baseConfig,
				transport: {
					target: "pino-pretty",
					options: {
						colorize: true,
						translateTime: "SYS:standard",
						ignore: "pid,hostname",
					},
				},
			});
		} else {
			this.logger = pino(baseConfig);
		}
	}

	fatal(message: string, ...args: LogArgs): void {
		this.logger.fatal(message, ...args);
	}

	error(message: string, ...args: LogArgs): void {
		this.logger.error(message, ...args);
	}

	warn(message: string, ...args: LogArgs): void {
		this.logger.warn(message, ...args);
	}

	info(message: string, ...args: LogArgs): void {
		this.logger.info(message, ...args);
	}

	debug(message: string, ...args: LogArgs): void {
		this.logger.debug(message, ...args);
	}

	trace(message: string, ...args: LogArgs): void {
		this.logger.trace(message, ...args);
	}
}

export const createLogger = (options?: LoggerOptions) => new Logger(options);

export default createLogger;
