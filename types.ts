export interface Roms {
	name: string;
	id: string;
	about: string;
	website: string;
	wiki: string;
	download: string;
}

export interface Devices {
	brand?: string;
	name?: string;
	codename: string;
	specs: Record<string, string>;
	roms: ROM[];
}

export interface ROM {
	id: ID;
	photo?: string;
	gapps?: string;
	recovery?: string;
	maintainer?: string;
	changelog?: null | string;
	cpu?: string;
	ram?: string;
	wifi?: string;
	supported_versions?: SupportedVersion[];
	repostories?: string[];
	url?: string;
	group?: string;
	xda_thread?: string;
	maintainer_url?: string;
	maintainer_name?: string;
	active?: boolean;
	download?: string;
	github?: string;
	donation_link?: string;
	romtype?: Romtype;
	version?: string;
	developer?: string;
}

export enum ID {
	Ancientos = 'ancientos',
	Aospk = 'AOSPK',
	Arrowos = 'arrowos',
	Blissroms = 'blissroms',
	CalyxOS = 'CalyxOS',
	Calyxos = 'calyxos',
	Cherishos = 'cherishos',
	Crdroid = 'crdroid',
	Dotos = 'dotos',
	Evolutionx = 'evolutionx',
	Grapheneos = 'grapheneos',
	Havocos = 'havocos',
	Legionos = 'legionos',
	Lineageos = 'lineageos',
	Pixelexperience = 'pixelexperience',
	Pixelextended = 'pixelextended',
	Pixyos = 'pixyos',
	Potato = 'potato',
	Revengeos = 'revengeos',
	Sakura = 'sakura',
	Sparkos = 'sparkos',
	Syberia = 'syberia',
}

export enum Romtype {
	Official = 'OFFICIAL',
}

export interface SupportedVersion {
	version_code: VersionCode;
	xda_thread?: string;
	stable?: boolean;
	deprecated: boolean;
	telegram_url?: string;
}

export enum VersionCode {
	Eleven = 'eleven',
	ElevenPlus = 'eleven_plus',
	Twelve = 'twelve',
}
