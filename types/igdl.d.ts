declare module "@sasmeee/igdl" {
	export default function igdl(url: string): Promise<{ thumbnail_link: string; download_link: string }[]>;
}

