import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	experimental: {
		serverActions: {
			// Careers applications carry a CV (≤5 MB) and installation photos.
			bodySizeLimit: "16mb",
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				port: "",
			},
		],
	},
};

export default nextConfig;
