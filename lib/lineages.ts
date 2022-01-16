import { parse } from 'https://deno.land/std@0.121.0/encoding/yaml.ts';
import { UpdateFunction } from './mod.ts';

export const lineages: UpdateFunction = async (stored_devices, getDevice) => {
	await Promise.all(
		[...Deno.readDirSync('./lineage_wiki/_data/devices/')]
			.filter((x) => x.name.endsWith('.yml'))
			.map(async (x) => {
				try {
					const file = parse(
						await Deno.readTextFile(`./lineage_wiki/_data/devices/${x.name}`)
					) as Record<string, any>;
					let device = getDevice(file.codename);
					device = {
						...device,
						brand: device.brand || file.vendor,
						name: device.name || file.name,
						codename: file.codename,
						roms: [
							...device.roms,
							{
								id: 'lineages',
								cpu: file.cpu,
								ram: file.ram,
								wifi: file.wifi,
							},
						],
					};

					stored_devices.set(file.codename.toLowerCase(), device);
				} catch (e) {}
			})
	);
};
