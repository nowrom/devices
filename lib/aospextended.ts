import type { UpdateFunction } from './mod.ts';

export interface AospExtended {
	name: string;
	brand: string;
	codename: string;
	maintainer_name: string;
	maintainer_url: string;
	xda_thread?: string;
}

export const aospExtended: UpdateFunction = async (
	stored_devices,
	getDevice
) => {
	[
		await fetch('https://api.aospextended.com/devices/filtered/q').then((r) =>
			r.json()
		),
		await fetch('https://api.aospextended.com/devices/filtered/r').then((r) =>
			r.json()
		),
	].forEach((x) => {
		let device = getDevice(x.codename);
		device = {
			...device,
			brand: device.brand || x.brand,
			name: device.name || x.name,
			codename: x.codename,
			roms: [
				...device.roms,
				{
					id: 'aospextended',
					xda_thread: x.xda_thread,
					maintainer_url: x.maintainer_url,
					maintainer_name: x.maintainer_name,
				},
			],
		};
		stored_devices.set(x.codename, device);
	});
};
