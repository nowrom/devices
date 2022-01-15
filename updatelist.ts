import {
	parse,
	stringify,
} from 'https://deno.land/std@0.121.0/encoding/toml.ts';
import {
	ArrowOS,
	DotOS,
	Legion,
	PixelExperience,
	Syberia,
	AncientOS,
} from './lib/mod.ts';

type Data = [PixelExperience[], ArrowOS, DotOS, Legion[], AncientOS[]];

const [
	pixelDevices,
	arrowDevices,
	dotDevices,
	legionDevices,
	ancientDevcies,
]: Data = await Promise.all([
	fetch(
		'https://github.com/PixelExperience/official_devices/blob/master/devices.json?raw=true'
	).then((r) => r.json()),
	fetch(
		'https://github.com/ArrowOS/arrow_ota/blob/master/arrow_ota.json?raw=true'
	).then((r) => r.json()),
	fetch(
		'https://github.com/DotOS/official_devices/blob/dot11/devices.json?raw=true'
	).then((r) => r.json()),
	fetch(
		'https://github.com/legionos-devices/OTA/blob/11/devices.json?raw=true'
	).then((r) => r.json()),
	fetch(
		'https://github.com/ancient-devices/releases/blob/main/website_api.json?raw=true'
	).then((r) => r.json()),
]);

// const pixelDevices: PixelExperience[] = await fetch(
// 	'https://github.com/PixelExperience/official_devices/blob/master/devices.json?raw=true'
// ).then((r) => r.json());

// const arrowDevices: ArrowOS = await fetch(
// 	'https://github.com/ArrowOS/arrow_ota/blob/master/arrow_ota.json?raw=true'
// ).then((r) => r.json());

// const dotDevices: DotOS = await fetch(
// 	'https://github.com/DotOS/official_devices/blob/dot11/devices.json?raw=true'
// ).then((r) => r.json());

// const legionDevices: Legion[] = await fetch(
// 	'https://github.com/legionos-devices/OTA/blob/11/devices.json?raw=true'
// ).then((r) => r.json());

const stored_devices = new Map();

function getDevice(id: string) {
	return stored_devices.get(id) || { roms: [] };
}

await Promise.all(
	[...Deno.readDirSync('./static/devices')]
		.filter((x) => x.name.endsWith('.toml'))
		.map(async (x) => {
			const file = parse(await Deno.readTextFile(`./static/devices/${x.name}`));
			stored_devices.set(file.codename, file);
		})
);

pixelDevices.forEach((x) => {
	let device = getDevice(x.codename);
	device = {
		...device,
		brand: x.brand,
		name: x.name,
		codename: x.codename,
		roms: [
			...device.roms,
			{
				id: 'pixelexperience',
				supported_versions: x.supported_versions,
				repostories: x.repositories,
			},
		],
	};
	stored_devices.set(x.codename, device);
});

Object.entries(arrowDevices).forEach(([name, value]) => {
	let device = getDevice(name);
	device = {
		...device,
		codename: name,
		name: device.name || value[0].model,
		brand: value[0].oem,
		roms: [
			...device.roms,
			{
				id: 'arrowos',
				maintainer: value[0].maintainer,
				changelog: value[0].changelog,
			},
		],
	};
	stored_devices.set(name, device);
});

Object.entries(dotDevices).forEach(([brand, devices]) => {
	Object.entries(devices).map(([codename, name]) => {
		let device = getDevice(codename);
		device = {
			...device,
			brand: brand,
			name: name,
			codename: codename,
			roms: [
				...device.roms,
				{
					id: 'dotos',
				},
			],
		};
		stored_devices.set(codename, device);
	});
});

await Promise.all(
	[...Deno.readDirSync('./official_devices/ab')]
		.filter((x) => x.name.endsWith('.json'))
		.map(async (x) => {
			const file: Syberia = JSON.parse(
				await Deno.readTextFile(`./official_devices/ab/${x.name}`)
			);
			let device = getDevice(file.response[0].device_codename);
			device = {
				...device,
				brand: file.response[0].device_brand,
				name: file.response[0].device_model,
				codename: file.response[0].device_codename,
				roms: [
					...device.roms,
					{
						id: 'syberia',
						romtype: file.response[0].romtype,
						version: file.response[0].version,
						developer: file.response[0].developer,
					},
				],
			};

			stored_devices.set(file.response[0].device_codename, device);
		})
);

legionDevices.forEach((x) => {
	let device = getDevice(x.codename);
	device = {
		...device,
		brand: x.brand,
		name: x.name,
		codename: x.codename,
		roms: [
			...device.roms,
			{
				id: 'legionos',
				active: x.active,
				maintainer: x.maintainer_name,
				github: x.github_link,
				donation_link: x.donation_link,
				photo: x.photo,
			},
		],
	};
	stored_devices.set(x.codename, device);
});

ancientDevcies.forEach((x) => {
	const regex = /\((.*?)\)/.exec(x.device_codename);
	if (regex?.[0]) {
		const codename = regex[1].split('/')[0].toLowerCase();
		let device = getDevice(codename);
		device = {
			...device,
			brand: device.brand || 'Unknown',
			name: device.name || x.device_codename,
			codename: codename,
			roms: [
				...device.roms,
				{
					id: 'ancientos',
					photo: x.phone_url,
				},
			],
		};
		stored_devices.set(codename, device);
	}
});

//Use promise.all cause its much faster
await Promise.all(
	[...stored_devices.values()].map((x) => {
		return Deno.writeTextFile(`devices/${x.codename}.toml`, stringify(x));
	})
);
await Deno.writeTextFile(
	'devices.json',
	JSON.stringify([...stored_devices.values()].sort())
);
await Deno.writeTextFile(
	'roms.json',
	JSON.stringify(
		await Promise.all(
			[...Deno.readDirSync('roms')].map(async (x) => {
				return parse(await Deno.readTextFile(`roms/${x.name}`)).rom;
			})
		)
	)
);
