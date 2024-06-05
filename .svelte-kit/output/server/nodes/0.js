import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.D4a2NA3o.js","_app/immutable/chunks/firebase.client.BOU8wA8g.js","_app/immutable/chunks/index-454a0f5f.yx4CPosL.js","_app/immutable/chunks/scheduler.D050c3lf.js","_app/immutable/chunks/index.yNdfQLp3.js","_app/immutable/chunks/stores.ibP_fi-A.js","_app/immutable/chunks/entry.DuGv2D9f.js","_app/immutable/chunks/control.Bj9uxVgU.js","_app/immutable/chunks/authstore.BS7lpoC_.js"];
export const stylesheets = ["_app/immutable/assets/0.WgBgtXJa.css"];
export const fonts = [];
