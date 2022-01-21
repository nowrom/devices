import type { UpdateFunction } from './mod.ts';

export const AOSPK: UpdateFunction = async (stored_devices, getDevice) => {
	const devices = await fetch(
		'https://github.com/AOSPK/official_devices/blob/master/devices.json?raw=true'
	).then((r) => r.json());

	return devices.map((x: any) => {
		return {
			brand: x.brand,
			name: x.name,
			codename: x.codename,
			rom: {
				id: 'AOSPK',
				xda_thread: x.xda_thread,
				maintainer_url: x.maintainer_url,
				maintainer_name: x.maintainer_name,
			},
		};
	});
};
