

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.DP3XkTyQ.js","_app/immutable/chunks/4.D81rxgET.js","_app/immutable/chunks/index.DHZf7VPw.js"];
export const stylesheets = [];
export const fonts = [];
