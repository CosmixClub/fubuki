"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { GetOutputs } from "@/app/api/youtube/route";
import { ActionIcon, AspectRatio, Button, RangeSlider, Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export type ViewProps = {
	url: string;
	data: GetOutputs["data"];
};

type Fields = {
	url: string;
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
		register,
		formState: { isSubmitting },
	} = useForm<Fields>({
		defaultValues: {
			start_end: [0, Number(data.details.lengthSeconds)],
			// @ts-expect-error - This is a valid operation
			quality: String(data.streaming.adaptiveFormats[0].itag),
		},
	});

	const router = useRouter();
	const start_end = watch("start_end");
	const quality = watch("quality");

	const changeUrl: SubmitHandler<Fields> = useCallback(
		({ url }) => {
			router.push(`/youtube/${encodeURIComponent(url)}`);
		},
		[router],
	);

	const download: SubmitHandler<Fields> = useCallback(
		async fields => {
			const response = await fetch("/api/youtube", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ url, quality: fields.quality }),
			});

			const type = response.headers.get("Content-Type")?.split(";")[0].split("/")[1] || "mp4";

			const blob = await response.blob();
			const media = URL.createObjectURL(blob);

			const a = document.createElement("a");
			a.href = media;
			a.download = data.details.title + "." + type;
			a.click();

			URL.revokeObjectURL(media);
		},
		[data.details.title, url],
	);

	return (
		<section className="flex h-full w-full flex-col gap-6 px-10">
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
				<div className="flex h-full w-full flex-col gap-2 rounded-lg border border-neutral-300 bg-neutral-100/50 p-2 backdrop-blur-sm md:max-w-[25%]">
					<Select
						label="Selecione o tipo/qualidade:"
						placeholder="Selecione:"
						data={data.streaming.adaptiveFormats.map(val => ({
							// @ts-expect-error - This is a valid operation
							value: String(val.itag),
							// @ts-expect-error - This is a valid operation
							label: `${val.mimeType.split(";")[0]} - ${val.qualityLabel || val.audioQuality || "Desconhecido"}`,
						}))}
						value={quality}
						// @ts-expect-error - This is a valid operation
						defaultValue={String(data.streaming.adaptiveFormats[0].itag)}
						onChange={value => setValue("quality", value || quality)}
						clearable={false}
					/>
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

