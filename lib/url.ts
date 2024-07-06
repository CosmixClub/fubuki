export const getURL = (): string => {
	let url = process.env.NEXT_PUBLIC_WEBSERVER_URL || "https://fubuki.vercel.app";

	if (process.env.NODE_ENV === "development") {
		url = "http://localhost:3000";
	}

	if (["preview"].includes(String(process.env.NEXT_PUBLIC_VERCEL_ENV))) {
		url = `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`;
	}

	return url;
};

