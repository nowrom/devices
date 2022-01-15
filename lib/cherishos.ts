import { UpdateFunction } from './mod.ts';

interface Cherishos {
	brand: string;
	codename: string;
	name: string;
	supported_versions: SupportedVersion[];
}

interface SupportedVersion {
	maintainer_name: string;
	maintainer_url: string;
	version_code: VersionCode;
	version_name: VersionName;
	xda_thread: string;
	deprecated?: boolean;
}

enum VersionCode {
	Eleven = 'eleven',
}

enum VersionName {
	Eleven = 'Eleven',
}

export const cherishos: UpdateFunction = async (stored_devices, getDevice) => {
	const devices: Cherishos[] = await fetch(
		'https://github.com/CherishOS-Devices/OTA/blob/master/devices.json?raw=true'
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
					id: 'cherishos',
				},
			],
		};
		stored_devices.set(x.codename, device);
	});
};
