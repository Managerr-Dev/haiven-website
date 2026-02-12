import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://haiven.net";

	return [
		{ url: `${baseUrl}/`, priority: 1 },

		{ url: `${baseUrl}/iot-solutions`, priority: 0.9 },

		{ url: `${baseUrl}/features/access-control`, priority: 0.8 },
		{ url: `${baseUrl}/features/bills-management`, priority: 0.8 },
		{ url: `${baseUrl}/features/smart-metering`, priority: 0.8 },
		{ url: `${baseUrl}/features/utilities-vending`, priority: 0.8 },
		{ url: `${baseUrl}/features/facility-booking`, priority: 0.8 },

		{ url: `${baseUrl}/about-us`, priority: 0.5 },
		{ url: `${baseUrl}/contact-us`, priority: 0.5 },

		{ url: `${baseUrl}/privacy-policy`, priority: 0.3 },
		{ url: `${baseUrl}/terms-conditions`, priority: 0.3 },
	];
}
