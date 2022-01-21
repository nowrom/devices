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
		'https://github.com/PotatoProject/vendor_potato/blob/frico-release/devices.json?raw=true'
	).then((r) => r.json());

	return Object.entries(devices).map(([name, _]) => {
		return {
			codename: name,
			rom: {
				id: 'potato',
			},
		};
	});
};
