import { UpdateFunction } from './mod.ts';

export interface PixelExtended {
	error: boolean;
	filename: string;
	datetime: number;
	size: number;
	url: string;
	filehash: string;
	version: string;
	id: string;
	tg_username: string;
	device_name: string;
	device: string;
	xda_thread: string;
}
export const pixelextended: UpdateFunction = async () => {
	return await Promise.all(
		[...Deno.readDirSync('./ota/pixelextended/builds')]
			.filter((x) => x.name.endsWith('.json'))
			.map(async (x) => {
				const file: PixelExtended = JSON.parse(
					await Deno.readTextFile(`./ota/pixelextended/builds/${x.name}`)
				);
				if (file.device == undefined) return;
				const codename = file.device.split('.')?.[0]?.trim();
				return {
					name: file.device_name,
					codename: codename,
					rom: {
						id: 'pixelextended',
						url: file.url,
						xda_thread: file.xda_thread,
					},
				};
			})
	);
};
