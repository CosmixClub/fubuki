import { NextResponse } from "next/server";

import { api, handlerConfig } from "@/lib/api";

const router = api();

router.get(async (req, ctx) => {
	return NextResponse.json({ message: "Hello, World!" });
});

const handler = router.handler(handlerConfig);
export { handler as GET, handler as POST };

