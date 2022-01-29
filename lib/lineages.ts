import { parse } from 'https://deno.land/std@0.121.0/encoding/yaml.ts';
import { UpdateFunction } from './mod.ts';

export const lineages: UpdateFunction = async (stored_devices, getDevice) => {
	return await Promise.all(
		[...Deno.readDirSync('./ota/lineageos/_data/devices/')]
			.filter((x) => x.name.endsWith('.yml'))
			.map(async (x) => {
				try {
					const file = parse(
						await Deno.readTextFile(`./ota/lineageos/_data/devices/${x.name}`)
					) as Record<string, any>;
					return {
						brand: file.vendor,
						name: file.name,
						codename: file.codename,
						rom: {
							id: 'lineageos',
							cpu: file.cpu,
							ram: file.ram,
							wifi: file.wifi,
						},
					};
				} catch (e) {}
			})
	);
};
