import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { s as subscribe } from "../../chunks/utils.js";
import { p as page } from "../../chunks/stores.js";
import "../../chunks/client.js";
import "firebase/auth";
import "firebase/app";
import { a as authUser } from "../../chunks/authstore.js";
const css = {
  code: "nav.svelte-8n7qrd a.active.svelte-8n7qrd{@apply font-bold text-indigo-700;}",
  map: `{"version":3,"file":"Header.svelte","sources":["Header.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { page } from \\"$app/stores\\";\\nimport { goto } from \\"$app/navigation\\";\\nimport { signOut } from \\"firebase/auth\\";\\nimport { auth } from \\"$lib/firebase.client\\";\\nimport { authUser } from \\"$lib/authstore\\";\\nconst handleLogout = () => {\\n  signOut(auth).then(() => {\\n    $authUser = void 0;\\n    goto(\\"/login\\");\\n  }).catch((error) => {\\n    console.log(error);\\n  });\\n};\\n<\/script>\\n\\n<header class=\\"space-y-4\\">\\n\\t<a href=\\"/\\" class=\\"font-bold hover:underline\\">Home</a>\\n\\n\\t<nav class=\\"flex gap-4\\">\\n\\t\\t{#if $authUser}\\n\\t\\t\\t<a\\n\\t\\t\\t\\thref=\\"/protected\\"\\n\\t\\t\\t\\tclass=\\"hover:underline\\"\\n\\t\\t\\t\\tclass:active={$page.url.pathname === '/protected'}>Protected</a\\n\\t\\t\\t>\\n\\t\\t\\t<button class=\\"hover:underline\\" on:click={handleLogout}>Logout</button>\\n\\t\\t{:else}\\n\\t\\t\\t<a href=\\"/register\\" class=\\"hover:underline\\" class:active={$page.url.pathname === '/register'}\\n\\t\\t\\t\\t>Register</a\\n\\t\\t\\t>\\n\\t\\t\\t<a href=\\"/login\\" class=\\"hover:underline\\" class:active={$page.url.pathname === '/login'}\\n\\t\\t\\t\\t>Login</a\\n\\t\\t\\t>\\n\\t\\t{/if}\\n\\t</nav>\\n</header>\\n\\n<style lang=\\"postcss\\">\\n\\tnav a.active {\\n\\t\\t@apply font-bold text-indigo-700;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsCC,iBAAG,CAAC,CAAC,qBAAQ,CACZ,OAAO,SAAS,CAAC,eAAe,CACjC"}`
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authUser, $$unsubscribe_authUser;
  let $page, $$unsubscribe_page;
  $$unsubscribe_authUser = subscribe(authUser, (value) => $authUser = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css);
  $$unsubscribe_authUser();
  $$unsubscribe_page();
  return `<header class="space-y-4"><a href="/" class="font-bold hover:underline" data-svelte-h="svelte-1jgyub8">Home</a> <nav class="flex gap-4 svelte-8n7qrd">${$authUser ? `<a href="/protected" class="${[
    "hover:underline svelte-8n7qrd",
    $page.url.pathname === "/protected" ? "active" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-j904ew">Protected</a> <button class="hover:underline" data-svelte-h="svelte-b1bqh">Logout</button>` : `<a href="/register" class="${[
    "hover:underline svelte-8n7qrd",
    $page.url.pathname === "/register" ? "active" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-1slevov">Register</a> <a href="/login" class="${[
    "hover:underline svelte-8n7qrd",
    $page.url.pathname === "/login" ? "active" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-x0zlq7">Login</a>`}</nav> </header>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main class="p-8 space-y-12 font-serif">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}</main>`;
});
export {
  Layout as default
};
