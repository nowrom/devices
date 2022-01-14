const devices = Deno.readTextFile('./devices.json');
const port = 4269;
async function handleHttp(conn: Deno.Conn) {
	for await (const e of Deno.serveHttp(conn)) {
		if (new URL(e.request.url).pathname == '/roms') {
			const roms = Deno.readTextFile('./roms.json');
			const r = new Response(await roms, {
				headers: {
					'content-type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			});
			e.respondWith(r);
		} else {
			const r = new Response(await devices, {
				headers: {
					'content-type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			});
			e.respondWith(r);
		}
	}
}
console.log(`Listening http://localhost:${port}`);
for await (const conn of Deno.listen({ port })) {
	handleHttp(conn);
}
