import { createClient } from 'https://esm.sh/@supabase/supabase-js';
const client = createClient(
	'https://hdabbjaktgetmyexzjtf.supabase.co',
	Deno.env.get('SECRET')!
);
const devices = client.storage.from('devices');
const codenames = new Set(
	(await devices.list('', {
		limit: 5000,
	}))!.data!.map((x) => x.name.split('.')[0])
);

const paths = [
	'./ota/oaspk/images/devices',
	'./ota/pixelexperience/images',
	'./ota/lineageos/images/devices',
];

paths.forEach(async (path) => {
	for await (const file of Deno.readDir(path)) {
		if (file.isDirectory) continue;
		const codename = file.name.toLowerCase().split('.')[0];
		if (codenames.has(codename)) continue;
		else codenames.add(codename);
		console.log(
			path,
			await devices.upload(
				file.name.toLowerCase(),
				await Deno.readFile(`${path}/${file.name}`),
				{
					contentType: 'image/png',
				}
			)
		);
	}
});

const specs = await fetch('https://nowrom.deno.dev/specs').then((r) =>
	r.json()
);
specs.forEach(async (x: Record<string, string>) => {
	if (!codenames.has(x.codename.toLowerCase())) {
		codenames.add(x.codename.toLowerCase());
		console.log(
			`GSMARENA ${x.codename}`,
			await devices.upload(
				`${x.codename.toLowerCase()}.png`,
				await (await fetch(x.image)).arrayBuffer(),
				{
					contentType: 'image/png',
				}
			)
		);
	}
});
