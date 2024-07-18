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
  let fileuploadprops = { id: "quest_csv" };
  $$unsubscribe_page();
  return `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"> <div class="flex flex-row"><div class="w-1/4">${validate_component(UploadSidebar, "UploadSidebar").$$render($$result, {}, {}, {})}</div> <div class="w-3/4 rounded-md p-6"><p class="mb-3" data-svelte-h="svelte-ihj9wl">We are collecting Quest offers to assess their quality, fairness, and achievability across drivers.</p> <p data-svelte-h="svelte-1sekmii">Quests include those that were:</p> <ul class="max-w-md mx-auto space-y-1 list-disc list-inside" data-svelte-h="svelte-1r4kkpz"><li>Received and not accepted</li> <li>Received but not completed</li> <li>Received and completed</li></ul> <p class="mt-4" data-svelte-h="svelte-1g5548b">Quest information can be entered manually or via screenshot uploads.</p> <div class="flex justify-start mt-6"><div class="flex flex-col items-center space-y-4 ml-56"><label class="pb-2"${add_attribute("for", fileuploadprops.id, 0)}>Upload CSV</label> <input${add_attribute("id", fileuploadprops.id, 0)} type="file" accept=".csv" autocomplete="off" class="mt-1"> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "bg-black text-white rounded px-6 py-3",
      size: "xl",
      href: "/protected/quest-screenshot"
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
      href: "/protected/manual-quests"
    },
    {},
    {
      default: () => {
        return `Manual Upload`;
      }
    }
  )}</div></div> <div class="flex items-center mt-4 ml-59 text-black cursor-pointer" data-svelte-h="svelte-k3iify"><i class="fas fa-play fa-2x mr-2"></i> <span>Learn more on how to add files or enter details</span></div></div></div>`;
});
export {
  Page as default
};
