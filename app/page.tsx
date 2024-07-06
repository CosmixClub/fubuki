import { Form } from "./_components/form";

export default function Home() {
	return (
		<main className="main-gradient flex h-[100svh] w-full flex-col bg-slate-50">
			<header className="flex w-full flex-col items-center justify-center gap-2 p-32">
				<h1 className="main-clip text-6xl font-bold">Fubuki</h1>
				<span className="font-medium">Download de vídeos e imagens da internet.</span>
			</header>

			<section className="flex w-full flex-col items-center justify-center gap-10">
				<Form />
			</section>
		</main>
	);
}
