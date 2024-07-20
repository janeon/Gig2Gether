import { c as create_ssr_component, a as subscribe, v as validate_component, j as each, b as add_attribute } from "../../../../../chunks/ssr.js";
import { L as Label } from "../../../../../chunks/Label.js";
import { G as Gallery } from "../../../../../chunks/Gallery.js";
import { U as UploadSidebar } from "../../../../../chunks/UploadSidebar.js";
import "firebase/firestore";
import "firebase/storage";
import "../../../../../chunks/client2.js";
import { p as page } from "../../../../../chunks/stores.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let fileuploadprops = { id: "quest_screenshot" };
  const images = [
    { alt: "ubersc4", src: "../quest4.jpg" },
    { alt: "ubersc3", src: "../quest3.jpg" },
    { alt: "ubersc2", src: "../quest2.jpg" },
    { alt: "ubersc1", src: "../quest1.png" }
  ];
  $$unsubscribe_page();
  return `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"> <div class="flex flex-row"><div class="w-1/4">${validate_component(UploadSidebar, "UploadSidebar").$$render($$result, {}, {}, {})}</div> <div class="w-3/4 rounded-md p-6"><p class="mb-3" data-svelte-h="svelte-zjl7f1">Upload screenshots related to quest options, progress, and details/criteria. Below are a few examples:</p> ${validate_component(Gallery, "Gallery").$$render($$result, { class: "gap-2 grid grid-cols-4" }, {}, {
    default: () => {
      return `${each(images, ({ alt, src }) => {
        return `<div class="w-full h-70 overflow-hidden"><img${add_attribute("src", src, 0)}${add_attribute("alt", alt, 0)} class="object-contain w-full h-full"> </div>`;
      })}`;
    }
  })} <div class="flex justify-start mt-6"><div class="flex flex-col items-center space-y-4 ml-56">${validate_component(Label, "Label").$$render($$result, { class: "pb-2", for: fileuploadprops.id }, {}, {
    default: () => {
      return `Upload file`;
    }
  })} <input${add_attribute("id", fileuploadprops.id, 0)} type="file" autocomplete="off" class="mt-1"> ${``} ${``}</div></div> <div class="flex items-center mt-4 ml-49 text-black cursor-pointer" data-svelte-h="svelte-11tx84z"><i class="fas fa-play fa-2x mr-2"></i> <span>Learn more on how to add files or enter details</span></div></div></div>`;
});
export {
  Page as default
};
