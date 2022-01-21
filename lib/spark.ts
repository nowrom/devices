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
	return await Promise.all(
		[...Deno.readDirSync('./ota/sparkota')]
			.filter((x) => x.name.endsWith('.json'))
			.map(async (x) => {
				const file: Spark = JSON.parse(
					await Deno.readTextFile(`./ota/sparkota/${x.name}`)
				);

				const codename = x.name.split('.')[0];
				return {
					name: file.name,
					codename: codename,
					rom: {
						id: 'sparkos',
						group: file.group,
						download: file.url,
					},
				};
			})
	);
};
