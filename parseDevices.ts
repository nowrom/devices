let text = await Deno.readTextFile('out.csv');

// const [columns, ...rows] = text.trim(/\s/g).split('\n');
// const keys = columns.split(',');
// const valuesArray = rows.map((row) => row.split(','));
// const jsonText = valuesArray.map((values) =>
// 	values.reduce((acc, v, i) => {
// 		acc[keys[i]] = v;
// 		return acc;
// 	}, {})
// );
// console.log(jsonText);

// // // return JSON.stringify(jsonText, null, '  ');
// // // }
const devices: Record<string, string>[] = [];
text
	.split('\n')
	.slice(1)
	.forEach((x) => {
		console.log(x);
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
// import papa from 'https://esm.sh/papaparse';
// import iconv from 'https://esm.sh/iconv-lite';
// var devices = {};
// function cleanup(str) {
// 	if (!str) return str;
// 	str = str
// 		.replace(/\\'/g, "'")
// 		.replace(/\\t/g, '')
// 		.replace(/\s\s+/g, ' ')
// 		.trim();
// 	if (str.indexOf('\\x') !== -1) {
// 		var hex = str.split('\\x').slice(1);
// 		var txt = str.split('\\x')[1];
// 		for (var i = 0; i < hex.length; i++) {
// 			var h;
// 			if (hex[i].length > 2) {
// 				h = hex[i].substring(0, 2);
// 			} else {
// 				h = hex[i];
// 			}
// 			txt += String.fromCharCode(parseInt(h, 16));
// 		}
// 		if (hex[hex.length - 1].length !== 2) {
// 			txt += hex[hex.length - 1].substr(2);
// 		}
// 		str = txt;
// 	}
// 	return str;
// }

// // function decodeUTF16LE(binaryStr) {
// // 	var cp = [];
// // 	for (var i = 0; i < binaryStr.length; i += 2) {
// // 		cp.push(binaryStr.charCodeAt(i) | (binaryStr.charCodeAt(i + 1) << 8));
// // 	}

// // 	return String.fromCharCode.apply(String, cp);
// // }
// console.log(decodeUTF16LE(data));
// papa.parse(decodeUTF16LE(data)).data.forEach((parts) => {
// 	if (parts.length === 4) {
// 		if (
// 			parts[0] === 'Samsung' &&
// 			cleanup(parts[1]).toLowerCase().search('chromebook') === -1
// 		) {
// 			if (
// 				cleanup(parts[1])
// 					.toLowerCase()
// 					.search(cleanup(parts[0]).toLowerCase()) !== -1
// 			) {
// 				if (
// 					cleanup(parts[3])
// 						.toLowerCase()
// 						.search(cleanup(parts[1]).toLowerCase()) === -1
// 				) {
// 					devices[parts[3].toLowerCase()] = cleanup(
// 						`\`${parts[2]}\`: ${parts[1]} (${parts[3]})`
// 					);
// 				} else {
// 					devices[parts[3].toLowerCase()] = cleanup(
// 						`\`${parts[2]}\`: ${parts[1]}`
// 					);
// 				}
// 			} else {
// 				if (
// 					cleanup(parts[3])
// 						.toLowerCase()
// 						.search(cleanup(parts[1]).toLowerCase()) === -1
// 				) {
// 					devices[parts[3].toLowerCase()] = cleanup(
// 						`\`${parts[2]}\`: ${parts[0]} ${parts[1]} (${parts[3]})`
// 					);
// 				} else {
// 					devices[parts[3].toLowerCase()] = cleanup(
// 						`\`${parts[2]}\`: ${parts[0]} ${parts[1]}`
// 					);
// 				}
// 			}
// 		}
// 	}
// });
// await Deno.writeTextFile('./sm.json', JSON.stringify(devices, null, 4));

// //Braindead decoder that assumes fully valid input
// function decodeUTF16LE(binaryStr) {
// 	var cp = [];
// 	for (var i = 0; i < binaryStr.length; i += 2) {
// 		cp.push(binaryStr.charCodeAt(i) | (binaryStr.charCodeAt(i + 1) << 8));
// 	}

// 	return String.fromCharCode.apply(String, cp);
// }

// var base64decode = atob; //In chrome and firefox, atob is a native method available for base64 decoding

// var base64 = 'VABlAHMAdABpAG4AZwA';
// var binaryStr = base64decode(base64);
// console.log(data);
// var result = decodeUTF16LE(data);
// console.log(result);
