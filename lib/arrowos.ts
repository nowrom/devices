import { UpdateFunction } from './mod.ts';

export interface ArrowOS {
	[t: string]: TartuGecko[] | Crownlte[] | JasmineSprout[] | Star2LTE[] | Lmi[];
}

interface TartuGecko {
	'changelog': null | string;
	'maintainer': string;
	'model': string;
	'oem': string;
	'v10.0'?: V100[];
	'v12.0'?: PurpleV110[];
	'v11.0'?: PurpleV110[];
}

interface V100 {
	OFFICIAL: Official[];
	UNOFFICIAL?: Official[];
}

interface Official {
	GAPPS?: Gapp[];
	VANILLA?: Gapp[];
}

interface Gapp {
	date: string;
	datetime: string;
	filename: string;
	filepath: string;
	sha256: string;
	size: string;
	type: Type;
	version: Version;
}

enum Type {
	Community = 'community',
	Official = 'official',
	Unofficial = 'unofficial',
}

enum Version {
	V100 = 'v10.0',
	V110 = 'v11.0',
	V120 = 'v12.0',
}

interface PurpleV110 {
	OFFICIAL?: Official[];
	COMMUNITY?: Official[];
	UNOFFICIAL?: Official[];
}

interface Crownlte {
	'changelog': null;
	'maintainer': string;
	'model': string;
	'oem': string;
	'v11.0': FluffyV110[];
	'v12.0': FluffyV110[];
}

interface FluffyV110 {
	OFFICIAL: Official[];
	UNOFFICIAL: V110_UNOFFICIAL[];
}

interface V110_UNOFFICIAL {
	VANILLA: Gapp[];
}

interface JasmineSprout {
	'changelog': null | string;
	'maintainer': string;
	'model': string;
	'oem': string;
	'v11.0'?: V110[];
	'v12.0'?: JasmineSproutV120[];
}

interface V110 {
	COMMUNITY: Official[];
	OFFICIAL?: Official[];
	UNOFFICIAL?: Official[];
}

interface JasmineSproutV120 {
	UNOFFICIAL: Official[];
}

interface Lmi {
	'changelog': null;
	'maintainer': string;
	'model': string;
	'oem': string;
	'v10.0': V100[];
	'v11.0': V100[];
	'v12.0': LmiV120[];
}

interface LmiV120 {
	OFFICIAL: Official[];
	UNOFFICIAL: PurpleUNOFFICIAL[];
}

interface PurpleUNOFFICIAL {
	GAPPS: Gapp[];
}

interface Star2LTE {
	'changelog': null | string;
	'maintainer': string;
	'model': string;
	'oem': string;
	'v11.0'?: V110[];
	'v12.0'?: FluffyV110[];
	'v10.0'?: Star2LTEV100[];
}

interface Star2LTEV100 {
	OFFICIAL: Official[];
}

export const arrowOs: UpdateFunction = async (stored_devices, getDevice) => {
	const devices: ArrowOS = await fetch(
		'https://github.com/ArrowOS/arrow_ota/blob/master/arrow_ota.json?raw=true'
	).then((r) => r.json());

	return Object.entries(devices).map(([name, value]) => {
		return {
			codename: name,
			name: value[0].model,
			brand: value[0].oem,
			rom: {
				id: 'arrowos',
				maintainer: value[0].maintainer,
				changelog: value[0].changelog,
			},
		};
	});
};
