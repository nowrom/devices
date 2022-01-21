import {
	parse,
	stringify,
} from 'https://deno.land/std@0.121.0/encoding/toml.ts';
import {
	ancientOs,
	aospExtended,
	AOSPK,
	arrowOs,
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
	potato,
	sakura,
	spark,
	syberia,
	UpdateFunction,
} from './lib/mod.ts';

const stored_devices = new Map();

function getDevice(id: string) {
	return stored_devices.get(id?.toLowerCase()) || { roms: [] };
}

async function run(fn: UpdateFunction) {
	const r: any = await fn(stored_devices, getDevice);
	if (r) {
		let device = getDevice(r.codename);
		device = {
			...device,
			...r,
			roms: {
				...r.roms,
				...device.roms,
			},
		};
		stored_devices.set(device.codename.toLowerCase(), device);
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
				stored_devices.set(file.codename.toLowerCase(), file);
			} catch (e) {}
		})
);
await run(ancientOs);
await run(aospExtended);
await run(AOSPK);
await run(arrowOs);
await run(cherishos);
await run(crdroid);
await run(dotos);
await run(evolutionx);
await run(grapheneos);
await run(havocos);
await run(legion);
await run(lineages);
await run(pixelexperience);
await run(pixelextended);
await run(potato);
await run(pixelUI);
await run(sakura);
await run(spark);
await run(evolutionx);
await run(syberia);

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
