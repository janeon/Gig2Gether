import * as universal from '../entries/pages/protected/_page.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/protected/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/protected/+page.ts";
export const imports = ["_app/immutable/nodes/4.CM97gd-m.js","_app/immutable/chunks/authstore.BtnQcdCW.js","_app/immutable/chunks/entry.2zjSjI6B.js","_app/immutable/chunks/scheduler.DCWCPtl2.js","_app/immutable/chunks/index.Bb8AvSvR.js","_app/immutable/chunks/stores.BBRuaXhS.js"];
export const stylesheets = [];
export const fonts = [];
