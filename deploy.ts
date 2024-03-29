import { serve } from "https://deno.land/std@0.121.0/http/server.ts";
import Fuse from "https://deno.land/x/fuse@v6.4.1/dist/fuse.esm.min.js";
import {
  AugmentedRequest,
  createRouteMap,
  createRouter,
} from "https://deno.land/x/reno@v2.0.70/reno/mod.ts";
import { createClient } from "https://raw.githubusercontent.com/Tricked-dev/supabase-js/f90fcf1a603b695795e99b769e669b63ce79407a/mod.ts";
import { Devices, ROM, Roms } from "./types.ts";
// import { Image } from 'https://deno.land/x/imagescript@1.2.9/mod.ts';
const PORT = 8000;

const devices: Devices[] = JSON.parse(
  await Deno.readTextFile("./devices.json"),
);

function phoneParse(req: AugmentedRequest) {
  const re = [...devices];
  const q = req.queryParams.get("q");
  const brand = req.queryParams.get("brand");
  const limit = req.queryParams.get("limit");
  const codename = req.queryParams.get("codename");
  const updateRe = (ar: any) => {
    re.length = 0;
    re.push(...ar);
  };
  if (q) {
    const fuse = new Fuse(devices, {
      keys: [
        "brand",
        "codename",
        {
          name: "name",
          weight: 2,
        },
      ],
    });
    updateRe(fuse.search(q).map((x) => x.item));
  }
  if (brand) {
    updateRe(re.filter((x) => x.brand?.toLowerCase() === brand.toLowerCase()));
  }
  if (limit && parseInt(limit)) {
    updateRe(re.slice(0, parseInt(limit)));
  }
  if (codename) {
    const r = re.find(
      (x) => x?.codename?.toLowerCase() === codename?.toLowerCase(),
    );
    updateRe(r ? [r] : []);
  }
  const r = new Response(
    JSON.stringify(
      re.map((x) => ({
        codename: x.codename,
        brand: x.brand,
        name: x.name,
        roms: x?.roms?.map?.((x) => x.id),
        recoveries: x?.recoveries?.map?.((x) => x.id),
      })),
    ),
    {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
  return r;
}

export const routes = createRouteMap([
  [
    "/",
    (req) => {
      return phoneParse(req);
    },
  ],
  [
    "/device",
    (req) => {
      return phoneParse(req);
    },
  ],
  [
    "/androids",
    async () => {
      return new Response(await Deno.readFile("android_devices.json"), {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
  ],
  [
    "/roms",
    async () => {
      const r = new Response(await Deno.readFile("./roms.json"), {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      return r;
    },
  ],
  [
    "/img/*",
    (req: Pick<AugmentedRequest, "routeParams">) => {
      const [img] = req.routeParams;
      return Response.redirect(
        `https://hdabbjaktgetmyexzjtf.supabase.in/storage/v1/object/public/devices/${img}`,
      );
      // const [img] = req.routeParams;
      // const [bg, phone] = await Promise.all([
      // 	(async () => {
      // 		let data = await Deno.readFile('Banner.png');

      // 		return await Image.decode(data);
      // 	})(),
      // 	(async () => {
      // 		let phon = await fetch(
      // 			`https://hdabbjaktgetmyexzjtf.supabase.in/storage/v1/object/public/devices/${img}`
      // 		).then((r) => {
      // 			if (r.status !== 200) return undefined;
      // 			else return r.arrayBuffer();
      // 		});

      // 		if (phon) return await Image.decode(phon);
      // 		else return undefined;
      // 	})(),
      // ]);
      // if (!phone)
      // 	return new Response(undefined, {
      // 		status: 400,
      // 	});

      // bg.composite(phone, 600 - phone.width / 2, 50);
      // return new Response(await bg.encode(), {
      // 	status: 200,
      // });
    },
  ],
  [
    "/specs",
    async () => {
      const client = createClient(
        "https://hdabbjaktgetmyexzjtf.supabase.co",
        Deno.env.get("SECRET")!,
      );

      const { data } = await client.from("devices").select("*");
      return new Response(JSON.stringify(data), {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
  ],
  [
    "/device/*",
    async (req: Pick<AugmentedRequest, "routeParams">) => {
      let roms: Roms[] = JSON.parse(await Deno.readTextFile("./roms.json"));

      const device = req.routeParams[0].toLowerCase().split(".")[0];
      const device_data = devices.find(
        (x) => x.codename?.toLowerCase() == device?.toLowerCase(),
      );
      if (!device_data) {
        return new Response(JSON.stringify({}));
      }

      //Filter duplicate roms
      const obj: Record<string, ROM> = {};
      device_data?.roms?.forEach((x) => {
        obj[x.id] = {
          ...(obj[x.id] || {}),
          ...x,
        };
      });
      roms = roms.filter((x) => obj[x.id]);
      device_data.roms = Object.values(obj);
      if (!device_data.specs) {
        (async () => {
          try {
            const client = createClient(
              "https://hdabbjaktgetmyexzjtf.supabase.co",
              Deno.env.get("SECRET")!,
            );

            let { data } = await client
              .from("devices")
              .select("*")
              .eq("codename", device_data.codename.toLowerCase())
              .select("*");
          } catch (_) {
            console.error(_);
          }
        })();
      }
      return new Response(
        JSON.stringify({
          device: device_data,
          roms,
        }),
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
  },
);
