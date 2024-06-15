import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { s as subscribe } from "../../chunks/utils.js";
import { p as page } from "../../chunks/stores.js";
import { a as authUser } from "../../chunks/authstore.js";
import "../../chunks/client.js";
import "firebase/auth";
import "firebase/app";
import "firebase/firestore";
const WorkerHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<a href="/protected" class="${["hover:underline", $page.url.pathname === "/protected" ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-1umrjmk">Home</a> <button class="hover:underline" data-svelte-h="svelte-b1bqh">Logout</button>`;
});
const PolicymakerHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<a href="/protected" class="${["hover:underline", $page.url.pathname === "/protected" ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-1umrjmk">Home</a> <button class="hover:underline" data-svelte-h="svelte-b1bqh">Logout</button>`;
});
const css = {
  code: "nav.svelte-czrvi4 a.active.svelte-czrvi4{font-weight:700;--tw-text-opacity:1;color:rgb(67 56 202 / var(--tw-text-opacity))\n}",
  map: `{"version":3,"file":"Header.svelte","sources":["Header.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { page } from \\"$app/stores\\";\\nimport { authUser } from \\"$lib/authstore\\";\\nimport WorkerHeader from \\"./WorkerHeader.svelte\\";\\nimport PolicymakerHeader from \\"./PolicymakerHeader.svelte\\";\\n<\/script>\\n\\n<header class=\\"space-y-4 flex justify-center\\">\\n\\t<!-- <a href=\\"/\\" class=\\"font-bold hover:underline\\">Home</a> -->\\n\\n\\t<nav class=\\"flex gap-4\\">\\n\\t\\t{#if $authUser && $authUser.role == \\"worker\\"}\\n\\t\\t\\t<WorkerHeader/>\\n\\t\\t{:else if $authUser && $authUser.role == \\"policymaker\\"}\\n\\t\\t\\t<PolicymakerHeader/>\\n\\t\\t{:else}\\n\\t\\t\\t<a href=\\"/register\\" class=\\"hover:underline text-4xl\\" class:active={$page.url.pathname === '/register'}\\n\\t\\t\\t\\t>Register</a\\n\\t\\t\\t>\\n\\t\\t\\t<a href=\\"/login\\" class=\\"hover:underline text-4xl\\" class:active={$page.url.pathname === '/login'}\\n\\t\\t\\t\\t>Login</a\\n\\t\\t\\t>\\n\\t\\t{/if}\\n\\t</nav>\\n\\n</header>\\n\\n<style lang=\\"postcss\\">\\n\\tnav a.active {\\n    font-weight: 700;\\n    --tw-text-opacity: 1;\\n    color: rgb(67 56 202 / var(--tw-text-opacity))\\n}\\n</style>"],"names":[],"mappings":"AA2BC,iBAAG,CAAC,CAAC,qBAAQ,CACV,WAAW,CAAE,GAAG,CAChB,iBAAiB,CAAE,CAAC,CACpB,KAAK,CAAE,IAAI,EAAE,CAAC,EAAE,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,iBAAiB,CAAC,CAAC;AAClD"}`
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authUser, $$unsubscribe_authUser;
  let $page, $$unsubscribe_page;
  $$unsubscribe_authUser = subscribe(authUser, (value) => $authUser = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css);
  $$unsubscribe_authUser();
  $$unsubscribe_page();
  return `<header class="space-y-4 flex justify-center"> <nav class="flex gap-4 svelte-czrvi4">${$authUser && $authUser.role == "worker" ? `${validate_component(WorkerHeader, "WorkerHeader").$$render($$result, {}, {}, {})}` : `${$authUser && $authUser.role == "policymaker" ? `${validate_component(PolicymakerHeader, "PolicymakerHeader").$$render($$result, {}, {}, {})}` : `<a href="/register" class="${[
    "hover:underline text-4xl svelte-czrvi4",
    $page.url.pathname === "/register" ? "active" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-1rarkbb">Register</a> <a href="/login" class="${[
    "hover:underline text-4xl svelte-czrvi4",
    $page.url.pathname === "/login" ? "active" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-1vnu10b">Login</a>`}`}</nav> </header>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main class="p-8 space-y-12 font-serif"><div class="p-4 rounded-lg">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}</div></main>`;
});
export {
  Layout as default
};
