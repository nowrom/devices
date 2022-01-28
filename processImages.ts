import { createClient } from 'https://deno.land/x/supabase/mod.ts';
const client = createClient(
	'https://hdabbjaktgetmyexzjtf.supabase.co',
	Deno.env.get('SECRET')!
);
const devices = client.storage.from('devices');

const codenames = new Set();

const paths = [
	'./ota/oaspk/images/devices',
	'./ota/pixelexperience/images',
	'./ota/lineage_wiki/images/devices',
];

paths.forEach(async (path) => {
	for await (const file of Deno.readDir(path)) {
		if (file.isDirectory) continue;
		const codename = file.name.toLowerCase().split('.')[0];
		if (codenames.has(codename)) continue;
		else codenames.add(codename);
		console.log(
			await devices.pdate(
				file.name.toLowerCase(),
				await Deno.readFile(`${path}/${file.name}`),
				{
					contentType: 'image/png',
				}
			)
		);
	}
});
