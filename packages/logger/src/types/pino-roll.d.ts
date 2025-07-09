declare module "pino-roll" {
	export function roll(options: {
		file: string;
		size?: string;
		keep?: number;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	}): any;
}
