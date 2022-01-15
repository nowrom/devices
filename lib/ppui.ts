import { UpdateFunction } from './mod.ts';

export interface Ppui {
	deviceCategory: string;
	deviceDetails: { [key: string]: string }[];
}
export const pixelUI: UpdateFunction = async (stored_devices, getDevice) => {
	const devices: Ppui[] = await fetch(
		'https://ppui.site/assets/json/download.json'
	).then((r) => r.json());

	devices.forEach((xy) => {
		xy.deviceDetails.forEach((x) => {
			const codename = x.codeName
				.replace('(', '')
				.replace(')', '')
				.split('/')[0];
			let device = getDevice(codename);
			device = {
				...device,
				brand: device.brand || xy.deviceCategory,
				name: device.name || x.deviceName,
				codename: codename,
				roms: [
					...device.roms,
					{
						id: 'pixelplusui',
						active: x.deviceStatus,
						photo: x.avatar,
						guide: x.guide,
					},
				],
			};
			stored_devices.set(codename, device);
		});
	});
};
