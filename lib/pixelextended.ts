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
export const pixelextended: UpdateFunction = async (
	stored_devices,
	getDevice
) => {
	await Promise.all(
		[...Deno.readDirSync('./pixelextendedota/builds')]
			.filter((x) => x.name.endsWith('.json'))
			.map(async (x) => {
				const file: PixelExtended = JSON.parse(
					await Deno.readTextFile(`./pixelextendedota/builds/${x.name}`)
				);
				if (file.device == undefined) return;
				const codename = file.device.split('.')[0];
				let device = getDevice(codename);
				device = {
					...device,
					brand: device.brand,
					name: device.name || file.device_name,
					codename: codename,
					roms: [
						...device.roms,
						{
							id: 'pixelextended',
							url: file.url,
							xda_thread: file.xda_thread,
						},
					],
				};

				stored_devices.set(codename.toLowerCase(), device);
			})
	);
};
