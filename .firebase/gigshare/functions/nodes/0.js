import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.D7iAR9UC.js","_app/immutable/chunks/4.D81rxgET.js","_app/immutable/chunks/index.DHZf7VPw.js","_app/immutable/chunks/stores.DvPWDyKx.js","_app/immutable/chunks/entry.LwQXGSIa.js"];
export const stylesheets = ["_app/immutable/assets/0.DGVp1pjk.css"];
export const fonts = [];
