import { UpdateFunction } from './mod.ts';

export interface Spark {
	name: string;
	codename: string;
	filename: string;
	version: string;
	maintainer: string;
	username: string;
	size: number;
	url: string;
	group: string;
}
export const spark: UpdateFunction = async (stored_devices, getDevice) => {
	await Promise.all(
		[...Deno.readDirSync('./sparkota')]
			.filter((x) => x.name.endsWith('.json'))
			.map(async (x) => {
				const file: Spark = JSON.parse(
					await Deno.readTextFile(`./sparkota/${x.name}`)
				);

				const codename = x.name.split('.')[0];
				let device = getDevice(codename);
				device = {
					...device,
					brand: device.brand,
					name: device.name || file.name,
					codename: codename,
					roms: [
						...device.roms,
						{
							id: 'sparkos',
							group: file.group,
							download: file.url,
						},
					],
				};

				stored_devices.set(codename.toLowerCase(), device);
			})
	);
};
