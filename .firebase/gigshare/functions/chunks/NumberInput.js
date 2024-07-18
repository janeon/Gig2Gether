import { c as create_ssr_component, o as compute_rest_props, v as validate_component, g as spread, h as escape_object, b as add_attribute } from "./ssr.js";
import { I as Input } from "./Input.js";
const NumberInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["value"]);
  let { value = 0 } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `${validate_component(Input, "Input").$$render($$result, Object.assign({}, $$restProps), {}, {
    default: ({ props }) => {
      return `<input${spread([escape_object(props), { type: "number" }], {})}${add_attribute("value", value, 0)}>`;
    }
  })} `;
});
export {
  NumberInput as N
};
