import type { UpdateFunction } from './mod.ts';

export const AOSPK: UpdateFunction = async (stored_devices, getDevice) => {
	const devices = await fetch(
		'https://github.com/AOSPK/official_devices/blob/master/devices.json?raw=true'
	).then((r) => r.json());

	devices.forEach((x: any) => {
		let device = getDevice(x.codename);
		device = {
			...device,
			brand: device.brand || x.brand,
			name: device.name || x.name,
			codename: x.codename,
			roms: [
				...device.roms,
				{
					id: 'AOSPK',
					xda_thread: x.xda_thread,
					maintainer_url: x.maintainer_url,
					maintainer_name: x.maintainer_name,
				},
			],
		};
		stored_devices.set(x.codename.toLowerCase(), device);
	});
};
