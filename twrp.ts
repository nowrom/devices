import metadata from 'https://esm.sh/markdown-yaml-metadata-parser';
export async function twrp() {
	const twrpDir = 'ota/twrp';
	const oems = [...Deno.readDirSync(`${twrpDir}/_oem`)].map(
		(x) => x.name.split('.')[0]
	);
	const twrps: Record<string, any>[] = [];
	await Promise.all(
		[...Deno.readDirSync(twrpDir)]
			.filter((x) => x.isDirectory)
			.filter((x) => x.name.startsWith('_'))
			.filter((x) => oems.includes(x.name.replace('_', '')))
			.map(async (x) => {
				// console.log(x);
				await Promise.all(
					[...Deno.readDirSync(`${twrpDir}/${x.name}`)].map(async (device) => {
						//@ts-ignore -
						const data: Record<string, string> = metadata(
							await Deno.readTextFile(`${twrpDir}/${x.name}/${device.name}`)
						).metadata;
						//TODO FIGUERE OUT HOW TO MAKE download urls - etc
						// console.log(
						// 	`https://twrp.me/${x.name.replace('_', '')}/${
						// 		data.downloadfolder
						// 	}.html`
						// );
						// console.log('E');
						for (const codename of data.codename.split('/')) {
							twrps.push({
								codename: codename,
								brand: data.oem,
								name: data.title,
								recovery: {
									id: 'twrp',
									xdathread: data.xdathread,
									maintainer: data.maintainer,
								},
							});
						}

						// console.log(data);
						// console.log(data.codename);
					})
				);
			})
	);
	return twrps;
}
await twrp();
// console.log(await twrp());
