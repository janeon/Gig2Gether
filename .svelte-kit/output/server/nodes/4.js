import * as universal from '../entries/pages/protected/_page.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/protected/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/protected/+page.ts";
export const imports = ["_app/immutable/nodes/4.Dgv8S7bW.js","_app/immutable/chunks/authstore.BS7lpoC_.js","_app/immutable/chunks/control.Bj9uxVgU.js","_app/immutable/chunks/scheduler.D050c3lf.js","_app/immutable/chunks/index.yNdfQLp3.js"];
export const stylesheets = [];
export const fonts = [];
