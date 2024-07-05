/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "i.ytimg.com",
			},
		],
	},

	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
	},
};

export default nextConfig;
