

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/protected/demographics/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.BKquT3_G.js","_app/immutable/chunks/4.D81rxgET.js","_app/immutable/chunks/index.DHZf7VPw.js","_app/immutable/chunks/entry.LwQXGSIa.js"];
export const stylesheets = [];
export const fonts = [];
