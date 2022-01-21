import type { UpdateFunction } from './mod.ts';

export interface AospExtended {
	name: string;
	brand: string;
	codename: string;
	maintainer_name: string;
	maintainer_url: string;
	xda_thread?: string;
}

export const aospExtended: UpdateFunction = async () => {
	return [
		await fetch('https://api.aospextended.com/devices/filtered/q').then((r) =>
			r.json()
		),
		await fetch('https://api.aospextended.com/devices/filtered/r').then((r) =>
			r.json()
		),
	].map((x) => {
		if (!x.codename) return;
		return {
			brand: x.brand,
			name: x.name,
			codename: x.codename,
			rom: {
				id: 'aospextended',
				xda_thread: x.xda_thread,
				maintainer_url: x.maintainer_url,
				maintainer_name: x.maintainer_name,
			},
		};
	});
};
