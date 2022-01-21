import { UpdateFunction } from './mod.ts';

export interface Revenge {
	error: boolean;
	donate_url: string;
	website_url: string;
	news_url: string;
	datetime: number;
	filename: string;
	id: string;
	size: string;
	url: string;
	download_new: string;
	clean_flash: string;
	version: string;
	filehash: string;
}

export const revenge: UpdateFunction = async () => {
	const ota = `./ota/revenge/`;
	return await Promise.all(
		[...Deno.readDirSync(ota)]
			.filter((x) => x.isDirectory)
			.filter((x) => !x.name.startsWith('.'))
			.map(async (x) => {
				return await {
					codename: x.name,
					rom: {
						id: 'revengeos',
					},
				};
			})
	);
};
