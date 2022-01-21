import { UpdateFunction } from './mod.ts';

export interface SuperiorOS {
	brand: string;
	device_name: string;
	codename: string;
	assert: string[];
	datetime: number;
	filename: string;
	id: string;
	romtype: string;
	size: number;
	url: string;
	version: string;
	date: string;
	maintainer_name: string;
	telegram_username: string;
	xda_thread: string;
}

export const evolutionx: UpdateFunction = async (stored_devices, getDevice) => {
	const devices: SuperiorOS[] = await fetch(
		'https://github.com/SuperiorOS-Devices/official_devices/blob/twelve/devices.json?raw=true'
	).then((r) => r.json());
	return devices.map((x) => {
		return {
			brand: x.brand,
			name: x.device_name,
			codename: x.codename,
			rom: {
				id: 'superioros',
				version: x.version,
				xda_thread: x.xda_thread,
			},
		};
	});
};
