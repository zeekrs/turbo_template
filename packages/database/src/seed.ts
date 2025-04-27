import type { User } from "../generated/client";
import { prisma } from "./client";

const DEFAULT_USERS = [
	// Add your own user to pre-populate the database with
	{
		name: "zeekrs",
		email: "zeekrs@zeeks.dev",
	},
] as Array<Partial<User>>;

(async () => {
	try {
		await Promise.all(
			DEFAULT_USERS.map((user) =>
				prisma.user.upsert({
					where: {
						email: user.email!,
					},
					update: {
						...user,
					},
					create: {
						...user,
					},
				}),
			),
		);
	} catch (error) {
		console.error(error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
})();
