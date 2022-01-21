// async function main() {
// 	const devices = JSON.parse(await Deno.readTextFile('./devices.json'));

// 	for (const device of devices) {
// 		for (const rom of device.roms) {
// 			const process = async (id: string, url: string) => {
// 				if (rom.id == id) {
// 					await fetch(url).then(async (r) => {
// 						console.log(id, device.codename.toLowerCase(), r.status);
// 						if (r.status == 200) {
// 							await Deno.writeFile(
// 								`./images/${device.codename.toLowerCase()}.png`,
// 								new Uint8Array(await r.arrayBuffer())
// 							);
// 						}
// 					});
// 				}
// 			};
// 			if (!device.codename) {
// 				console.log(device);
// 				continue;
// 			}
// 			Promise.all([
// 				process(
// 					'pixelexperience',
// 					`https://raw.githubusercontent.com/PixelExperience/official_devices/master/images/${device.codename}.png`
// 				),
// 			]);
// 		}
// 	}
// }
// await main();
await Promise.all([
	async () => {
		for await (const file of Deno.readDir('./ota/oaspk/images/devices')) {
			if (file.isDirectory) continue;
			await Deno.copyFile(
				`./ota/oaspk/images/devices/${file.name}`,
				`./images/${file.name.toLowerCase()}`
			);
		}
	},
	async () => {
		for await (const file of Deno.readDir('./ota/pixelexperience/images')) {
			if (file.isDirectory) continue;
			await Deno.copyFile(
				`./ota/pixelexperience/images/${file.name}`,
				`./images/${file.name.toLowerCase()}`
			);
		}
	},
	async () => {
		for await (const file of Deno.readDir(
			'./ota/lineage_wiki/images/devices'
		)) {
			if (file.isDirectory) continue;
			await Deno.copyFile(
				`./ota/lineage_wiki/images/devices/${file.name}`,
				`./images/${file.name.toLowerCase()}`
			);
		}
	},
]);
