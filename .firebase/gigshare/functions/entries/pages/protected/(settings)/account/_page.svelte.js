import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import { S as Sidebar_1 } from "../../../../../chunks/Sidebar.js";
import { L as Label } from "../../../../../chunks/Label.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let email = $page.data.user?.email;
  $$unsubscribe_page();
  return `<div class="flex flex-row">${validate_component(Sidebar_1, "Sidebar").$$render($$result, {}, {}, {})} <div class="p-8"><h1 data-svelte-h="svelte-13hwxmh">My Account</h1> <div>${validate_component(Label, "Label").$$render($$result, {}, {}, {
    default: () => {
      return `My Email`;
    }
  })} <p>${escape(email)}</p></div> </div></div>`;
});
export {
  Page as default
};
