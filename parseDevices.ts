let text = await Deno.readTextFile('out.csv');

const devices: Record<string, string>[] = [];
text
	.split('\n')
	.slice(1)
	.forEach((x) => {
		let sploot = x.split(',');
		const brand = sploot[0];
		const name = sploot[1] || sploot[2];
		const codename = sploot[2];
		devices.push({
			brand,
			name,
			codename,
		});
	});
Deno.writeTextFile('android_devices.json', JSON.stringify(devices, null, 2));
