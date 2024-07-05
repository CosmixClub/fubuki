import { NextResponse } from "next/server";
import ytdl from "ytdl-core";
import { z } from "zod";

import { api, handlerConfig } from "@/lib/api";

const router = api();

const getInputs = z.object({
	url: z.string().url(),
});

router.get(async (req, ctx) => {
	const params = req.nextUrl.searchParams;
	const inputs = getInputs.parse(Object.fromEntries(params));
	const url = new URL(inputs.url);

	const domains = ["www.youtube.com", "youtube.com", "m.youtube.com", "youtu.be"];
	if (!domains.includes(url.hostname)) {
		throw new Error("Invalid youtube domain.");
	}

	const info = await ytdl.getInfo(url.toString(), { lang: "pt" });
	const data = {
		streaming: info.player_response.streamingData,
		details: info.player_response.videoDetails,
	};

	return NextResponse.json({ message: "Sucesso", data });
});

const handler = router.handler(handlerConfig);
export { handler as GET, handler as POST };

