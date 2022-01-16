import { UpdateFunction } from './mod.ts';

export interface Syberia {
	response: Response[];
}

export interface Response {
	datetime: number;
	filename: string;
	id: string;
	romtype: string;
	size: string;
	url: string;
	version: string;
	device_brand: string;
	device_model: string;
	device_codename: string;
	developer: string;
}

export const syberia: UpdateFunction = async (stored_devices, getDevice) => {
	await Promise.all(
		[...Deno.readDirSync('./official_devices/ab')]
			.filter((x) => x.name.endsWith('.json'))
			.map(async (x) => {
				const file: Syberia = JSON.parse(
					await Deno.readTextFile(`./official_devices/ab/${x.name}`)
				);
				let device = getDevice(file.response[0].device_codename);
				device = {
					...device,
					brand: device.brand || file.response[0].device_brand,
					name: device.name || file.response[0].device_model,
					codename: file.response[0].device_codename,
					roms: [
						...device.roms,
						{
							id: 'syberia',
							romtype: file.response[0].romtype,
							version: file.response[0].version,
							developer: file.response[0].developer,
						},
					],
				};

				stored_devices.set(
					file.response[0].device_codename.toLowerCase(),
					device
				);
			})
	);
};
