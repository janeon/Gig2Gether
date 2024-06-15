import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.CWyIq-GG.js","_app/immutable/chunks/firebase.client.BYc3_XmI.js","_app/immutable/chunks/scheduler.DCWCPtl2.js","_app/immutable/chunks/index.Bb8AvSvR.js","_app/immutable/chunks/stores.BBRuaXhS.js","_app/immutable/chunks/entry.2zjSjI6B.js","_app/immutable/chunks/authstore.BtnQcdCW.js"];
export const stylesheets = ["_app/immutable/assets/0.DGVp1pjk.css"];
export const fonts = [];
