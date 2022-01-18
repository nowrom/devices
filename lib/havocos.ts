import { UpdateFunction } from './mod.ts';

export interface HavocOS {
	oem: string;
	name: string;
	codename: string;
	filename: string;
	version: string;
	romtype: string;
	variant: string;
	maintainer: string;
	username: string;
	size: number;
	datetime: number;
	filehash: string;
	id: string;
	url: string;
	group: string;
}

export const havocos: UpdateFunction = async (stored_devices, getDevice) => {
	await Promise.all(
		[...Deno.readDirSync('./ota/havocota/gapps')]
			.filter((x) => x.name.endsWith('.json'))
			.filter((x) => !x.name.includes('_'))
			.map(async (x) => {
				try {
					const file: HavocOS = JSON.parse(
						await Deno.readTextFile(`./ota/havocota/gapps/${x.name}`)
					);
					let device = getDevice(file.codename);
					device = {
						...device,
						brand: device.brand || file.oem,
						name: device.name || file.name,
						codename: file.codename,
						roms: [
							...device.roms,
							{
								id: 'havocos',
								url: file.url,
								maintainer: file.maintainer,
								group: file.group,
							},
						],
					};

					stored_devices.set(file.codename.toLowerCase(), device);
				} catch (e) {}
			})
	);
};
