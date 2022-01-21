import { UpdateFunction } from './mod.ts';

export interface Crdroid {
	response: CRResponse[];
}

export interface CRResponse {
	maintainer: string;
	oem: string;
	device: string;
	filename: string;
	download: string;
	timestamp: number;
	md5: string;
	size: number;
	version: string;
	buildtype: string;
	forum: string;
	gapps: string;
	firmware: string;
	modem: string;
	bootloader: string;
	recovery: string;
	paypal: string;
	telegram: string;
}

export const crdroid: UpdateFunction = async (stored_devices, getDevice) => {
	return await Promise.all(
		[...Deno.readDirSync('./ota/android_vendor_crDroidOTA')]
			.filter((x) => x.name.endsWith('.json'))
			.map(async (x) => {
				const file: Crdroid = JSON.parse(
					await Deno.readTextFile(`./ota/android_vendor_crDroidOTA/${x.name}`)
				);
				const response = file.response[0];
				const codename = x.name.split('.')[0];
				return {
					brand: response.oem,
					name: response.device,
					codename: codename,
					rom: {
						id: 'crdroid',
						gapps: response.gapps,
						recovery: response.recovery,
					},
				};
			})
	);
};
