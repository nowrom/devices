export * from './arrowos.ts';
export * from './dotos.ts';
export * from './legion.ts';
export * from './pixelexperience.ts';
export * from './syberia.ts';
export * from './ancientos.ts';
export * from './havocos.ts';
export * from './crdroid.ts';
export * from './ppui.ts';
export * from './aospextended.ts';
export * from './sakura.ts';
export * from './spark.ts';
export * from './pixelextended.ts';
export * from './evolutionx.ts';
export * from './cherishos.ts';
export * from './evolutionx.ts';
export * from './lineages.ts';
export * from './AOSPK.ts';
export * from './potato.ts';
export * from './grapheneos.ts';
export type UpdateFunction = (
	stored_devices: Map<string, any>,
	getDevice: (name: string) => Record<string, any>
) => Promise<unknown> | unknown;
