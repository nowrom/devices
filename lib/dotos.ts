import { UpdateFunction } from './mod.ts';

export interface DotOS {
	[key: string]: { [key: string]: string };
}
export const dotos: UpdateFunction = async (stored_devices, getDevice) => {
	const devices: DotOS = await fetch(
		'https://github.com/DotOS/official_devices/blob/dot11/devices.json?raw=true'
	).then((r) => r.json());

	Object.entries(devices).forEach(([brand, devices]) => {
		Object.entries(devices).map(([codename, name]) => {
			let device = getDevice(codename);
			device = {
				...device,
				brand: device.brand || brand,
				name: device.name || name,
				codename: codename,
				roms: [
					...device.roms,
					{
						id: 'dotos',
					},
				],
			};
			stored_devices.set(codename.toLowerCase(), device);
		});
	});
};
