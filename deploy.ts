import { serve } from 'https://deno.land/std@0.121.0/http/server.ts';
import Fuse from 'https://deno.land/x/fuse@v6.4.1/dist/fuse.esm.min.js';
import {
	AugmentedRequest,
	createRouteMap,
	createRouter,
} from 'https://deno.land/x/reno@v2.0.22/reno/mod.ts';

const PORT = 8000;

const devices = JSON.parse(await Deno.readTextFile('./devices.json'));

function phoneParse(req: AugmentedRequest) {
	const re = [...devices];
	const q = req.queryParams.get('q');
	const brand = req.queryParams.get('brand');
	const limit = req.queryParams.get('limit');
	const codename = req.queryParams.get('codename');
	const updateRe = (ar: any) => {
		re.length = 0;
		re.push(...ar);
	};
	if (q) {
		const fuse = new Fuse(devices, {
			keys: [
				'brand',
				'codename',
				{
					name: 'name',
					weight: 2,
				},
			],
		});
		updateRe(fuse.search(q).map((x) => x.item));
	}
	if (brand) {
		updateRe(re.filter((x) => x.brand.toLowerCase() === brand.toLowerCase()));
	}
	if (limit && parseInt(limit)) {
		updateRe(re.slice(0, parseInt(limit)));
	}
	if (codename) {
		const r = re.find(
			(x) => x?.codename?.toLowerCase() === codename?.toLowerCase()
		);
		updateRe(r ? [r] : []);
	}
	const r = new Response(JSON.stringify(re), {
		headers: {
			'content-type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	});
	return r;
}

export const routes = createRouteMap([
	[
		'/',
		(req) => {
			return phoneParse(req);
		},
	],
	[
		'/device',
		(req) => {
			return phoneParse(req);
		},
	],
	[
		'/roms',
		async () => {
			const r = new Response(await Deno.readFile('./roms.json'), {
				headers: {
					'content-type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			});
			return r;
		},
	],
	[
		'/img/*',
		(req: Pick<AugmentedRequest, 'routeParams'>) => {
			const [img] = req.routeParams;
			return Response.redirect(
				`https://hdabbjaktgetmyexzjtf.supabase.in/storage/v1/object/public/devices/${img}`,
				307
			);
		},
	],
]);

const router = createRouter(routes);

console.log(`Listening for requests on port ${PORT}...`);

await serve(
	async (req) => {
		try {
			return await router(req);
		} catch (e) {
			return new Response(`WOa ${e}`);
		}
	},
	{
		port: PORT,
	}
);
