"use client";

import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, TextInput } from "@mantine/core";

type Fields = {
	url: string;
};

export const YoutubeForm: React.FC = memo(function YoutubeForm({}) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Fields>();
	const router = useRouter();

	const onSubmit: SubmitHandler<Fields> = useCallback(
		async fields => {
			router.push(`/youtube/${encodeURIComponent(fields.url)}`);
		},
		[router],
	);

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
		</>
	);
});

