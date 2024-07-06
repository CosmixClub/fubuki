export const navigate = (url: string) => {
	let service = "youtube";
	if (url.includes("tiktok")) service = "tiktok";
	if (url.includes("instagram")) service = "instagram";

	return `/${service}/${encodeURIComponent(url)}`;
};

