"use client";

import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { navigate } from "@/lib/navigate";
import { Button, TextInput } from "@mantine/core";

type Fields = {
	url: string;
};

export const Form: React.FC = memo(function Form({}) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Fields>();
	const router = useRouter();

	const onSubmit: SubmitHandler<Fields> = useCallback(
		async fields => {
			const url = navigate(fields.url);
			router.push(url);
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
					label="Insira a URL desejada:"
					description="Disponível: Youtube, TikTok e Instagram."
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

