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

export const syberia: UpdateFunction = async () => {
	return await Promise.all(
		[...Deno.readDirSync('./ota/official_devices/ab')]
			.filter((x) => x.name.endsWith('.json'))
			.map(async (x) => {
				const file: Syberia = JSON.parse(
					await Deno.readTextFile(`./ota/official_devices/ab/${x.name}`)
				);
				return {
					brand: file.response[0].device_brand,
					name: file.response[0].device_model,
					codename: file.response[0].device_codename,
					rom: {
						id: 'syberia',
						romtype: file.response[0].romtype,
						version: file.response[0].version,
						developer: file.response[0].developer,
					},
				};
			})
	);
};
