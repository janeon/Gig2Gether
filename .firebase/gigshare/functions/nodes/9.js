import * as server from '../entries/pages/protected/_page.server.ts.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/protected/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/protected/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.CeUv1Kbu.js","_app/immutable/chunks/scheduler.Tn1ca7fi.js","_app/immutable/chunks/index.CSvEDU_A.js","_app/immutable/chunks/entry.-dPbBPsr.js"];
export const stylesheets = [];
export const fonts = [];
