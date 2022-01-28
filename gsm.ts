import { cheerio } from 'https://deno.land/x/cheerio@1.0.4/mod.ts';

export function parsePhoneDataHtml(html: string): Record<string, string> {
	const $ = cheerio.load(html);
	const obj: Record<string, any> = {};
	$('td')
		.filter('.nfo')
		.each((_, x) => {
			const $ = cheerio.load(x);
			if (x.type == 'tag') {
				if (x.attribs['data-spec']) {
					obj[x.attribs['data-spec']] = $.text().trim();
				}
			}
		});
	const keys = new Set([
		'cpu',
		'weight',
		'year',
		'os',
		'chipset',
		'gpu',
		'sensors',
		'batlife',
		'internalmemory',
	]);
	const res: Record<string, string> = {};
	res['image'] = $('.specs-photo-main').find('img').attr('src')!;
	Object.entries(obj).forEach(([k, v]) => {
		if (keys.has(k)) {
			res[k] = v;
		}
	});
	return res;
}
async function getData(url: string): Promise<string> {
	let r = await fetch(url, {
		method: 'get',
		headers: {
			'accept':
				'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'User-Agent':
				'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
		},
	});
	console.log('Status', r.status, r.statusText);
	return await r.text();
}
export async function getPhone(
	n: string
): Promise<Record<string, string | boolean> | undefined> {
	const params = new URLSearchParams();
	params.append('sSearch', n);
	const url = new URL('https://www.gsmarena.com/res.php3');
	url.search = params.toString();
	const r = await getData(url.toString());
	const $ = cheerio.load(r);
	const phoneUrl = $('.makers').find('a').attr('href');

	console.log(phoneUrl);
	if (!phoneUrl) return;
	const string = await getData(`https://www.gsmarena.com/${phoneUrl}`);
	return parsePhoneDataHtml(string);
}
