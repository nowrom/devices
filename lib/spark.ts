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
export const spark: UpdateFunction = async () => {
	return await Promise.all(
		[...Deno.readDirSync('./ota/spark')]
			.filter((x) => x.name.endsWith('.json'))
			.map(async (x) => {
				const file: Spark = JSON.parse(
					await Deno.readTextFile(`./ota/spark/${x.name}`)
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
