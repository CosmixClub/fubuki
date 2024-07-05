"use client";

import { memo, useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, TextInput } from "@mantine/core";

import { GetOutputs } from "../api/youtube/route";

type Fields = {
	url: string;
};

export const YoutubeForm: React.FC = memo(function YoutubeForm({}) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Fields>();

	const [data, setData] = useState<GetOutputs["data"] | undefined>(undefined);

	const onSubmit: SubmitHandler<Fields> = useCallback(async fields => {
		const req = await fetch(`/api/youtube?url=${fields.url}`, {
			headers: { "Content-Type": "application/json", "Accept": "application/json" },
		});
		const json = await req.json();
		const data = json.data;
		setData(data);

		console.log(data);
	}, []);

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full max-w-md flex-col gap-2"
			>
				<TextInput
					type="url"
					label="Insira a URL do Youtube:"
					placeholder="Digite aqui:"
					{...register("url", {
						required: true,
					})}
					error={errors.url?.message}
				/>
				<Button
					type="submit"
					loading={isSubmitting}
				>
					Pesquisar
				</Button>
			</form>
			{data && (
				<>
					<div className="flex w-full flex-col gap-2 text-center">
						<span>{data.details.title}</span>
						<span>{data.details.author}</span>
					</div>
				</>
			)}
		</>
	);
});

