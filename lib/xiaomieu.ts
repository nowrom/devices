import { UpdateFunction } from './mod.ts';

export const xiaomieu: UpdateFunction = async () => {
	const ota = `./ota/xiaomi/`;
	return await Promise.all(
		[...Deno.readDirSync(ota)]
			.filter((x) => x.isDirectory)
			.filter((x) => !x.name.startsWith('.'))
			.filter((x) => x.name.includes('diff'))
			.filter((x) => x.name.includes('multi'))
			.map(async (x) => {
				return await {
					codename: x.name,
					brand: 'Xiaomi',
					rom: {
						id: 'xiaomieu',
					},
				};
			})
	);
};
