import { UpdateFunction } from './mod.ts';

export interface Legion {
	brand: string;
	name: string;
	codename: string;
	maintainer_name: string;
	maintainer_xda: string;
	maintainer_country: string;
	xda_thread: string;
	photo: string;
	github_link: string;
	telegram_link: string;
	active: boolean;
	supported_versions: string[];
	supported_types: string[];
	donation_link: string;
}

export const legion: UpdateFunction = async (stored_devices, getDevice) => {
	const devices: Legion[] = await fetch(
		'https://github.com/legionos-devices/OTA/blob/11/devices.json?raw=true'
	).then((r) => r.json());

	devices.forEach((x) => {
		let device = getDevice(x.codename);
		device = {
			...device,
			brand: device.brand || x.brand,
			name: device.name || x.name,
			codename: x.codename,
			roms: [
				...device.roms,
				{
					id: 'legionos',
					active: x.active,
					maintainer: x.maintainer_name,
					github: x.github_link,
					donation_link: x.donation_link,
					photo: x.photo,
				},
			],
		};
		stored_devices.set(x.codename, device);
	});
};
