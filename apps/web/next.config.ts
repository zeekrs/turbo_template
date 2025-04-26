import { NextConfig } from "next";

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	transpilePackages: ["@workspace/ui"],
};

export default nextConfig;
