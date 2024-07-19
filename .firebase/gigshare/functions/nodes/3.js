

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.CJ7KyzPJ.js","_app/immutable/chunks/scheduler.Tn1ca7fi.js","_app/immutable/chunks/index.CSvEDU_A.js","_app/immutable/chunks/entry.-dPbBPsr.js"];
export const stylesheets = ["_app/immutable/assets/3.D1GnfRKq.css","_app/immutable/assets/app.Dv-M9jZN.css"];
export const fonts = [];
