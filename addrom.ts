import {
	parse,
	stringify,
} from 'https://deno.land/std@0.121.0/encoding/toml.ts';
const name = prompt('name:');
const id = prompt('id:', name?.toLowerCase());
const about = prompt('about:');
const website = prompt('website:');
const wiki = prompt('wiki:');
const download = prompt('download:');

const r = stringify({
	rom: {
		name,
		id,
		about,
		website,
		wiki,
		download,
	},
});
await Deno.writeTextFile(`./roms/${id}.toml`, r);
