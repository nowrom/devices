import { UpdateFunction } from './mod.ts';

export interface Evolotionx {
	brand: Brand;
	codename: string;
	name: string;
	supported_versions?: Supported[];
	supported_device?: Supported[];
}

enum Brand {
	Asus = 'Asus',
	Lg = 'LG',
	Motorola = 'Motorola',
	OnePlus = 'OnePlus',
	Realme = 'Realme',
	Xiaomi = 'Xiaomi',
}

interface Supported {
	maintainer_name: string;
	maintainer_url: string;
	version_code: VersionCode;
	version_name: VersionName;
	xda_thread: string;
}

enum VersionCode {
	Eleven = 'eleven',
	Twelve = 'twelve',
}

enum VersionName {
	Eleven = 'Eleven',
	Twelve = 'Twelve',
}

export const evolutionx: UpdateFunction = async (stored_devices, getDevice) => {
	const devices: Evolotionx[] = await fetch(
		'https://github.com/Evolution-X-Devices/official_devices/blob/master/devices.json?raw=true'
	).then((r) => r.json());
	devices.forEach((x) => {
		let device = getDevice(x.codename);
		device = {
			...device,
			brand: device.brand || x.brand,
			name: device.name || x.name,
			codename: x.codename,
			roms: [
				...device.roms.filter((x: any) => x.id !== 'evolutionx'),
				{
					id: 'evolutionx',
				},
			],
		};
		stored_devices.set(x.codename.toLowerCase(), device);
	});
};
