import * as universal from '../entries/pages/protected/_page.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/protected/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/protected/+page.ts";
export const imports = ["_app/immutable/nodes/6.CrfqxaVW.js","_app/immutable/chunks/entry.-RkL-VLZ.js","_app/immutable/chunks/4.D81rxgET.js","_app/immutable/chunks/index.DHZf7VPw.js","_app/immutable/chunks/stores.Dzb8Fe33.js"];
export const stylesheets = [];
export const fonts = [];
