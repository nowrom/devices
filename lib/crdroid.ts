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
