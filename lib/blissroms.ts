import { UpdateFunction } from './mod.ts';

//https://github.com/BlissRoms-Devices/OTA/blob/master/builds.json
export const blissroms: UpdateFunction = async () => {
	const devices: Record<string, unknown> = await fetch(
		'https://github.com/BlissRoms-Devices/OTA/blob/master/builds.json?raw=true'
	).then((r) => r.json());

	return Object.entries(devices).map(([name, _value]) => {
		return {
			codename: name,
			rom: {
				id: 'blissroms',
			},
		};
	});
};
