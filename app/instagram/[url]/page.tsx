import Link from "next/link";
import { notFound } from "next/navigation";

import { GetOutputs } from "@/app/api/instagram/route";

import { View } from "./_components/view";

export default async function Page({ params }: Readonly<{ params: { url: string } }>) {
	const url = decodeURIComponent(params.url);
	const req = await fetch(`http://localhost:3000/api/instagram?url=${url}`).catch(() => notFound());
	const { data } = (await req.json()) as GetOutputs;

	return (
		<main className="main-gradient flex min-h-[100svh] w-full flex-col gap-5 bg-slate-50 px-10">
			<header className="flex w-full flex-col items-start justify-center gap-2 py-5">
				<Link
					href="/"
					className="main-clip text-2xl font-bold"
				>
					Fubuki
				</Link>
			</header>

			<View {...{ url, data }} />
		</main>
	);
}

