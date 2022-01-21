import { UpdateFunction } from './mod.ts';

export interface Ppui {
	deviceCategory: string;
	deviceDetails: { [key: string]: string }[];
}
export const pixelUI: UpdateFunction = async (stored_devices, getDevice) => {
	const devices: Ppui[] = await fetch(
		'https://ppui.site/assets/json/download.json'
	).then((r) => r.json());

	return devices.map((xy) => {
		xy.deviceDetails.forEach((x) => {
			const codename = x.codeName
				.replace('(', '')
				.replace(')', '')
				.split('/')[0];
			return {
				brand: xy.deviceCategory,
				name: x.deviceName,
				codename: codename,
				rom: {
					id: 'pixelplusui',
					active: x.deviceStatus,
					photo: x.avatar,
					guide: x.guide,
				},
			};
		});
	});
};
