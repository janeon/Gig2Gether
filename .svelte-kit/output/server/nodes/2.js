

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.Dq8y1koz.js","_app/immutable/chunks/scheduler.DCWCPtl2.js","_app/immutable/chunks/index.Bb8AvSvR.js"];
export const stylesheets = [];
export const fonts = [];
