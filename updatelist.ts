import {
	parse,
	stringify,
} from 'https://deno.land/std@0.121.0/encoding/toml.ts';
import {
	ancientOs,
	aospExtended,
	arrowOs,
	cherishos,
	crdroid,
	dotos,
	evolutionx,
	havocos,
	legion,
	pixelexperience,
	pixelextended,
	pixelUI,
	sakura,
	spark,
	syberia,
	UpdateFunction,
} from './lib/mod.ts';

const stored_devices = new Map();

function getDevice(id: string) {
	return stored_devices.get(id) || { roms: [] };
}

async function run(fn: UpdateFunction) {
	return await fn(stored_devices, getDevice);
}

await Promise.all(
	[...Deno.readDirSync('./static/devices')]
		.filter((x) => x.name.endsWith('.toml'))
		.map(async (x) => {
			try {
				const file = parse(
					await Deno.readTextFile(`./static/devices/${x.name}`)
				);
				stored_devices.set(file.codename, file);
			} catch (e) {}
		})
);

await run(ancientOs);
await run(aospExtended);
await run(arrowOs);
await run(cherishos);
await run(crdroid);
await run(dotos);
await run(evolutionx);
await run(havocos);
await run(legion);
await run(pixelexperience);
await run(pixelextended);
await run(pixelUI);
await run(sakura);
await run(spark);
await run(evolutionx);
await run(syberia);

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
