import { c as create_ssr_component, o as compute_rest_props, v as validate_component, g as spread, h as escape_object, a as subscribe, j as each, b as add_attribute } from "../../../../../chunks/ssr.js";
import { L as Label } from "../../../../../chunks/Label.js";
import { twMerge } from "tailwind-merge";
import { I as Input } from "../../../../../chunks/Input.js";
import { G as Gallery } from "../../../../../chunks/Gallery.js";
import { U as UploadSidebar } from "../../../../../chunks/UploadSidebar.js";
import "firebase/firestore";
import "firebase/storage";
import "../../../../../chunks/client2.js";
import { p as page } from "../../../../../chunks/stores.js";
const Fileupload = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["value", "files", "inputClass"]);
  let { value = "" } = $$props;
  let { files = void 0 } = $$props;
  let { inputClass = "border !p-0 dark:text-gray-400" } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.files === void 0 && $$bindings.files && files !== void 0)
    $$bindings.files(files);
  if ($$props.inputClass === void 0 && $$bindings.inputClass && inputClass !== void 0)
    $$bindings.inputClass(inputClass);
  return `${validate_component(Input, "Input").$$render(
    $$result,
    Object.assign({}, $$restProps, {
      class: twMerge(inputClass, $$props.class)
    }),
    {},
    {
      default: ({ props }) => {
        return `<input${spread([{ type: "file" }, escape_object(props)], {})}>`;
      }
    }
  )} `;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let fileuploadprops = { id: "user_avatar" };
  const images = [
    {
      alt: "Profile Screenshot example 1",
      src: "../up-profile1.jpg"
    },
    {
      alt: "Profile Screenshot example 2",
      src: "../up-profile2.jpg"
    }
  ];
  $$unsubscribe_page();
  return `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"> <div class="flex flex-row"><div class="w-1/4">${validate_component(UploadSidebar, "UploadSidebar").$$render($$result, {}, {}, {})}</div> <div class="w-3/4 rounded-md p-6"><p class="mb-3" data-svelte-h="svelte-kkv6sw">After screenshotting your profile, add screenshots</p> <p data-svelte-h="svelte-2t45wm">Here are a couple examples:</p> ${validate_component(Gallery, "Gallery").$$render($$result, { class: "gap-2 grid grid-cols-4" }, {}, {
    default: () => {
      return `${each(images, ({ alt, src }) => {
        return `<div class="w-full h-100 overflow-hidden"><img${add_attribute("src", src, 0)}${add_attribute("alt", alt, 0)} class="object-contain w-full h-full"> </div>`;
      })}`;
    }
  })} <div class="flex justify-start mt-6"><div class="flex flex-col items-center space-y-4 ml-56">${validate_component(Label, "Label").$$render($$result, { class: "pb-2", for: fileuploadprops.id }, {}, {
    default: () => {
      return `Upload file`;
    }
  })} ${validate_component(Fileupload, "Fileupload").$$render($$result, Object.assign({}, fileuploadprops, { autocomplete: "off" }), {}, {})} ${``} ${``}</div></div> <div class="flex items-center mt-4 ml-49 text-black cursor-pointer" data-svelte-h="svelte-mc04fn"><i class="fas fa-play fa-2x mr-2"></i> <span>Learn more on how to add files or enter details</span></div></div></div>`;
});
export {
  Page as default
};
