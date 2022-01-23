import json from './roms.json' assert { type: 'json' };
console.log(json.map((x) => `- ${x.name}`).join('\n'));
console.log(json.length - 2);
