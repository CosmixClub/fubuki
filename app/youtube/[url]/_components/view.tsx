"use client";

import Image from "next/image";
import { memo, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { GetOutputs } from "@/app/api/youtube/route";
import { ActionIcon, AspectRatio, Button, RangeSlider, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export type ViewProps = {
	url: string;
	data: GetOutputs["data"];
};

type Fields = {
	start_end: [number, number];
	quality: string;
};

const getThumbnail = (data: GetOutputs["data"]) => {
	// @ts-expect-error - This is a valid operation
	return data.details.thumbnail.thumbnails.toReversed()[0];
};

const formatSeconds = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainder = seconds % 60;
	return `${minutes < 10 ? `0${minutes}` : minutes}:${remainder < 10 ? `0${remainder}` : remainder}`;
};

export const View: React.FC<ViewProps> = memo(function View({ url, data }) {
	const {
		handleSubmit,
		setValue,
		watch,
		formState: { isSubmitting },
	} = useForm<Fields>({ defaultValues: { start_end: [0, Number(data.details.lengthSeconds)] } });

	const start_end = watch("start_end");

	const download: SubmitHandler<Fields> = useCallback(
		async fields => {
			const response = await fetch("/api/youtube", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ url }),
			});
			const blob = await response.blob();
			const media = URL.createObjectURL(blob);

			const a = document.createElement("a");
			a.href = media;
			a.download = data.details.title + "." + "mp4";
			a.click();

			URL.revokeObjectURL(media);
		},
		[data.details.title, url],
	);

	return (
		<section className="flex h-full w-full flex-col gap-6 px-10">
			<header className="flex w-full items-center gap-4">
				<TextInput
					type="url"
					placeholder="Digite a URL:"
					defaultValue={url}
					className="w-full"
				/>
				<ActionIcon
					type="submit"
					className="h-full"
					size={"lg"}
				>
					<IconSearch size={16} />
				</ActionIcon>
			</header>

			<div className="flex flex-col items-start justify-between gap-4 md:flex-row">
				<div className="flex w-full flex-col gap-4 md:max-w-[75%]">
					<div className="relative">
						<AspectRatio ratio={16 / 9}>
							<Image
								alt="Thumbnail do vídeo"
								className="h-full w-full rounded-lg object-cover"
								src={getThumbnail(data).url}
								width={getThumbnail(data).width}
								height={getThumbnail(data).height}
							/>
						</AspectRatio>
						<div className="slider-gradient absolute bottom-0 w-full rounded-lg px-6 py-4">
							<RangeSlider
								className="w-full"
								min={0}
								max={Number(data.details.lengthSeconds)}
								step={1}
								label={formatSeconds}
								value={start_end}
								onChange={value => setValue("start_end", value)}
							/>
						</div>
					</div>
					<div className="flex flex-col">
						<span className="break-words font-medium">{data.details.title}</span>
						<span className="truncate text-sm font-medium text-neutral-800">{data.details.author}</span>
					</div>
				</div>
				<div className="h-full w-full rounded-lg border border-neutral-300 bg-neutral-100 p-2 md:max-w-[25%]">
					<Button
						className="w-full"
						onClick={handleSubmit(download)}
						loading={isSubmitting}
					>
						Baixar
					</Button>
				</div>
			</div>
		</section>
	);
});

