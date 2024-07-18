import { c as create_ssr_component, a as subscribe, v as validate_component, b as add_attribute } from "../../../../../chunks/ssr.js";
import { B as Button } from "../../../../../chunks/Button.js";
import { U as UploadSidebar } from "../../../../../chunks/UploadSidebar.js";
import "firebase/firestore";
import "firebase/storage";
import "../../../../../chunks/client2.js";
import "papaparse";
import { p as page } from "../../../../../chunks/stores.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let fileuploadprops = { id: "trip_csv" };
  $$unsubscribe_page();
  return `   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"> <div class="flex flex-row"><div class="w-1/4">${validate_component(UploadSidebar, "UploadSidebar").$$render($$result, {}, {}, {})}</div> <div class="w-3/4 rounded-md p-6"><p class="mb-3" data-svelte-h="svelte-y8oszz">Trips information are collected per ride, and both trip offers and summaries can be entered manually or via screenshot uploads.</p> <div class="flex justify-start mt-6"><div class="flex flex-col items-center space-y-4 ml-56"><label class="pb-2"${add_attribute("for", fileuploadprops.id, 0)}>Upload CSV</label> <input${add_attribute("id", fileuploadprops.id, 0)} type="file" accept=".csv" autocomplete="off" class="mt-1"> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "bg-black text-white rounded px-6 py-3",
      size: "xl",
      href: "/protected/trip-screenshot"
    },
    {},
    {
      default: () => {
        return `Upload Screenshots`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "bg-black text-white rounded px-6 py-3",
      size: "xl",
      href: "/protected/manual-trips"
    },
    {},
    {
      default: () => {
        return `Manual Upload`;
      }
    }
  )}</div></div> <div class="flex items-center mt-4 ml-49 text-black cursor-pointer" data-svelte-h="svelte-11tx84z"><i class="fas fa-play fa-2x mr-2"></i> <span>Learn more on how to add files or enter details</span></div></div></div>`;
});
export {
  Page as default
};
