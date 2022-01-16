import { UpdateFunction } from './mod.ts';

export const grapheneos: UpdateFunction = (stored_devices, getDevice) => {
	[
		'raven',
		'oriole',
		'barbet',
		'redfin',
		'bramble',
		'sunfish',
		'coral',
		'flame',
		'bonito',
		'sargo',
		'crosshatch',
		'blueline',
	].forEach((x) => {
		let device = getDevice(x);

		device = {
			codename: device.codename || x,
			roms: [
				...device.roms,
				{
					id: 'grapheneos',
				},
			],
		};
		stored_devices.set(x.toLowerCase(), device);
	});
};
