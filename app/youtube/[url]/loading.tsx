import { ActionIcon, AspectRatio, Button, Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export default async function Loading() {
	return (
		<main className="main-gradient flex min-h-[100svh] w-full flex-col gap-5 bg-slate-50 px-4 sm:px-10">
			<header className="flex w-full flex-col items-start justify-center gap-2 py-5">
				<span className="main-clip text-2xl font-bold">Fubuki</span>
			</header>

			<section className="flex h-full w-full flex-col gap-6 px-0 sm:px-10">
				<form className="flex w-full animate-pulse items-center gap-4">
					<TextInput
						type="url"
						placeholder="Digite a URL:"
						className="w-full"
					/>
					<ActionIcon
						type="submit"
						className="h-full"
						size="lg"
					>
						<IconSearch size={16} />
					</ActionIcon>
				</form>

				<div className="flex flex-col items-start justify-between gap-4 md:flex-row">
					<div className="flex w-full flex-col gap-4 md:max-w-[75%]">
						<div className="relative">
							<AspectRatio ratio={16 / 9}>
								<div className="h-full max-h-[720px] w-full max-w-[1280px] animate-pulse rounded-lg bg-neutral-400" />
							</AspectRatio>
						</div>
						<div className="flex flex-col gap-1">
							<span className="h-6 w-[20rem] animate-pulse break-words rounded-md bg-slate-300 font-medium" />
							<span className="h-5 w-[14rem] animate-pulse truncate rounded-md bg-slate-400 text-sm font-medium text-neutral-800" />
						</div>
					</div>
					<div className="flex h-full w-full flex-col gap-2 rounded-lg border border-neutral-300 bg-neutral-100/50 p-2 backdrop-blur-sm md:max-w-[25%]">
						<Select
							label="Selecione o tipo/qualidade:"
							placeholder="Selecione:"
						/>
						<Button className="w-full">Baixar</Button>
					</div>
				</div>
			</section>
		</main>
	);
}

