import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.CUt4gYAT.js","_app/immutable/chunks/scheduler.Tn1ca7fi.js","_app/immutable/chunks/index.CSvEDU_A.js","_app/immutable/chunks/entry.Ddf6s1Sl.js","_app/immutable/chunks/stores.SUmdyQM3.js"];
export const stylesheets = ["_app/immutable/assets/app.Dv-M9jZN.css"];
export const fonts = [];
