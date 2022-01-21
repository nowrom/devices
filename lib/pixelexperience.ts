import { UpdateFunction } from './mod.ts';

export interface PixelExperience {
	name: string;
	brand: string;
	codename: string;
	supported_versions: SupportedVersion[];
	repositories: string[];
}

export interface SupportedVersion {
	version_code: VersionCode;
	stable?: boolean;
	deprecated: boolean;
	xda_thread?: string;
	telegram_url?: string;
}

export enum VersionCode {
	Eleven = 'eleven',
	ElevenPlus = 'eleven_plus',
	Twelve = 'twelve',
}

export const pixelexperience: UpdateFunction = async (
	stored_devices,
	getDevice
) => {
	const devices: PixelExperience[] = await fetch(
		'https://github.com/PixelExperience/official_devices/blob/master/devices.json?raw=true'
	).then((r) => r.json());
	return devices.map((x) => {
		return {
			brand: x.brand,
			name: `${x.brand} ${x.name}`,
			codename: x.codename,
			rom: {
				id: 'pixelexperience',
				supported_versions: x.supported_versions,
				repostories: x.repositories,
			},
		};
	});
};
