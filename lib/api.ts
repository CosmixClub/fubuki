import { type NextHandler, createEdgeRouter } from "next-connect";
import { RequestContext } from "next/dist/server/base-server";
import { NextRequest, NextResponse } from "next/server";

export type Middleware = (req: NextRequest, ctx: RequestContext, next: NextHandler) => Promise<void>;

export const handlerConfig = {
	onError: (err: any, req: NextRequest, _ctx: RequestContext) => {
		console.error(`❌ API failed: ${err.message || "Unknown error"}`, { err });

		// if (err instanceof UnknownError) {
		// 	return NextResponse.json({ message: err.message, location: err.location }, { status: 500 });
		// }
		return NextResponse.json({ message: "Houve um erro desconhecido." }, { status: 500 });
	},
	onNoMatch: (_req: NextRequest, _ctx: RequestContext) => {
		return NextResponse.json({ message: "Recurso não encontrado." }, { status: 404 });
	},
};

export const api = () => {
	const router = createEdgeRouter<NextRequest, RequestContext>();
	return router;
};

