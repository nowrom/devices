import { UpdateFunction } from './mod.ts';

export interface HavocOS {
	oem: string;
	name: string;
	codename: string;
	filename: string;
	version: string;
	romtype: string;
	variant: string;
	maintainer: string;
	username: string;
	size: number;
	datetime: number;
	filehash: string;
	id: string;
	url: string;
	group: string;
}

export const havocos: UpdateFunction = async () => {
	return await Promise.all(
		[...Deno.readDirSync('./ota/havocos/gapps')]
			.filter((x) => x.name.endsWith('.json'))
			.filter((x) => !x.name.includes('_'))
			.map(async (x) => {
				try {
					const file: HavocOS = JSON.parse(
						await Deno.readTextFile(`./ota/havocos/gapps/${x.name}`)
					);
					return {
						brand: file.oem,
						name: file.name,
						codename: file.codename,
						rom: {
							id: 'havocos',
							url: file.url,
							maintainer: file.maintainer,
							group: file.group,
						},
					};
				} catch (e) {}
			})
	);
};
