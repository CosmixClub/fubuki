import { NextResponse } from "next/server";
import ytdl from "ytdl-core";
import { ZodError, z } from "zod";

import { api, handlerConfig } from "@/lib/api";

const router = api();

const getInputs = z.object({
	url: z.string().url(),
});

export type GetOutputs = {
	message: string;
	data: {
		streaming: ytdl.videoInfo["player_response"]["streamingData"];
		details: ytdl.videoInfo["player_response"]["videoDetails"];
	};
};

const postInputs = z.object({
	url: z.string().url(),
	quality: z.string().optional(),
	start: z.coerce.number().int().min(0).optional(),
	end: z.coerce.number().int().min(10).optional(),
});

router.get(async (req, _ctx) => {
	const params = req.nextUrl.searchParams;
	const inputs = getInputs.parse(Object.fromEntries(params));

	if (!ytdl.validateURL(inputs.url)) {
		throw new Error("Invalid youtube domain.");
	}

	const info = await ytdl.getInfo(inputs.url, { lang: "pt" });
	const data: GetOutputs["data"] = {
		streaming: info.player_response.streamingData,
		details: info.player_response.videoDetails,
	};

	return NextResponse.json({ message: "Sucesso", data });
});

router.post(async (req, _ctx) => {
	const inputs = postInputs.parse(await req.json());

	if (!ytdl.validateURL(inputs.url)) {
		throw new ZodError([
			{
				message: "Invalid youtube domain.",
				path: ["url"],
				code: "invalid_string",
				validation: "url",
			},
		]);
	}

	const iterator = ytdl(inputs.url, {
		lang: "pt",
		quality: inputs.quality || "highest",
		range: inputs.start || inputs.end ? { start: inputs.start, end: inputs.end } : undefined,
	}).iterator();

	const stream = new ReadableStream({
		async start(controller) {
			for await (const chunk of iterator) {
				controller.enqueue(chunk);
			}
			controller.close();
		},
	});

	return new Response(stream);
});

const handler = router.handler(handlerConfig);
export { handler as GET, handler as POST };

