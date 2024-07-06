/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "i.ytimg.com",
			},
			{
				hostname: "igcdn.xyz",
			},
		],
	},

	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
	},
};

export default nextConfig;
