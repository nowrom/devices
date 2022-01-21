import { UpdateFunction } from './mod.ts';

export const grapheneos: UpdateFunction = (stored_devices, getDevice) => {
	return [
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
	].map((x) => {
		return {
			codename: x,
			rom: {
				id: 'grapheneos',
			},
		};
	});
};
