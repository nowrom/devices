export interface Syberia {
	response: Response[];
}

export interface Response {
	datetime: number;
	filename: string;
	id: string;
	romtype: string;
	size: string;
	url: string;
	version: string;
	device_brand: string;
	device_model: string;
	device_codename: string;
	developer: string;
}
