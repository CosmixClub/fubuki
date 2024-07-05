import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";

import "./globals.css";

const inter = Inter({
	weight: "variable",
	style: ["normal"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Fubuki: Baixe vídeos e imagens da internet",
	description: "Baixe vídeos e imagens da internet com Fubuki",
};

const theme = createTheme({
	primaryColor: "main",
	colors: {
		main: [
			"#eafaed",
			"#dfeedf",
			"#c0dac0",
			"#9fc3a0",
			"#83b184",
			"#71a672",
			"#67a068",
			"#568b57",
			"#4a7d4c",
			"#3b6c3e",
		],
	},
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<head>
				<ColorSchemeScript />
			</head>
			<body className={inter.variable}>
				<MantineProvider theme={theme}>{children}</MantineProvider>
			</body>
		</html>
	);
}
