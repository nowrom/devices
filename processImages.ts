import { createClient } from 'https://deno.land/x/supabase/mod.ts';
const client = createClient(
	'https://hdabbjaktgetmyexzjtf.supabase.co',
	Deno.env.get('SECRET')!
);
const devices = client.storage.from('devices');

await Promise.all([
	(async () => {
		const path = './ota/oaspk/images/devices';
		for await (const file of Deno.readDir(path)) {
			if (file.isDirectory) continue;
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
	})(),
	(async () => {
		const path = './ota/pixelexperience/images';
		for await (const file of Deno.readDir(path)) {
			if (file.isDirectory) continue;
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
	})(),
	(async () => {
		const path = './ota/lineage_wiki/images/devices';
		for await (const file of Deno.readDir(path)) {
			if (file.isDirectory) continue;
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
	})(),
]);
