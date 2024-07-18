import { c as create_ssr_component, o as compute_rest_props, g as spread, h as escape_object, q as escape_attribute_value, j as each, b as add_attribute } from "./ssr.js";
import { twMerge } from "tailwind-merge";
const Gallery = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let divClass;
  let $$restProps = compute_rest_props($$props, ["items", "imgClass"]);
  let { items = [] } = $$props;
  let { imgClass = "h-auto max-w-full rounded-lg" } = $$props;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.imgClass === void 0 && $$bindings.imgClass && imgClass !== void 0)
    $$bindings.imgClass(imgClass);
  divClass = twMerge("grid", $$props.class);
  return `<div${spread([escape_object($$restProps), { class: escape_attribute_value(divClass) }], {})}>${items.length ? each(items, (item) => {
    return `${slots.default ? slots.default({ item }) : ` <div><img${add_attribute("src", item.src, 0)}${add_attribute("alt", item.alt, 0)}${add_attribute("class", twMerge(imgClass, $$props.classImg), 0)}></div> `}`;
  }) : `${slots.default ? slots.default({ item: items[0] }) : ``}`}</div> `;
});
export {
  Gallery as G
};
