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
