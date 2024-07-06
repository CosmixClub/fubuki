import { NextResponse } from "next/server";
import { z } from "zod";

import { api, handlerConfig } from "@/lib/api";
import igdl from "@sasmeee/igdl";

const router = api();

const getInputs = z.object({
	url: z.string().url(),
});

export type GetOutputs = {
	message: string;
	data: {
		thumbnail_link: string;
		download_link: string;
	};
};

router.get(async (req, _ctx) => {
	const params = req.nextUrl.searchParams;
	const inputs = getInputs.parse(Object.fromEntries(params));

	const data = await igdl(inputs.url);
	return NextResponse.json({ message: "Sucesso", data: data[0] });
});

const handler = router.handler(handlerConfig);
export { handler as GET, handler as POST };

