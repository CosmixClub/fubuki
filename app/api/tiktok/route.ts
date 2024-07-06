import { NextResponse } from "next/server";
import TikTok from "tiktokapi-src";
import { z } from "zod";

import { api, handlerConfig } from "@/lib/api";

const router = api();

const getInputs = z.object({
	url: z.string().url(),
});

export type GetOutputs = {
	message: string;
	data: {
		type: "video" | "image";
		desc: string;
		author: {
			avatar: string;
			nickname: string;
		};
		video: string;
		music: string;
	};
};

router.get(async (req, _ctx) => {
	const params = req.nextUrl.searchParams;
	const inputs = getInputs.parse(Object.fromEntries(params));

	const data = await TikTok.Downloader(inputs.url, { version: "v2" });

	if (data.status === "error") {
		throw new Error(data.message);
	}

	return NextResponse.json({ message: "Sucesso", data: data.result });
});

const handler = router.handler(handlerConfig);
export { handler as GET, handler as POST };

