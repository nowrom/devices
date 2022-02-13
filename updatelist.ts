import {
	parse,
	stringify,
} from 'https://deno.land/std@0.121.0/encoding/toml.ts';
import {
	ancientOs,
	aospExtended,
	AOSPK,
	arrowOs,
	blissroms,
	cherishos,
	crdroid,
	dotos,
	evolutionx,
	grapheneos,
	havocos,
	legion,
	lineages,
	pixelexperience,
	pixelextended,
	pixelUI,
	pixyos,
	potato,
	revenge,
	sakura,
	spark,
	syberia,
	UpdateFunction,
	xiaomieu,
} from './lib/mod.ts';
import { orangefox } from './orangefox.ts';
import { twrp } from './twrp.ts';

const specs = await fetch('https://nowrom.deno.dev/specs').then((r) =>
	r.json()
);

const stored_devices = new Map();

function getDevice(id: string) {
	return stored_devices.get(id?.toLowerCase()) || { roms: [], recoveries: [] };
}

async function run(fn: UpdateFunction) {
	const r = (await fn(stored_devices, getDevice)) as any[];
	if (r) {
		r.forEach((r) => {
			if (!r) return;
			let device = getDevice(r.codename);
			device = {
				...r,
				...device,
			};
			delete device.rom;
			delete device.recovery;
			if (r.rom) device.roms.push(r.rom);
			if (r.recovery) device.recoveries.push(r.recovery);
			device.codename = device.codename.trim();
			stored_devices.set(device.codename.toLowerCase().trim(), device);
		});
	} else {
		console.log({ fn });
	}
}

await Promise.all(
	[...Deno.readDirSync('./static/devices')]
		.filter((x) => x.name.endsWith('.toml'))
		.map(async (x) => {
			try {
				const file = parse(
					await Deno.readTextFile(`./static/devices/${x.name}`)
				);
				//@ts-ignore -
				stored_devices.set(file.codename.toLowerCase(), {
					//@ts-ignore -
					...getDevice(file.codename.toLowerCase()),
					...file,
				});
			} catch (e) {}
		})
);
await Promise.all([
	run(ancientOs),
	run(aospExtended),
	run(AOSPK),
	run(arrowOs),
	run(blissroms),
	run(cherishos),
	run(crdroid),
	run(dotos),
	run(evolutionx),
	run(grapheneos),
	run(havocos),
	run(legion),
	run(lineages),
	// run(paranoid), //; TODO: api currently broken (-:
	run(pixelexperience),
	run(pixelextended),
	run(pixyos),
	run(potato),
	run(pixelUI),
	run(revenge),
	run(sakura),
	run(spark),
	run(evolutionx),
	run(syberia),
	run(xiaomieu),
	run(twrp),
	run(orangefox),
]);
const overwrites = JSON.parse(await Deno.readTextFile('./overwrites.json'));
for (const [k, v] of stored_devices) {
	let overwrite = overwrites[k];

	if (overwrite) {
		const val = stored_devices.get(overwrite) || { roms: [] };
		stored_devices.set(overwrite, {
			...stored_devices.get(k),
			...val,
			roms: [...val.roms, ...stored_devices.get(k)?.roms],
		});
		stored_devices.delete(k);
	}
	overwrite = overwrites[stored_devices.get(k)?.codename];
	if (overwrite) {
		const val = stored_devices.get(overwrite) || { roms: [] };
		stored_devices.set(overwrite.toLowerCase(), {
			...stored_devices.get(k),
			...val,
			codename: overwrite,
			roms: [...val.roms, ...stored_devices.get(k)?.roms],
		});
		stored_devices.delete(k);
	}
}

const android_devices: { brand: string; codename: string; name: string }[] =
	JSON.parse(await Deno.readTextFile('./android_devices.json'));

android_devices.forEach((device) => {
	if (!device.codename) return;
	const dv = stored_devices.get(device?.codename?.toLowerCase());
	if (
		(device.codename.toLowerCase() == 'phoenix' && device.brand == 'Samsung') ||
		(device.codename.toLowerCase() == 'phoenix' && device.brand == 'Nokia')
	)
		return;
	if (dv)
		stored_devices.set(device.codename.toLowerCase(), { ...dv, ...device });
});

for (const spec of specs) {
	const phone = stored_devices.get(spec.codename);
	delete spec.image;
	delete spec.image_downloaded;
	delete spec.codename;
	phone.specs = spec;
}
// for (const x of [...stored_devices.values()]) {
// 	console.log(x.codename, x);
// 	await Deno.writeTextFile(`devices/${x.codename}.toml`, stringify(x));
// }
const sortObject = (obj) =>
	Object.keys(obj)
		.sort()
		.reduce((res, key) => ((res[key] = obj[key]), res), {});
let devices = [...stored_devices.values()]
	.map((v) => {
		v.roms = v.roms.sort((a, b) => {
			let fa = a.id.toLowerCase(),
				fb = b.id.toLowerCase();

			if (fa < fb) {
				return -1;
			}
			if (fa > fb) {
				return 1;
			}
			return 0;
		});
		v.recoveries = v.recoveries.sort((a, b) => {
			let fa = a.id.toLowerCase(),
				fb = b.id.toLowerCase();

			if (fa < fb) {
				return -1;
			}
			if (fa > fb) {
				return 1;
			}
			return 0;
		});
		return sortObject(v);
	})
	.sort((a, b) => {
		let fa = a.codename.toLowerCase(),
			fb = b.codename.toLowerCase();

		if (fa < fb) {
			return -1;
		}
		if (fa > fb) {
			return 1;
		}
		return 0;
	});

await Promise.all(
	devices.map((x) => {
		return Deno.writeTextFile(`devices/${x.codename}.toml`, stringify(x));
	})
);
await Deno.writeTextFile('devices.json', JSON.stringify(devices));
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
