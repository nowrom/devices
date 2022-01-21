import type { UpdateFunction } from './mod.ts';

export interface AncientOS {
	device_codename: string;
	maintainer: string;
	rom_support: string;
	device_supportgp_url: string;
	changelog_url: string;
	date_updated: string;
	download_url: string;
	phone_url: string;
}

export const ancientOs: UpdateFunction = async (stored_devices, getDevice) => {
	const devices: AncientOS[] = await fetch(
		'https://github.com/ancient-devices/releases/blob/main/website_api.json?raw=true'
	).then((r) => r.json());
	return devices.map((x) => {
		const regex = /\((.*?)\)/.exec(x.device_codename);
		if (regex?.[0]) {
			const codename = regex[1].split('/')[0].toLowerCase();
			return {
				name: x.device_codename,
				codename: codename,
				rom: {
					id: 'ancientos',
					photo: x.phone_url,
				},
			};
		}
	});
};
