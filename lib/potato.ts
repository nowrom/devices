import { UpdateFunction } from './mod.ts';

export interface Potato {
	alioth: Alioth;
	begonia: DrgSprout;
	beryllium: DrgSprout;
	chiron: DrgSprout;
	davinci: DrgSprout;
	DRG_sprout: DrgSprout;
	ginkgo: DrgSprout;
	lavender: DrgSprout;
	phoenix: DrgSprout;
	r2p: DrgSprout;
	violet: DrgSprout;
	whyred: DrgSprout;
}

export interface DrgSprout {
	repo: string;
}

export interface Alioth {
	repo: string;
	gms: boolean;
}

export const potato: UpdateFunction = async (stored_devices, getDevice) => {
	const devices: Potato = await fetch(
		'https://github.com/ArrowOS/arrow_ota/blob/master/arrow_ota.json?raw=true'
	).then((r) => r.json());

	Object.entries(devices).forEach(([name, _]) => {
		let device = getDevice(name);
		device = {
			...device,
			codename: name,
			name: device.name,
			brand: device.brand,
			roms: [
				...device.roms,
				{
					id: 'potato',
				},
			],
		};
		stored_devices.set(name.toLowerCase(), device);
	});
};
