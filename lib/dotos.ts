import { UpdateFunction } from './mod.ts';

export interface DotOS {
	[key: string]: { [key: string]: string };
}
export const dotos: UpdateFunction = async () => {
	const devices: DotOS = await fetch(
		'https://github.com/DotOS/official_devices/blob/dot11/devices.json?raw=true'
	).then((r) => r.json());

	let t = Object.entries(devices)
		.map(([brand, devices]) => {
			return Object.entries(devices).map(([codename, name]) => {
				return {
					brand: brand,
					name: name,
					codename: codename,
					rom: {
						id: 'dotos',
					},
				};
			});
		})
		.flat(5);
	return t;
};
