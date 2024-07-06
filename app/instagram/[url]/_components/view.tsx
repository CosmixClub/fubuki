"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { GetOutputs } from "@/app/api/instagram/route";
import { navigate } from "@/lib/navigate";
import { ActionIcon, AspectRatio, Button, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export type ViewProps = {
	url: string;
	data: GetOutputs["data"];
};

type Fields = {
	url: string;
};

export const View: React.FC<ViewProps> = memo(function View({ url, data }) {
	const {
		handleSubmit,
		register,
		formState: { isSubmitting },
	} = useForm<Fields>({
		defaultValues: {},
	});

	const router = useRouter();

	const changeUrl: SubmitHandler<Fields> = useCallback(
		({ url }) => {
			const actualUrl = navigate(url);
			router.push(actualUrl);
		},
		[router],
	);

	return (
		<section className="flex h-full w-full flex-col gap-6 px-0 sm:px-10">
			<form
				onSubmit={handleSubmit(changeUrl)}
				className="flex w-full items-center gap-4"
			>
				<TextInput
					type="url"
					placeholder="Digite a URL:"
					defaultValue={url}
					className="w-full"
					{...register("url")}
				/>
				<ActionIcon
					type="submit"
					className="h-full"
					size={"lg"}
				>
					<IconSearch size={16} />
				</ActionIcon>
			</form>

			<div className="flex flex-col items-start justify-between gap-4 md:flex-row">
				<div className="flex w-full flex-col gap-4 md:max-w-[75%]">
					<div className="relative">
						<AspectRatio ratio={16 / 9}>
							<Image
								alt="Thumbnail da mídia"
								className="h-full w-full rounded-lg object-cover"
								src={data.thumbnail_link}
								width={720}
								height={1280}
							/>
						</AspectRatio>
					</div>
					<div className="flex flex-col">
						<span className="break-words font-medium">Mídia do instagram</span>
						<span className="truncate text-sm font-medium text-neutral-800">
							Identificação do autor não suportada
						</span>
					</div>
				</div>
				<div className="flex h-full w-full flex-col gap-2 rounded-lg border border-neutral-300 bg-neutral-100/50 p-2 backdrop-blur-sm md:max-w-[25%]">
					<a
						href={data.download_link}
						download
					>
						<Button
							className="w-full"
							loading={isSubmitting}
						>
							Baixar
						</Button>
					</a>
				</div>
			</div>
		</section>
	);
});

