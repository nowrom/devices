`
git clone https://github.com/syberia-project/official_devices ota/official_devices
git clone https://github.com/Havoc-OS/OTA ota/havocota
git clone https://github.com/crdroidandroid/android_vendor_crDroidOTA ota/android_vendor_crDroidOTA
git clone https://github.com/Spark-Devices/OTA ota/sparkota
git clone https://github.com/PixelExtended/OTA ota/pixelextendedota
git clone https://github.com/LineageOS/lineage_wiki ota/lineage_wiki
git clone https://github.com/PixelExperience/official_devices ota/pixelexperience
git clone https://github.com/AOSPK/official_devices ota/oaspk
git clone https://github.com/RevengeOS-Devices/official_devices ota/revenge
git clone https://github.com/ingbrzy/Xiaomi.eu-MIUIv12-XML-Compare ota/xiaomieu
`;

Promise.all(
	Object.entries({
		'https://github.com/syberia-project/official_devices': 'syberia',
		'https://github.com/Havoc-OS/OTA': 'havocos',
		'https://github.com/crdroidandroid/android_vendor_crDroidOTA': 'crdroid',
		'https://github.com/Spark-Devices/OTA': 'spark',
		'https://github.com/PixelExtended/OTA': 'pixelextended',
		'https://github.com/LineageOS/lineage_wiki': 'lineageos',
		'https://github.com/PixelExperience/official_devices': 'pixelexperience',
		'https://github.com/AOSPK/official_devices': 'oaspk',
		'https://github.com/RevengeOS-Devices/official_devices': 'revengeos',
		'https://github.com/ingbrzy/Xiaomi.eu-MIUIv12-XML-Compare': 'xiaomi',
	}).map(async ([x, y]) => {
		console.log(['git', 'clone', x, `ota/${y}`].join(' '));
		await Deno.run({ cmd: ['git', 'clone', x, `ota/${y}`] }).status();
	})
);
