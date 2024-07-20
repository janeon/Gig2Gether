import { n as noop, c as create_ssr_component, d as add_styles, f as merge_ssr_styles, e as escape, a as subscribe, g as spread, h as escape_object, i as createEventDispatcher, b as add_attribute, v as validate_component, j as each, k as null_to_empty } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import "../../../../../chunks/client2.js";
import { S as Sidebar_1 } from "../../../../../chunks/Sidebar.js";
import "firebase/firestore";
import { L as Label } from "../../../../../chunks/Label.js";
import { I as Input } from "../../../../../chunks/Input.js";
import { N as NumberInput } from "../../../../../chunks/NumberInput.js";
import { w as writable } from "../../../../../chunks/index2.js";
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0)
    raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0)
    raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map(
      (_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i])
    );
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring(value, opts = {}) {
  const store = writable(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = value;
  let target_value = value;
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = now();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = now();
      cancel_task = false;
      task = loop((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: (now2 - last_time) * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = value;
        store.set(value = next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token)
          fulfil();
      });
    });
  }
  const spring2 = {
    set,
    update: (fn, opts2) => set(fn(target_value, value), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
const css$1 = {
  code: "div.svelte-66wdl1{display:inline-block;vertical-align:middle;margin:0 3pt;border-width:calc(1em / 5);border-style:solid;border-radius:50%;animation:var(--duration) infinite svelte-66wdl1-rotate}@keyframes svelte-66wdl1-rotate{100%{transform:rotate(360deg)}}",
  map: '{"version":3,"file":"CircleSpinner.svelte","sources":["CircleSpinner.svelte"],"sourcesContent":["<script>export let color = `cornflowerblue`;\\nexport let duration = `1.5s`;\\nexport let size = `1em`;\\n<\/script>\\n\\n<div\\n  style=\\"--duration: {duration}\\"\\n  style:border-color=\\"{color} transparent {color}\\n  {color}\\"\\n  style:width={size}\\n  style:height={size}\\n/>\\n\\n<style>\\n  div {\\n    display: inline-block;\\n    vertical-align: middle;\\n    margin: 0 3pt;\\n    border-width: calc(1em / 5);\\n    border-style: solid;\\n    border-radius: 50%;\\n    animation: var(--duration) infinite rotate;\\n  }\\n  @keyframes rotate {\\n    100% {\\n      transform: rotate(360deg);\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AAcE,iBAAI,CACF,OAAO,CAAE,YAAY,CACrB,cAAc,CAAE,MAAM,CACtB,MAAM,CAAE,CAAC,CAAC,GAAG,CACb,YAAY,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAC3B,YAAY,CAAE,KAAK,CACnB,aAAa,CAAE,GAAG,CAClB,SAAS,CAAE,IAAI,UAAU,CAAC,CAAC,QAAQ,CAAC,oBACtC,CACA,WAAW,oBAAO,CAChB,IAAK,CACH,SAAS,CAAE,OAAO,MAAM,CAC1B,CACF"}'
};
const CircleSpinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color = `cornflowerblue` } = $$props;
  let { duration = `1.5s` } = $$props;
  let { size = `1em` } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  $$result.css.add(css$1);
  return `<div${add_styles(merge_ssr_styles("--duration: " + escape(duration, true), {
    "border-color": `${color} transparent ${color}
  ${color}`,
    "width": size,
    "height": size
  }))} class="svelte-66wdl1"></div>`;
});
const Wiggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $store, $$unsubscribe_store;
  let { wiggle = false } = $$props;
  let { angle = 0 } = $$props;
  let { scale = 1 } = $$props;
  let { dx = 0 } = $$props;
  let { dy = 0 } = $$props;
  let { duration = 200 } = $$props;
  let { stiffness = 0.05 } = $$props;
  let { damping = 0.1 } = $$props;
  let rest_state = { angle: 0, scale: 1, dx: 0, dy: 0 };
  let store = spring(rest_state, { stiffness, damping });
  $$unsubscribe_store = subscribe(store, (value) => $store = value);
  if ($$props.wiggle === void 0 && $$bindings.wiggle && wiggle !== void 0)
    $$bindings.wiggle(wiggle);
  if ($$props.angle === void 0 && $$bindings.angle && angle !== void 0)
    $$bindings.angle(angle);
  if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0)
    $$bindings.scale(scale);
  if ($$props.dx === void 0 && $$bindings.dx && dx !== void 0)
    $$bindings.dx(dx);
  if ($$props.dy === void 0 && $$bindings.dy && dy !== void 0)
    $$bindings.dy(dy);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.stiffness === void 0 && $$bindings.stiffness && stiffness !== void 0)
    $$bindings.stiffness(stiffness);
  if ($$props.damping === void 0 && $$bindings.damping && damping !== void 0)
    $$bindings.damping(damping);
  {
    if (wiggle)
      setTimeout(() => wiggle = false, duration);
  }
  {
    store.set(wiggle ? { scale, angle, dx, dy } : rest_state);
  }
  $$unsubscribe_store();
  return `<span${add_styles({
    "transform": `rotate(${$store.angle}deg) scale(${$store.scale}) translate(${$store.dx}px,
  ${$store.dy}px)`
  })}>${slots.default ? slots.default({}) : ``}</span>`;
});
const ChevronExpand = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread([escape_object($$props), { fill: "currentColor" }, { viewBox: "0 0 16 16" }], {})}><path d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"></path></svg>`;
});
const Cross = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread([escape_object($$props), { viewBox: "0 0 24 24" }, { fill: "currentColor" }], {})}><path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path></svg> `;
});
const Disabled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ` <svg${spread([escape_object($$props), { viewBox: "0 0 24 24" }, { fill: "currentColor" }], {})}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Zm-4.906-3.68L18.32 7.094A8 8 0 0 1 7.094 18.32ZM5.68 16.906A8 8 0 0 1 16.906 5.68L5.68 16.906Z"></path></svg>`;
});
const get_label = (opt) => {
  if (opt instanceof Object) {
    if (opt.label === void 0) {
      console.error(`MultiSelect option ${JSON.stringify(opt)} is an object but has no label key`);
    }
    return opt.label;
  }
  return `${opt}`;
};
function get_style(option, key = null) {
  let css_str = ``;
  if (![`selected`, `option`, null].includes(key)) {
    console.error(`MultiSelect: Invalid key=${key} for get_style`);
  }
  if (typeof option == `object` && option.style) {
    if (typeof option.style == `string`) {
      css_str = option.style;
    }
    if (typeof option.style == `object`) {
      if (key && key in option.style)
        return option.style[key] ?? ``;
      else {
        console.error(`Invalid style object for option=${JSON.stringify(option)}`);
      }
    }
  }
  if (css_str.trim() && !css_str.trim().endsWith(`;`))
    css_str += `;`;
  return css_str;
}
const css = {
  code: ".svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect){position:relative;align-items:center;display:flex;cursor:text;box-sizing:border-box;border:var(--sms-border, 1pt solid lightgray);border-radius:var(--sms-border-radius, 3pt);background:var(--sms-bg);width:var(--sms-width);max-width:var(--sms-max-width);padding:var(--sms-padding, 0 3pt);color:var(--sms-text-color);font-size:var(--sms-font-size, inherit);min-height:var(--sms-min-height, 22pt);margin:var(--sms-margin)}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect.open){z-index:var(--sms-open-z-index, 4)}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect:focus-within){border:var(--sms-focus-border, 1pt solid var(--sms-active-color, cornflowerblue))}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect.disabled){background:var(--sms-disabled-bg, lightgray);cursor:not-allowed}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect > ul.selected){display:flex;flex:1;padding:0;margin:0;flex-wrap:wrap}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect > ul.selected > li){align-items:center;border-radius:3pt;display:flex;margin:2pt;line-height:normal;transition:0.3s;white-space:nowrap;background:var(--sms-selected-bg, rgba(0, 0, 0, 0.15));padding:var(--sms-selected-li-padding, 1pt 5pt);color:var(--sms-selected-text-color, var(--sms-text-color))}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect > ul.selected > li[draggable='true']){cursor:grab}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect > ul.selected > li.active){background:var(--sms-li-active-bg, var(--sms-active-color, rgba(0, 0, 0, 0.15)))}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect button){border-radius:50%;display:flex;transition:0.2s;color:inherit;background:transparent;border:none;cursor:pointer;outline:none;padding:0;margin:0 0 0 3pt}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect button.remove-all){margin:0 3pt}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(ul.selected > li button:hover, button.remove-all:hover, button:focus){color:var(--sms-remove-btn-hover-color, lightskyblue);background:var(--sms-remove-btn-hover-bg, rgba(0, 0, 0, 0.2))}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect input){margin:auto 0;padding:0}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect > ul.selected > input){border:none;outline:none;background:none;flex:1;min-width:2em;color:var(--sms-text-color);font-size:inherit;cursor:inherit;border-radius:0}div.multiselect.svelte-1v0qqru>ul.selected.svelte-1v0qqru>input.svelte-1v0qqru::-moz-placeholder{padding-left:5pt;color:var(--sms-placeholder-color);opacity:var(--sms-placeholder-opacity)}div.multiselect.svelte-1v0qqru>ul.selected.svelte-1v0qqru>input.svelte-1v0qqru::placeholder{padding-left:5pt;color:var(--sms-placeholder-color);opacity:var(--sms-placeholder-opacity)}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect > input.form-control){width:2em;position:absolute;background:transparent;border:none;outline:none;z-index:-1;opacity:0;pointer-events:none}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect > ul.options){list-style:none;top:100%;left:0;width:100%;position:absolute;overflow:auto;transition:all 0.2s;box-sizing:border-box;background:var(--sms-options-bg, white);max-height:var(--sms-options-max-height, 50vh);overscroll-behavior:var(--sms-options-overscroll, none);box-shadow:var(--sms-options-shadow, 0 0 14pt -8pt black);border:var(--sms-options-border);border-width:var(--sms-options-border-width);border-radius:var(--sms-options-border-radius, 1ex);padding:var(--sms-options-padding);margin:var(--sms-options-margin, inherit)}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect > ul.options.hidden){visibility:hidden;opacity:0;transform:translateY(50px)}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect > ul.options > li){padding:3pt 2ex;cursor:pointer;scroll-margin:var(--sms-options-scroll-margin, 100px)}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect > ul.options .user-msg){display:block;padding:3pt 2ex}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect > ul.options > li.selected){background:var(--sms-li-selected-bg);color:var(--sms-li-selected-color)}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect > ul.options > li.active){background:var(--sms-li-active-bg, var(--sms-active-color, rgba(0, 0, 0, 0.15)))}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(div.multiselect > ul.options > li.disabled){cursor:not-allowed;background:var(--sms-li-disabled-bg, #f5f5f6);color:var(--sms-li-disabled-text, #b8b8b8)}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru:where(span.max-select-msg){padding:0 3pt}.svelte-1v0qqru.svelte-1v0qqru.svelte-1v0qqru::highlight(sms-search-matches){color:mediumaquamarine}",
  map: '{"version":3,"file":"MultiSelect.svelte","sources":["MultiSelect.svelte"],"sourcesContent":["<script>import { createEventDispatcher, tick } from \'svelte\';\\nimport { flip } from \'svelte/animate\';\\nimport CircleSpinner from \'./CircleSpinner.svelte\';\\nimport Wiggle from \'./Wiggle.svelte\';\\nimport { CrossIcon, DisabledIcon, ExpandIcon } from \'./icons\';\\nimport { get_label, get_style } from \'./utils\';\\nexport let activeIndex = null;\\nexport let activeOption = null;\\nexport let createOptionMsg = `Create this option...`;\\nexport let allowUserOptions = false;\\nexport let allowEmpty = false; // added for https://github.com/janosh/svelte-multiselect/issues/192\\nexport let autocomplete = `off`;\\nexport let autoScroll = true;\\nexport let breakpoint = 800; // any screen with more horizontal pixels is considered desktop, below is mobile\\nexport let defaultDisabledTitle = `This option is disabled`;\\nexport let disabled = false;\\nexport let disabledInputTitle = `This input is disabled`;\\n// prettier-ignore\\nexport let duplicateOptionMsg = `This option is already selected`;\\nexport let duplicates = false; // whether to allow duplicate options\\n// takes two options and returns true if they are equal\\n// case-insensitive equality comparison after string coercion and looks only at the `label` key of object options by default\\nexport let key = (opt) => `${get_label(opt)}`.toLowerCase();\\nexport let filterFunc = (opt, searchText) => {\\n    if (!searchText)\\n        return true;\\n    return `${get_label(opt)}`.toLowerCase().includes(searchText.toLowerCase());\\n};\\nexport let closeDropdownOnSelect = `desktop`;\\nexport let form_input = null;\\nexport let highlightMatches = true;\\nexport let id = null;\\nexport let input = null;\\nexport let inputClass = ``;\\nexport let inputStyle = null;\\nexport let inputmode = null;\\nexport let invalid = false;\\nexport let liActiveOptionClass = ``;\\nexport let liActiveUserMsgClass = ``;\\nexport let liOptionClass = ``;\\nexport let liOptionStyle = null;\\nexport let liSelectedClass = ``;\\nexport let liSelectedStyle = null;\\nexport let liUserMsgClass = ``;\\nexport let loading = false;\\nexport let matchingOptions = [];\\nexport let maxOptions = undefined;\\nexport let maxSelect = null; // null means there is no upper limit for selected.length\\nexport let maxSelectMsg = (current, max) => (max > 1 ? `${current}/${max}` : ``);\\nexport let maxSelectMsgClass = ``;\\nexport let name = null;\\nexport let noMatchingOptionsMsg = `No matching options`;\\nexport let open = false;\\nexport let options;\\nexport let outerDiv = null;\\nexport let outerDivClass = ``;\\nexport let parseLabelsAsHtml = false; // should not be combined with allowUserOptions!\\nexport let pattern = null;\\nexport let placeholder = null;\\nexport let removeAllTitle = `Remove all`;\\nexport let removeBtnTitle = `Remove`;\\nexport let minSelect = null; // null means there is no lower limit for selected.length\\nexport let required = false;\\nexport let resetFilterOnAdd = true;\\nexport let searchText = ``;\\nexport let selected = options\\n    ?.filter((opt) => opt instanceof Object && opt?.preselected)\\n    .slice(0, maxSelect ?? undefined) ?? []; // don\'t allow more than maxSelect preselected options\\nexport let sortSelected = false;\\nexport let selectedOptionsDraggable = !sortSelected;\\nexport let style = null;\\nexport let ulOptionsClass = ``;\\nexport let ulSelectedClass = ``;\\nexport let ulSelectedStyle = null;\\nexport let ulOptionsStyle = null;\\nexport let value = null;\\nconst selected_to_value = (selected) => {\\n    value = maxSelect === 1 ? selected[0] ?? null : selected;\\n};\\nconst value_to_selected = (value) => {\\n    if (maxSelect === 1)\\n        selected = value ? [value] : [];\\n    else\\n        selected = value ?? [];\\n};\\n// if maxSelect=1, value is the single item in selected (or null if selected is empty)\\n// this solves both https://github.com/janosh/svelte-multiselect/issues/86 and\\n// https://github.com/janosh/svelte-multiselect/issues/136\\n$: selected_to_value(selected);\\n$: value_to_selected(value);\\nlet wiggle = false; // controls wiggle animation when user tries to exceed maxSelect\\nif (!(options?.length > 0)) {\\n    if (allowUserOptions || loading || disabled || allowEmpty) {\\n        options = []; // initializing as array avoids errors when component mounts\\n    }\\n    else {\\n        // error on empty options if user is not allowed to create custom options and loading is false\\n        // and component is not disabled and allowEmpty is false\\n        console.error(`MultiSelect received no options`);\\n    }\\n}\\nif (maxSelect !== null && maxSelect < 1) {\\n    console.error(`MultiSelect\'s maxSelect must be null or positive integer, got ${maxSelect}`);\\n}\\nif (!Array.isArray(selected)) {\\n    console.error(`MultiSelect\'s selected prop should always be an array, got ${selected}`);\\n}\\nif (maxSelect && typeof required === `number` && required > maxSelect) {\\n    console.error(`MultiSelect maxSelect=${maxSelect} < required=${required}, makes it impossible for users to submit a valid form`);\\n}\\nif (parseLabelsAsHtml && allowUserOptions) {\\n    console.warn(`Don\'t combine parseLabelsAsHtml and allowUserOptions. It\'s susceptible to XSS attacks!`);\\n}\\nif (sortSelected && selectedOptionsDraggable) {\\n    console.warn(`MultiSelect\'s sortSelected and selectedOptionsDraggable should not be combined as any ` +\\n        `user re-orderings of selected options will be undone by sortSelected on component re-renders.`);\\n}\\nif (allowUserOptions && !createOptionMsg && createOptionMsg !== null) {\\n    console.error(`MultiSelect has allowUserOptions=${allowUserOptions} but createOptionMsg=${createOptionMsg} is falsy. ` +\\n        `This prevents the \\"Add option\\" <span> from showing up, resulting in a confusing user experience.`);\\n}\\nif (maxOptions &&\\n    (typeof maxOptions != `number` || maxOptions < 0 || maxOptions % 1 != 0)) {\\n    console.error(`MultiSelect\'s maxOptions must be undefined or a positive integer, got ${maxOptions}`);\\n}\\nconst dispatch = createEventDispatcher();\\nlet option_msg_is_active = false; // controls active state of <li>{createOptionMsg}</li>\\nlet window_width;\\n// options matching the current search text\\n$: matchingOptions = options.filter((opt) => filterFunc(opt, searchText) &&\\n    // remove already selected options from dropdown list unless duplicate selections are allowed\\n    (!selected.map(key).includes(key(opt)) || duplicates));\\n// raise if matchingOptions[activeIndex] does not yield a value\\nif (activeIndex !== null && !matchingOptions[activeIndex]) {\\n    throw `Run time error, activeIndex=${activeIndex} is out of bounds, matchingOptions.length=${matchingOptions.length}`;\\n}\\n// update activeOption when activeIndex changes\\n$: activeOption = matchingOptions[activeIndex ?? -1] ?? null;\\n// add an option to selected list\\nfunction add(option, event) {\\n    if (maxSelect && maxSelect > 1 && selected.length >= maxSelect)\\n        wiggle = true;\\n    if (!isNaN(Number(option)) && typeof selected.map(get_label)[0] === `number`) {\\n        option = Number(option); // convert to number if possible\\n    }\\n    const is_duplicate = selected.map(key).includes(key(option));\\n    if ((maxSelect === null || maxSelect === 1 || selected.length < maxSelect) &&\\n        (duplicates || !is_duplicate)) {\\n        if (!options.includes(option) && // first check if we find option in the options list\\n            // this has the side-effect of not allowing to user to add the same\\n            // custom option twice in append mode\\n            [true, `append`].includes(allowUserOptions) &&\\n            searchText.length > 0) {\\n            // user entered text but no options match, so if allowUserOptions = true | \'append\', we create\\n            // a new option from the user-entered text\\n            if (typeof options[0] === `object`) {\\n                // if 1st option is an object, we create new option as object to keep type homogeneity\\n                option = { label: searchText };\\n            }\\n            else {\\n                if ([`number`, `undefined`].includes(typeof options[0]) &&\\n                    !isNaN(Number(searchText))) {\\n                    // create new option as number if it parses to a number and 1st option is also number or missing\\n                    option = Number(searchText);\\n                }\\n                else {\\n                    option = searchText; // else create custom option as string\\n                }\\n                dispatch(`create`, { option });\\n            }\\n            if (allowUserOptions === `append`)\\n                options = [...options, option];\\n        }\\n        if (resetFilterOnAdd)\\n            searchText = ``; // reset search string on selection\\n        if ([``, undefined, null].includes(option)) {\\n            console.error(`MultiSelect: encountered falsy option ${option}`);\\n            return;\\n        }\\n        if (maxSelect === 1) {\\n            // for maxSelect = 1 we always replace current option with new one\\n            selected = [option];\\n        }\\n        else {\\n            selected = [...selected, option];\\n            if (sortSelected === true) {\\n                selected = selected.sort((op1, op2) => {\\n                    const [label1, label2] = [get_label(op1), get_label(op2)];\\n                    // coerce to string if labels are numbers\\n                    return `${label1}`.localeCompare(`${label2}`);\\n                });\\n            }\\n            else if (typeof sortSelected === `function`) {\\n                selected = selected.sort(sortSelected);\\n            }\\n        }\\n        const reached_max_select = selected.length === maxSelect;\\n        const dropdown_should_close = closeDropdownOnSelect === true ||\\n            (closeDropdownOnSelect === `desktop` && window_width < breakpoint);\\n        if (reached_max_select || dropdown_should_close) {\\n            close_dropdown(event);\\n        }\\n        else if (!dropdown_should_close) {\\n            input?.focus();\\n        }\\n        dispatch(`add`, { option });\\n        dispatch(`change`, { option, type: `add` });\\n        invalid = false; // reset error status whenever new items are selected\\n        form_input?.setCustomValidity(``);\\n    }\\n}\\n// remove an option from selected list\\nfunction remove(to_remove) {\\n    if (selected.length === 0)\\n        return;\\n    const idx = selected.findIndex((opt) => key(opt) === key(to_remove));\\n    let [option] = selected.splice(idx, 1); // remove option from selected list\\n    if (option === undefined && allowUserOptions) {\\n        // if option with label could not be found but allowUserOptions is truthy,\\n        // assume it was created by user and create corresponding option object\\n        // on the fly for use as event payload\\n        const other_ops_type = typeof options[0];\\n        option = (other_ops_type ? { label: to_remove } : to_remove);\\n    }\\n    if (option === undefined) {\\n        return console.error(`Multiselect can\'t remove selected option ${JSON.stringify(to_remove)}, not found in selected list`);\\n    }\\n    selected = [...selected]; // trigger Svelte rerender\\n    invalid = false; // reset error status whenever items are removed\\n    form_input?.setCustomValidity(``);\\n    dispatch(`remove`, { option });\\n    dispatch(`change`, { option, type: `remove` });\\n}\\nfunction open_dropdown(event) {\\n    if (disabled)\\n        return;\\n    open = true;\\n    if (!(event instanceof FocusEvent)) {\\n        // avoid double-focussing input when event that opened dropdown was already input FocusEvent\\n        input?.focus();\\n    }\\n    dispatch(`open`, { event });\\n}\\nfunction close_dropdown(event) {\\n    open = false;\\n    input?.blur();\\n    activeIndex = null;\\n    dispatch(`close`, { event });\\n}\\n// handle all keyboard events this component receives\\nasync function handle_keydown(event) {\\n    // on escape or tab out of input: close options dropdown and reset search text\\n    if (event.key === `Escape` || event.key === `Tab`) {\\n        close_dropdown(event);\\n        searchText = ``;\\n    }\\n    // on enter key: toggle active option and reset search text\\n    else if (event.key === `Enter`) {\\n        event.preventDefault(); // prevent enter key from triggering form submission\\n        if (activeOption) {\\n            selected.includes(activeOption) ? remove(activeOption) : add(activeOption, event);\\n            searchText = ``;\\n        }\\n        else if (allowUserOptions && searchText.length > 0) {\\n            // user entered text but no options match, so if allowUserOptions is truthy, we create new option\\n            add(searchText, event);\\n        }\\n        // no active option and no search text means the options dropdown is closed\\n        // in which case enter means open it\\n        else\\n            open_dropdown(event);\\n    }\\n    // on up/down arrow keys: update active option\\n    else if ([`ArrowDown`, `ArrowUp`].includes(event.key)) {\\n        // if no option is active yet, but there are matching options, make first one active\\n        if (activeIndex === null && matchingOptions.length > 0) {\\n            activeIndex = 0;\\n            return;\\n        }\\n        else if (allowUserOptions && !matchingOptions.length && searchText.length > 0) {\\n            // if allowUserOptions is truthy and user entered text but no options match, we make\\n            // <li>{addUserMsg}</li> active on keydown (or toggle it if already active)\\n            option_msg_is_active = !option_msg_is_active;\\n            return;\\n        }\\n        else if (activeIndex === null) {\\n            // if no option is active and no options are matching, do nothing\\n            return;\\n        }\\n        event.preventDefault();\\n        // if none of the above special cases apply, we make next/prev option\\n        // active with wrap around at both ends\\n        const increment = event.key === `ArrowUp` ? -1 : 1;\\n        activeIndex = (activeIndex + increment) % matchingOptions.length;\\n        // in JS % behaves like remainder operator, not real modulo, so negative numbers stay negative\\n        // need to do manual wrap around at 0\\n        if (activeIndex < 0)\\n            activeIndex = matchingOptions.length - 1;\\n        if (autoScroll) {\\n            await tick();\\n            const li = document.querySelector(`ul.options > li.active`);\\n            if (li)\\n                li.scrollIntoViewIfNeeded?.();\\n        }\\n    }\\n    // on backspace key: remove last selected option\\n    else if (event.key === `Backspace` && selected.length > 0 && !searchText) {\\n        remove(selected.at(-1));\\n    }\\n    // make first matching option active on any keypress (if none of the above special cases match)\\n    else if (matchingOptions.length > 0) {\\n        activeIndex = 0;\\n    }\\n}\\nfunction remove_all() {\\n    dispatch(`removeAll`, { options: selected });\\n    dispatch(`change`, { options: selected, type: `removeAll` });\\n    selected = [];\\n    searchText = ``;\\n}\\n$: is_selected = (label) => selected.map(get_label).includes(label);\\nconst if_enter_or_space = (handler) => (event) => {\\n    if ([`Enter`, `Space`].includes(event.code)) {\\n        event.preventDefault();\\n        handler();\\n    }\\n};\\nfunction on_click_outside(event) {\\n    if (outerDiv && !outerDiv.contains(event.target)) {\\n        close_dropdown(event);\\n    }\\n}\\nlet drag_idx = null;\\n// event handlers enable dragging to reorder selected options\\nconst drop = (target_idx) => (event) => {\\n    if (!event.dataTransfer)\\n        return;\\n    event.dataTransfer.dropEffect = `move`;\\n    const start_idx = parseInt(event.dataTransfer.getData(`text/plain`));\\n    const new_selected = [...selected];\\n    if (start_idx < target_idx) {\\n        new_selected.splice(target_idx + 1, 0, new_selected[start_idx]);\\n        new_selected.splice(start_idx, 1);\\n    }\\n    else {\\n        new_selected.splice(target_idx, 0, new_selected[start_idx]);\\n        new_selected.splice(start_idx + 1, 1);\\n    }\\n    selected = new_selected;\\n    drag_idx = null;\\n};\\nconst dragstart = (idx) => (event) => {\\n    if (!event.dataTransfer)\\n        return;\\n    // only allow moving, not copying (also affects the cursor during drag)\\n    event.dataTransfer.effectAllowed = `move`;\\n    event.dataTransfer.dropEffect = `move`;\\n    event.dataTransfer.setData(`text/plain`, `${idx}`);\\n};\\nlet ul_options;\\n// highlight text matching user-entered search text in available options\\nfunction highlight_matching_options(event) {\\n    if (!highlightMatches || typeof CSS == `undefined` || !CSS.highlights)\\n        return; // abort if CSS highlight API not supported\\n    // clear previous ranges from HighlightRegistry\\n    CSS.highlights.clear();\\n    // get input\'s search query\\n    const query = event?.target?.value.trim().toLowerCase();\\n    if (!query)\\n        return;\\n    const tree_walker = document.createTreeWalker(ul_options, NodeFilter.SHOW_TEXT, {\\n        acceptNode: (node) => {\\n            // don\'t highlight text in the \\"no matching options\\" message\\n            if (node?.textContent === noMatchingOptionsMsg)\\n                return NodeFilter.FILTER_REJECT;\\n            return NodeFilter.FILTER_ACCEPT;\\n        },\\n    });\\n    const text_nodes = [];\\n    let current_node = tree_walker.nextNode();\\n    while (current_node) {\\n        text_nodes.push(current_node);\\n        current_node = tree_walker.nextNode();\\n    }\\n    // iterate over all text nodes and find matches\\n    const ranges = text_nodes.map((el) => {\\n        const text = el.textContent?.toLowerCase();\\n        const indices = [];\\n        let start_pos = 0;\\n        while (text && start_pos < text.length) {\\n            const index = text.indexOf(query, start_pos);\\n            if (index === -1)\\n                break;\\n            indices.push(index);\\n            start_pos = index + query.length;\\n        }\\n        // create range object for each str found in the text node\\n        return indices.map((index) => {\\n            const range = new Range();\\n            range.setStart(el, index);\\n            range.setEnd(el, index + query.length);\\n            return range;\\n        });\\n    });\\n    // create Highlight object from ranges and add to registry\\n    CSS.highlights.set(`sms-search-matches`, new Highlight(...ranges.flat()));\\n}\\n// reset form validation when required prop changes\\n// https://github.com/janosh/svelte-multiselect/issues/285\\n$: required, form_input?.setCustomValidity(``);\\n<\/script>\\n\\n<svelte:window\\n  on:click={on_click_outside}\\n  on:touchstart={on_click_outside}\\n  bind:innerWidth={window_width}\\n/>\\n\\n<div\\n  bind:this={outerDiv}\\n  class:disabled\\n  class:single={maxSelect === 1}\\n  class:open\\n  class:invalid\\n  class=\\"multiselect {outerDivClass}\\"\\n  on:mouseup|stopPropagation={open_dropdown}\\n  title={disabled ? disabledInputTitle : null}\\n  data-id={id}\\n  role=\\"searchbox\\"\\n  tabindex=\\"-1\\"\\n  {style}\\n>\\n  <!-- form control input invisible to the user, only purpose is to abort form submission if this component fails data validation -->\\n  <!-- bind:value={selected} prevents form submission if required prop is true and no options are selected -->\\n  <input\\n    {name}\\n    {required}\\n    value={selected.length >= Number(required) ? JSON.stringify(selected) : null}\\n    tabindex=\\"-1\\"\\n    aria-hidden=\\"true\\"\\n    aria-label=\\"ignore this, used only to prevent form submission if select is required but empty\\"\\n    class=\\"form-control\\"\\n    bind:this={form_input}\\n    on:invalid={() => {\\n      invalid = true\\n      let msg\\n      if (maxSelect && maxSelect > 1 && Number(required) > 1) {\\n        msg = `Please select between ${required} and ${maxSelect} options`\\n      } else if (Number(required) > 1) {\\n        msg = `Please select at least ${required} options`\\n      } else {\\n        msg = `Please select an option`\\n      }\\n      form_input?.setCustomValidity(msg)\\n    }}\\n  />\\n  <slot name=\\"expand-icon\\" {open}>\\n    <ExpandIcon width=\\"15px\\" style=\\"min-width: 1em; padding: 0 1pt; cursor: pointer;\\" />\\n  </slot>\\n  <ul\\n    class=\\"selected {ulSelectedClass}\\"\\n    aria-label=\\"selected options\\"\\n    style={ulSelectedStyle}\\n  >\\n    {#each selected as option, idx (duplicates ? [key(option), idx] : key(option))}\\n      <li\\n        class={liSelectedClass}\\n        role=\\"option\\"\\n        aria-selected=\\"true\\"\\n        animate:flip={{ duration: 100 }}\\n        draggable={selectedOptionsDraggable && !disabled && selected.length > 1}\\n        on:dragstart={dragstart(idx)}\\n        on:drop|preventDefault={drop(idx)}\\n        on:dragenter={() => (drag_idx = idx)}\\n        on:dragover|preventDefault\\n        class:active={drag_idx === idx}\\n        style=\\"{get_style(option, `selected`)} {liSelectedStyle}\\"\\n      >\\n        <!-- on:dragover|preventDefault needed for the drop to succeed https://stackoverflow.com/a/31085796 -->\\n        <slot name=\\"selected\\" {option} {idx}>\\n          <slot {option} {idx}>\\n            {#if parseLabelsAsHtml}\\n              {@html get_label(option)}\\n            {:else}\\n              {get_label(option)}\\n            {/if}\\n          </slot>\\n        </slot>\\n        {#if !disabled && (minSelect === null || selected.length > minSelect)}\\n          <button\\n            on:mouseup|stopPropagation={() => remove(option)}\\n            on:keydown={if_enter_or_space(() => remove(option))}\\n            type=\\"button\\"\\n            title=\\"{removeBtnTitle} {get_label(option)}\\"\\n            class=\\"remove\\"\\n          >\\n            <slot name=\\"remove-icon\\">\\n              <CrossIcon width=\\"15px\\" />\\n            </slot>\\n          </button>\\n        {/if}\\n      </li>\\n    {/each}\\n    <input\\n      class={inputClass}\\n      style={inputStyle}\\n      bind:this={input}\\n      bind:value={searchText}\\n      on:mouseup|self|stopPropagation={open_dropdown}\\n      on:keydown|stopPropagation={handle_keydown}\\n      on:focus\\n      on:focus={open_dropdown}\\n      on:input={highlight_matching_options}\\n      {id}\\n      {disabled}\\n      {autocomplete}\\n      {inputmode}\\n      {pattern}\\n      placeholder={selected.length == 0 ? placeholder : null}\\n      aria-invalid={invalid ? `true` : null}\\n      ondrop=\\"return false\\"\\n      on:blur\\n      on:change\\n      on:click\\n      on:keydown\\n      on:keyup\\n      on:mousedown\\n      on:mouseenter\\n      on:mouseleave\\n      on:touchcancel\\n      on:touchend\\n      on:touchmove\\n      on:touchstart\\n    />\\n    <!-- the above on:* lines forward potentially useful DOM events -->\\n    <slot\\n      name=\\"after-input\\"\\n      {selected}\\n      {disabled}\\n      {invalid}\\n      {id}\\n      {placeholder}\\n      {open}\\n      {required}\\n    />\\n  </ul>\\n  {#if loading}\\n    <slot name=\\"spinner\\">\\n      <CircleSpinner />\\n    </slot>\\n  {/if}\\n  {#if disabled}\\n    <slot name=\\"disabled-icon\\">\\n      <DisabledIcon width=\\"14pt\\" style=\\"margin: 0 2pt;\\" data-name=\\"disabled-icon\\" />\\n    </slot>\\n  {:else if selected.length > 0}\\n    {#if maxSelect && (maxSelect > 1 || maxSelectMsg)}\\n      <Wiggle bind:wiggle angle={20}>\\n        <span class=\\"max-select-msg {maxSelectMsgClass}\\">\\n          {maxSelectMsg?.(selected.length, maxSelect)}\\n        </span>\\n      </Wiggle>\\n    {/if}\\n    {#if maxSelect !== 1 && selected.length > 1}\\n      <button\\n        type=\\"button\\"\\n        class=\\"remove remove-all\\"\\n        title={removeAllTitle}\\n        on:mouseup|stopPropagation={remove_all}\\n        on:keydown={if_enter_or_space(remove_all)}\\n      >\\n        <slot name=\\"remove-icon\\">\\n          <CrossIcon width=\\"15px\\" />\\n        </slot>\\n      </button>\\n    {/if}\\n  {/if}\\n\\n  <!-- only render options dropdown if options or searchText is not empty (needed to avoid briefly flashing empty dropdown) -->\\n  {#if (searchText && noMatchingOptionsMsg) || options?.length > 0}\\n    <ul\\n      class:hidden={!open}\\n      class=\\"options {ulOptionsClass}\\"\\n      role=\\"listbox\\"\\n      aria-multiselectable={maxSelect === null || maxSelect > 1}\\n      aria-expanded={open}\\n      aria-disabled={disabled ? `true` : null}\\n      bind:this={ul_options}\\n      style={ulOptionsStyle}\\n    >\\n      {#each matchingOptions.slice(0, Math.max(0, maxOptions ?? 0) || Infinity) as option, idx}\\n        {@const {\\n          label,\\n          disabled = null,\\n          title = null,\\n          selectedTitle = null,\\n          disabledTitle = defaultDisabledTitle,\\n        } = option instanceof Object ? option : { label: option }}\\n        {@const active = activeIndex === idx}\\n        <li\\n          on:mousedown|stopPropagation\\n          on:mouseup|stopPropagation={(event) => {\\n            if (!disabled) add(option, event)\\n          }}\\n          title={disabled\\n            ? disabledTitle\\n            : (is_selected(label) && selectedTitle) || title}\\n          class:selected={is_selected(label)}\\n          class:active\\n          class:disabled\\n          class=\\"{liOptionClass} {active ? liActiveOptionClass : ``}\\"\\n          on:mouseover={() => {\\n            if (!disabled) activeIndex = idx\\n          }}\\n          on:focus={() => {\\n            if (!disabled) activeIndex = idx\\n          }}\\n          on:mouseout={() => (activeIndex = null)}\\n          on:blur={() => (activeIndex = null)}\\n          role=\\"option\\"\\n          aria-selected=\\"false\\"\\n          style=\\"{get_style(option, `option`)} {liOptionStyle}\\"\\n        >\\n          <slot name=\\"option\\" {option} {idx}>\\n            <slot {option} {idx}>\\n              {#if parseLabelsAsHtml}\\n                {@html get_label(option)}\\n              {:else}\\n                {get_label(option)}\\n              {/if}\\n            </slot>\\n          </slot>\\n        </li>\\n      {/each}\\n      {#if searchText}\\n        {@const text_input_is_duplicate = selected.map(get_label).includes(searchText)}\\n        {@const is_dupe = !duplicates && text_input_is_duplicate && `dupe`}\\n        {@const can_create = Boolean(allowUserOptions && createOptionMsg) && `create`}\\n        {@const no_match =\\n          Boolean(matchingOptions?.length == 0 && noMatchingOptionsMsg) && `no-match`}\\n        {@const msgType = is_dupe || can_create || no_match}\\n        {#if msgType}\\n          {@const msg = {\\n            dupe: duplicateOptionMsg,\\n            create: createOptionMsg,\\n            \'no-match\': noMatchingOptionsMsg,\\n          }[msgType]}\\n          <li\\n            on:mousedown|stopPropagation\\n            on:mouseup|stopPropagation={(event) => {\\n              if (allowUserOptions) add(searchText, event)\\n            }}\\n            title={createOptionMsg}\\n            class:active={option_msg_is_active}\\n            on:mouseover={() => (option_msg_is_active = true)}\\n            on:focus={() => (option_msg_is_active = true)}\\n            on:mouseout={() => (option_msg_is_active = false)}\\n            on:blur={() => (option_msg_is_active = false)}\\n            role=\\"option\\"\\n            aria-selected=\\"false\\"\\n            class=\\"user-msg {liUserMsgClass} {option_msg_is_active\\n              ? liActiveUserMsgClass\\n              : ``}\\"\\n            style:cursor={{\\n              dupe: `not-allowed`,\\n              create: `pointer`,\\n              \'no-match\': `default`,\\n            }[msgType]}\\n          >\\n            <slot name=\\"user-msg\\" {searchText} {msgType} {msg}>\\n              {msg}\\n            </slot>\\n          </li>\\n        {/if}\\n      {/if}\\n    </ul>\\n  {/if}\\n</div>\\n\\n<style>\\n  :where(div.multiselect) {\\n    position: relative;\\n    align-items: center;\\n    display: flex;\\n    cursor: text;\\n    box-sizing: border-box;\\n    border: var(--sms-border, 1pt solid lightgray);\\n    border-radius: var(--sms-border-radius, 3pt);\\n    background: var(--sms-bg);\\n    width: var(--sms-width);\\n    max-width: var(--sms-max-width);\\n    padding: var(--sms-padding, 0 3pt);\\n    color: var(--sms-text-color);\\n    font-size: var(--sms-font-size, inherit);\\n    min-height: var(--sms-min-height, 22pt);\\n    margin: var(--sms-margin);\\n  }\\n  :where(div.multiselect.open) {\\n    /* increase z-index when open to ensure the dropdown of one <MultiSelect />\\n    displays above that of another slightly below it on the page */\\n    z-index: var(--sms-open-z-index, 4);\\n  }\\n  :where(div.multiselect:focus-within) {\\n    border: var(--sms-focus-border, 1pt solid var(--sms-active-color, cornflowerblue));\\n  }\\n  :where(div.multiselect.disabled) {\\n    background: var(--sms-disabled-bg, lightgray);\\n    cursor: not-allowed;\\n  }\\n\\n  :where(div.multiselect > ul.selected) {\\n    display: flex;\\n    flex: 1;\\n    padding: 0;\\n    margin: 0;\\n    flex-wrap: wrap;\\n  }\\n  :where(div.multiselect > ul.selected > li) {\\n    align-items: center;\\n    border-radius: 3pt;\\n    display: flex;\\n    margin: 2pt;\\n    line-height: normal;\\n    transition: 0.3s;\\n    white-space: nowrap;\\n    background: var(--sms-selected-bg, rgba(0, 0, 0, 0.15));\\n    padding: var(--sms-selected-li-padding, 1pt 5pt);\\n    color: var(--sms-selected-text-color, var(--sms-text-color));\\n  }\\n  :where(div.multiselect > ul.selected > li[draggable=\'true\']) {\\n    cursor: grab;\\n  }\\n  :where(div.multiselect > ul.selected > li.active) {\\n    background: var(--sms-li-active-bg, var(--sms-active-color, rgba(0, 0, 0, 0.15)));\\n  }\\n  :where(div.multiselect button) {\\n    border-radius: 50%;\\n    display: flex;\\n    transition: 0.2s;\\n    color: inherit;\\n    background: transparent;\\n    border: none;\\n    cursor: pointer;\\n    outline: none;\\n    padding: 0;\\n    margin: 0 0 0 3pt; /* CSS reset */\\n  }\\n  :where(div.multiselect button.remove-all) {\\n    margin: 0 3pt;\\n  }\\n  :where(ul.selected > li button:hover, button.remove-all:hover, button:focus) {\\n    color: var(--sms-remove-btn-hover-color, lightskyblue);\\n    background: var(--sms-remove-btn-hover-bg, rgba(0, 0, 0, 0.2));\\n  }\\n\\n  :where(div.multiselect input) {\\n    margin: auto 0; /* CSS reset */\\n    padding: 0; /* CSS reset */\\n  }\\n  :where(div.multiselect > ul.selected > input) {\\n    border: none;\\n    outline: none;\\n    background: none;\\n    flex: 1; /* this + next line fix issue #12 https://git.io/JiDe3 */\\n    min-width: 2em;\\n    /* ensure input uses text color and not --sms-selected-text-color */\\n    color: var(--sms-text-color);\\n    font-size: inherit;\\n    cursor: inherit; /* needed for disabled state */\\n    border-radius: 0; /* reset ul.selected > li */\\n  }\\n  /* don\'t wrap ::placeholder rules in :where() as it seems to be overpowered by browser defaults i.t.o. specificity */\\n  div.multiselect > ul.selected > input::-moz-placeholder {\\n    padding-left: 5pt;\\n    color: var(--sms-placeholder-color);\\n    opacity: var(--sms-placeholder-opacity);\\n  }\\n  div.multiselect > ul.selected > input::placeholder {\\n    padding-left: 5pt;\\n    color: var(--sms-placeholder-color);\\n    opacity: var(--sms-placeholder-opacity);\\n  }\\n  :where(div.multiselect > input.form-control) {\\n    width: 2em;\\n    position: absolute;\\n    background: transparent;\\n    border: none;\\n    outline: none;\\n    z-index: -1;\\n    opacity: 0;\\n    pointer-events: none;\\n  }\\n\\n  :where(div.multiselect > ul.options) {\\n    list-style: none;\\n    top: 100%;\\n    left: 0;\\n    width: 100%;\\n    position: absolute;\\n    overflow: auto;\\n    transition: all 0.2s;\\n    box-sizing: border-box;\\n    background: var(--sms-options-bg, white);\\n    max-height: var(--sms-options-max-height, 50vh);\\n    overscroll-behavior: var(--sms-options-overscroll, none);\\n    box-shadow: var(--sms-options-shadow, 0 0 14pt -8pt black);\\n    border: var(--sms-options-border);\\n    border-width: var(--sms-options-border-width);\\n    border-radius: var(--sms-options-border-radius, 1ex);\\n    padding: var(--sms-options-padding);\\n    margin: var(--sms-options-margin, inherit);\\n  }\\n  :where(div.multiselect > ul.options.hidden) {\\n    visibility: hidden;\\n    opacity: 0;\\n    transform: translateY(50px);\\n  }\\n  :where(div.multiselect > ul.options > li) {\\n    padding: 3pt 2ex;\\n    cursor: pointer;\\n    scroll-margin: var(--sms-options-scroll-margin, 100px);\\n  }\\n  :where(div.multiselect > ul.options .user-msg) {\\n    /* block needed so vertical padding applies to span */\\n    display: block;\\n    padding: 3pt 2ex;\\n  }\\n  :where(div.multiselect > ul.options > li.selected) {\\n    background: var(--sms-li-selected-bg);\\n    color: var(--sms-li-selected-color);\\n  }\\n  :where(div.multiselect > ul.options > li.active) {\\n    background: var(--sms-li-active-bg, var(--sms-active-color, rgba(0, 0, 0, 0.15)));\\n  }\\n  :where(div.multiselect > ul.options > li.disabled) {\\n    cursor: not-allowed;\\n    background: var(--sms-li-disabled-bg, #f5f5f6);\\n    color: var(--sms-li-disabled-text, #b8b8b8);\\n  }\\n\\n  :where(span.max-select-msg) {\\n    padding: 0 3pt;\\n  }\\n  ::highlight(sms-search-matches) {\\n    color: mediumaquamarine;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}'
};
const MultiSelect = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let is_selected;
  let { activeIndex = null } = $$props;
  let { activeOption = null } = $$props;
  let { createOptionMsg = `Create this option...` } = $$props;
  let { allowUserOptions = false } = $$props;
  let { allowEmpty = false } = $$props;
  let { autocomplete = `off` } = $$props;
  let { autoScroll = true } = $$props;
  let { breakpoint = 800 } = $$props;
  let { defaultDisabledTitle = `This option is disabled` } = $$props;
  let { disabled = false } = $$props;
  let { disabledInputTitle = `This input is disabled` } = $$props;
  let { duplicateOptionMsg = `This option is already selected` } = $$props;
  let { duplicates = false } = $$props;
  let { key = (opt) => `${get_label(opt)}`.toLowerCase() } = $$props;
  let { filterFunc = (opt, searchText2) => {
    if (!searchText2)
      return true;
    return `${get_label(opt)}`.toLowerCase().includes(searchText2.toLowerCase());
  } } = $$props;
  let { closeDropdownOnSelect = `desktop` } = $$props;
  let { form_input = null } = $$props;
  let { highlightMatches = true } = $$props;
  let { id = null } = $$props;
  let { input = null } = $$props;
  let { inputClass = `` } = $$props;
  let { inputStyle = null } = $$props;
  let { inputmode = null } = $$props;
  let { invalid = false } = $$props;
  let { liActiveOptionClass = `` } = $$props;
  let { liActiveUserMsgClass = `` } = $$props;
  let { liOptionClass = `` } = $$props;
  let { liOptionStyle = null } = $$props;
  let { liSelectedClass = `` } = $$props;
  let { liSelectedStyle = null } = $$props;
  let { liUserMsgClass = `` } = $$props;
  let { loading = false } = $$props;
  let { matchingOptions = [] } = $$props;
  let { maxOptions = void 0 } = $$props;
  let { maxSelect = null } = $$props;
  let { maxSelectMsg = (current, max) => max > 1 ? `${current}/${max}` : `` } = $$props;
  let { maxSelectMsgClass = `` } = $$props;
  let { name = null } = $$props;
  let { noMatchingOptionsMsg = `No matching options` } = $$props;
  let { open = false } = $$props;
  let { options } = $$props;
  let { outerDiv = null } = $$props;
  let { outerDivClass = `` } = $$props;
  let { parseLabelsAsHtml = false } = $$props;
  let { pattern = null } = $$props;
  let { placeholder = null } = $$props;
  let { removeAllTitle = `Remove all` } = $$props;
  let { removeBtnTitle = `Remove` } = $$props;
  let { minSelect = null } = $$props;
  let { required = false } = $$props;
  let { resetFilterOnAdd = true } = $$props;
  let { searchText = `` } = $$props;
  let { selected = options?.filter((opt) => opt instanceof Object && opt?.preselected).slice(0, maxSelect ?? void 0) ?? [] } = $$props;
  let { sortSelected = false } = $$props;
  let { selectedOptionsDraggable = !sortSelected } = $$props;
  let { style = null } = $$props;
  let { ulOptionsClass = `` } = $$props;
  let { ulSelectedClass = `` } = $$props;
  let { ulSelectedStyle = null } = $$props;
  let { ulOptionsStyle = null } = $$props;
  let { value = null } = $$props;
  const selected_to_value = (selected2) => {
    value = maxSelect === 1 ? selected2[0] ?? null : selected2;
  };
  const value_to_selected = (value2) => {
    if (maxSelect === 1)
      selected = value2 ? [value2] : [];
    else
      selected = value2 ?? [];
  };
  let wiggle = false;
  if (!(options?.length > 0)) {
    if (allowUserOptions || loading || disabled || allowEmpty) {
      options = [];
    } else {
      console.error(`MultiSelect received no options`);
    }
  }
  if (maxSelect !== null && maxSelect < 1) {
    console.error(`MultiSelect's maxSelect must be null or positive integer, got ${maxSelect}`);
  }
  if (!Array.isArray(selected)) {
    console.error(`MultiSelect's selected prop should always be an array, got ${selected}`);
  }
  if (maxSelect && typeof required === `number` && required > maxSelect) {
    console.error(`MultiSelect maxSelect=${maxSelect} < required=${required}, makes it impossible for users to submit a valid form`);
  }
  if (parseLabelsAsHtml && allowUserOptions) {
    console.warn(`Don't combine parseLabelsAsHtml and allowUserOptions. It's susceptible to XSS attacks!`);
  }
  if (sortSelected && selectedOptionsDraggable) {
    console.warn(`MultiSelect's sortSelected and selectedOptionsDraggable should not be combined as any user re-orderings of selected options will be undone by sortSelected on component re-renders.`);
  }
  if (allowUserOptions && !createOptionMsg && createOptionMsg !== null) {
    console.error(`MultiSelect has allowUserOptions=${allowUserOptions} but createOptionMsg=${createOptionMsg} is falsy. This prevents the "Add option" <span> from showing up, resulting in a confusing user experience.`);
  }
  if (maxOptions && (typeof maxOptions != `number` || maxOptions < 0 || maxOptions % 1 != 0)) {
    console.error(`MultiSelect's maxOptions must be undefined or a positive integer, got ${maxOptions}`);
  }
  createEventDispatcher();
  if (activeIndex !== null && !matchingOptions[activeIndex]) {
    throw `Run time error, activeIndex=${activeIndex} is out of bounds, matchingOptions.length=${matchingOptions.length}`;
  }
  let drag_idx = null;
  let ul_options;
  if ($$props.activeIndex === void 0 && $$bindings.activeIndex && activeIndex !== void 0)
    $$bindings.activeIndex(activeIndex);
  if ($$props.activeOption === void 0 && $$bindings.activeOption && activeOption !== void 0)
    $$bindings.activeOption(activeOption);
  if ($$props.createOptionMsg === void 0 && $$bindings.createOptionMsg && createOptionMsg !== void 0)
    $$bindings.createOptionMsg(createOptionMsg);
  if ($$props.allowUserOptions === void 0 && $$bindings.allowUserOptions && allowUserOptions !== void 0)
    $$bindings.allowUserOptions(allowUserOptions);
  if ($$props.allowEmpty === void 0 && $$bindings.allowEmpty && allowEmpty !== void 0)
    $$bindings.allowEmpty(allowEmpty);
  if ($$props.autocomplete === void 0 && $$bindings.autocomplete && autocomplete !== void 0)
    $$bindings.autocomplete(autocomplete);
  if ($$props.autoScroll === void 0 && $$bindings.autoScroll && autoScroll !== void 0)
    $$bindings.autoScroll(autoScroll);
  if ($$props.breakpoint === void 0 && $$bindings.breakpoint && breakpoint !== void 0)
    $$bindings.breakpoint(breakpoint);
  if ($$props.defaultDisabledTitle === void 0 && $$bindings.defaultDisabledTitle && defaultDisabledTitle !== void 0)
    $$bindings.defaultDisabledTitle(defaultDisabledTitle);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.disabledInputTitle === void 0 && $$bindings.disabledInputTitle && disabledInputTitle !== void 0)
    $$bindings.disabledInputTitle(disabledInputTitle);
  if ($$props.duplicateOptionMsg === void 0 && $$bindings.duplicateOptionMsg && duplicateOptionMsg !== void 0)
    $$bindings.duplicateOptionMsg(duplicateOptionMsg);
  if ($$props.duplicates === void 0 && $$bindings.duplicates && duplicates !== void 0)
    $$bindings.duplicates(duplicates);
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  if ($$props.filterFunc === void 0 && $$bindings.filterFunc && filterFunc !== void 0)
    $$bindings.filterFunc(filterFunc);
  if ($$props.closeDropdownOnSelect === void 0 && $$bindings.closeDropdownOnSelect && closeDropdownOnSelect !== void 0)
    $$bindings.closeDropdownOnSelect(closeDropdownOnSelect);
  if ($$props.form_input === void 0 && $$bindings.form_input && form_input !== void 0)
    $$bindings.form_input(form_input);
  if ($$props.highlightMatches === void 0 && $$bindings.highlightMatches && highlightMatches !== void 0)
    $$bindings.highlightMatches(highlightMatches);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.input === void 0 && $$bindings.input && input !== void 0)
    $$bindings.input(input);
  if ($$props.inputClass === void 0 && $$bindings.inputClass && inputClass !== void 0)
    $$bindings.inputClass(inputClass);
  if ($$props.inputStyle === void 0 && $$bindings.inputStyle && inputStyle !== void 0)
    $$bindings.inputStyle(inputStyle);
  if ($$props.inputmode === void 0 && $$bindings.inputmode && inputmode !== void 0)
    $$bindings.inputmode(inputmode);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.liActiveOptionClass === void 0 && $$bindings.liActiveOptionClass && liActiveOptionClass !== void 0)
    $$bindings.liActiveOptionClass(liActiveOptionClass);
  if ($$props.liActiveUserMsgClass === void 0 && $$bindings.liActiveUserMsgClass && liActiveUserMsgClass !== void 0)
    $$bindings.liActiveUserMsgClass(liActiveUserMsgClass);
  if ($$props.liOptionClass === void 0 && $$bindings.liOptionClass && liOptionClass !== void 0)
    $$bindings.liOptionClass(liOptionClass);
  if ($$props.liOptionStyle === void 0 && $$bindings.liOptionStyle && liOptionStyle !== void 0)
    $$bindings.liOptionStyle(liOptionStyle);
  if ($$props.liSelectedClass === void 0 && $$bindings.liSelectedClass && liSelectedClass !== void 0)
    $$bindings.liSelectedClass(liSelectedClass);
  if ($$props.liSelectedStyle === void 0 && $$bindings.liSelectedStyle && liSelectedStyle !== void 0)
    $$bindings.liSelectedStyle(liSelectedStyle);
  if ($$props.liUserMsgClass === void 0 && $$bindings.liUserMsgClass && liUserMsgClass !== void 0)
    $$bindings.liUserMsgClass(liUserMsgClass);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  if ($$props.matchingOptions === void 0 && $$bindings.matchingOptions && matchingOptions !== void 0)
    $$bindings.matchingOptions(matchingOptions);
  if ($$props.maxOptions === void 0 && $$bindings.maxOptions && maxOptions !== void 0)
    $$bindings.maxOptions(maxOptions);
  if ($$props.maxSelect === void 0 && $$bindings.maxSelect && maxSelect !== void 0)
    $$bindings.maxSelect(maxSelect);
  if ($$props.maxSelectMsg === void 0 && $$bindings.maxSelectMsg && maxSelectMsg !== void 0)
    $$bindings.maxSelectMsg(maxSelectMsg);
  if ($$props.maxSelectMsgClass === void 0 && $$bindings.maxSelectMsgClass && maxSelectMsgClass !== void 0)
    $$bindings.maxSelectMsgClass(maxSelectMsgClass);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.noMatchingOptionsMsg === void 0 && $$bindings.noMatchingOptionsMsg && noMatchingOptionsMsg !== void 0)
    $$bindings.noMatchingOptionsMsg(noMatchingOptionsMsg);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.outerDiv === void 0 && $$bindings.outerDiv && outerDiv !== void 0)
    $$bindings.outerDiv(outerDiv);
  if ($$props.outerDivClass === void 0 && $$bindings.outerDivClass && outerDivClass !== void 0)
    $$bindings.outerDivClass(outerDivClass);
  if ($$props.parseLabelsAsHtml === void 0 && $$bindings.parseLabelsAsHtml && parseLabelsAsHtml !== void 0)
    $$bindings.parseLabelsAsHtml(parseLabelsAsHtml);
  if ($$props.pattern === void 0 && $$bindings.pattern && pattern !== void 0)
    $$bindings.pattern(pattern);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.removeAllTitle === void 0 && $$bindings.removeAllTitle && removeAllTitle !== void 0)
    $$bindings.removeAllTitle(removeAllTitle);
  if ($$props.removeBtnTitle === void 0 && $$bindings.removeBtnTitle && removeBtnTitle !== void 0)
    $$bindings.removeBtnTitle(removeBtnTitle);
  if ($$props.minSelect === void 0 && $$bindings.minSelect && minSelect !== void 0)
    $$bindings.minSelect(minSelect);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.resetFilterOnAdd === void 0 && $$bindings.resetFilterOnAdd && resetFilterOnAdd !== void 0)
    $$bindings.resetFilterOnAdd(resetFilterOnAdd);
  if ($$props.searchText === void 0 && $$bindings.searchText && searchText !== void 0)
    $$bindings.searchText(searchText);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.sortSelected === void 0 && $$bindings.sortSelected && sortSelected !== void 0)
    $$bindings.sortSelected(sortSelected);
  if ($$props.selectedOptionsDraggable === void 0 && $$bindings.selectedOptionsDraggable && selectedOptionsDraggable !== void 0)
    $$bindings.selectedOptionsDraggable(selectedOptionsDraggable);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.ulOptionsClass === void 0 && $$bindings.ulOptionsClass && ulOptionsClass !== void 0)
    $$bindings.ulOptionsClass(ulOptionsClass);
  if ($$props.ulSelectedClass === void 0 && $$bindings.ulSelectedClass && ulSelectedClass !== void 0)
    $$bindings.ulSelectedClass(ulSelectedClass);
  if ($$props.ulSelectedStyle === void 0 && $$bindings.ulSelectedStyle && ulSelectedStyle !== void 0)
    $$bindings.ulSelectedStyle(ulSelectedStyle);
  if ($$props.ulOptionsStyle === void 0 && $$bindings.ulOptionsStyle && ulOptionsStyle !== void 0)
    $$bindings.ulOptionsStyle(ulOptionsStyle);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      selected_to_value(selected);
    }
    {
      value_to_selected(value);
    }
    matchingOptions = options.filter((opt) => filterFunc(opt, searchText) && // remove already selected options from dropdown list unless duplicate selections are allowed
    (!selected.map(key).includes(key(opt)) || duplicates));
    activeOption = matchingOptions[activeIndex ?? -1] ?? null;
    is_selected = (label) => selected.map(get_label).includes(label);
    {
      form_input?.setCustomValidity(``);
    }
    $$rendered = ` <div class="${[
      "multiselect " + escape(outerDivClass, true) + " svelte-1v0qqru",
      (disabled ? "disabled" : "") + " " + (maxSelect === 1 ? "single" : "") + " " + (open ? "open" : "") + " " + (invalid ? "invalid" : "")
    ].join(" ").trim()}"${add_attribute("title", disabled ? disabledInputTitle : null, 0)}${add_attribute("data-id", id, 0)} role="searchbox" tabindex="-1"${add_attribute("style", style, 0)}${add_attribute("this", outerDiv, 0)}>  <input${add_attribute("name", name, 0)} ${required ? "required" : ""}${add_attribute(
      "value",
      selected.length >= Number(required) ? JSON.stringify(selected) : null,
      0
    )} tabindex="-1" aria-hidden="true" aria-label="ignore this, used only to prevent form submission if select is required but empty" class="form-control svelte-1v0qqru"${add_attribute("this", form_input, 0)}> ${slots["expand-icon"] ? slots["expand-icon"]({ open }) : ` ${validate_component(ChevronExpand, "ExpandIcon").$$render(
      $$result,
      {
        width: "15px",
        style: "min-width: 1em; padding: 0 1pt; cursor: pointer;"
      },
      {},
      {}
    )} `} <ul class="${"selected " + escape(ulSelectedClass, true) + " svelte-1v0qqru"}" aria-label="selected options"${add_attribute("style", ulSelectedStyle, 0)}>${each(selected, (option, idx) => {
      return `<li class="${[
        escape(null_to_empty(liSelectedClass), true) + " svelte-1v0qqru",
        drag_idx === idx ? "active" : ""
      ].join(" ").trim()}" role="option" aria-selected="true"${add_attribute("draggable", selectedOptionsDraggable && !disabled && selected.length > 1, 0)} style="${escape(get_style(option, `selected`), true) + " " + escape(liSelectedStyle, true)}"> ${slots.selected ? slots.selected({ option, idx }) : ` ${slots.default ? slots.default({ option, idx }) : ` ${parseLabelsAsHtml ? `<!-- HTML_TAG_START -->${get_label(option)}<!-- HTML_TAG_END -->` : `${escape(get_label(option))}`} `} `} ${!disabled && (minSelect === null || selected.length > minSelect) ? `<button type="button" title="${escape(removeBtnTitle, true) + " " + escape(get_label(option), true)}" class="remove svelte-1v0qqru">${slots["remove-icon"] ? slots["remove-icon"]({}) : ` ${validate_component(Cross, "CrossIcon").$$render($$result, { width: "15px" }, {}, {})} `} </button>` : ``} </li>`;
    })} <input class="${escape(null_to_empty(inputClass), true) + " svelte-1v0qqru"}"${add_attribute("style", inputStyle, 0)}${add_attribute("id", id, 0)} ${disabled ? "disabled" : ""}${add_attribute("autocomplete", autocomplete, 0)}${add_attribute("inputmode", inputmode, 0)}${add_attribute("pattern", pattern, 0)}${add_attribute("placeholder", selected.length == 0 ? placeholder : null, 0)}${add_attribute("aria-invalid", invalid ? `true` : null, 0)} ondrop="return false"${add_attribute("this", input, 0)}${add_attribute("value", searchText, 0)}>  ${slots["after-input"] ? slots["after-input"]({
      selected,
      disabled,
      invalid,
      id,
      placeholder,
      open,
      required
    }) : ``}</ul> ${loading ? `${slots.spinner ? slots.spinner({}) : ` ${validate_component(CircleSpinner, "CircleSpinner").$$render($$result, {}, {}, {})} `}` : ``} ${disabled ? `${slots["disabled-icon"] ? slots["disabled-icon"]({}) : ` ${validate_component(Disabled, "DisabledIcon").$$render(
      $$result,
      {
        width: "14pt",
        style: "margin: 0 2pt;",
        "data-name": "disabled-icon"
      },
      {},
      {}
    )} `}` : `${selected.length > 0 ? `${maxSelect && (maxSelect > 1 || maxSelectMsg) ? `${validate_component(Wiggle, "Wiggle").$$render(
      $$result,
      { angle: 20, wiggle },
      {
        wiggle: ($$value) => {
          wiggle = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<span class="${"max-select-msg " + escape(maxSelectMsgClass, true) + " svelte-1v0qqru"}">${escape(maxSelectMsg?.(selected.length, maxSelect))}</span>`;
        }
      }
    )}` : ``} ${maxSelect !== 1 && selected.length > 1 ? `<button type="button" class="remove remove-all svelte-1v0qqru"${add_attribute("title", removeAllTitle, 0)}>${slots["remove-icon"] ? slots["remove-icon"]({}) : ` ${validate_component(Cross, "CrossIcon").$$render($$result, { width: "15px" }, {}, {})} `}</button>` : ``}` : ``}`}  ${searchText && noMatchingOptionsMsg || options?.length > 0 ? `<ul class="${[
      "options " + escape(ulOptionsClass, true) + " svelte-1v0qqru",
      !open ? "hidden" : ""
    ].join(" ").trim()}" role="listbox"${add_attribute("aria-multiselectable", maxSelect === null || maxSelect > 1, 0)}${add_attribute("aria-expanded", open, 0)}${add_attribute("aria-disabled", disabled ? `true` : null, 0)}${add_attribute("style", ulOptionsStyle, 0)}${add_attribute("this", ul_options, 0)}>${each(matchingOptions.slice(0, Math.max(0, maxOptions ?? 0) || Infinity), (option, idx) => {
      let { label, disabled: disabled2 = null, title = null, selectedTitle = null, disabledTitle = defaultDisabledTitle } = option instanceof Object ? option : { label: option }, active = activeIndex === idx;
      return `  <li${add_attribute(
        "title",
        disabled2 ? disabledTitle : is_selected(label) && selectedTitle || title,
        0
      )} class="${[
        escape(liOptionClass, true) + " " + escape(active ? liActiveOptionClass : ``, true) + " svelte-1v0qqru",
        (is_selected(label) ? "selected" : "") + " " + (active ? "active" : "") + " " + (disabled2 ? "disabled" : "")
      ].join(" ").trim()}" role="option" aria-selected="false" style="${escape(get_style(option, `option`), true) + " " + escape(liOptionStyle, true)}">${slots.option ? slots.option({ option, idx }) : ` ${slots.default ? slots.default({ option, idx }) : ` ${parseLabelsAsHtml ? `<!-- HTML_TAG_START -->${get_label(option)}<!-- HTML_TAG_END -->` : `${escape(get_label(option))}`} `} `} </li>`;
    })} ${searchText ? (() => {
      let text_input_is_duplicate = selected.map(get_label).includes(searchText), is_dupe = !duplicates && text_input_is_duplicate && `dupe`, can_create = Boolean(allowUserOptions && createOptionMsg) && `create`, no_match = Boolean(matchingOptions?.length == 0 && noMatchingOptionsMsg) && `no-match`, msgType = is_dupe || can_create || no_match;
      return `     ${msgType ? (() => {
        let msg = {
          dupe: duplicateOptionMsg,
          create: createOptionMsg,
          "no-match": noMatchingOptionsMsg
        }[msgType];
        return ` <li${add_attribute("title", createOptionMsg, 0)} role="option" aria-selected="false" class="${[
          "user-msg " + escape(liUserMsgClass, true) + " " + escape(``, true) + " svelte-1v0qqru",
          ""
        ].join(" ").trim()}"${add_styles({
          "cursor": {
            dupe: `not-allowed`,
            create: `pointer`,
            "no-match": `default`
          }[msgType]
        })}>${slots["user-msg"] ? slots["user-msg"]({ searchText, msgType, msg }) : ` ${escape(msg)} `}</li>`;
      })() : ``}`;
    })() : ``}</ul>` : ``} </div>`;
  } while (!$$settled);
  return $$rendered;
});
function scroll_into_view_if_needed_polyfill(centerIfNeeded = true) {
  const elem = this;
  const observer = new IntersectionObserver(function([entry]) {
    const ratio = entry.intersectionRatio;
    if (ratio < 1) {
      const place = ratio <= 0 && centerIfNeeded ? `center` : `nearest`;
      elem.scrollIntoView({
        block: place,
        inline: place
      });
    }
    this.disconnect();
  });
  observer.observe(elem);
  return observer;
}
if (typeof Element !== `undefined` && !Element.prototype?.scrollIntoViewIfNeeded && typeof IntersectionObserver !== `undefined`) {
  Element.prototype.scrollIntoViewIfNeeded = scroll_into_view_if_needed_polyfill;
}
const cities = [
  "New York, NY",
  "Buffalo, NY",
  "Rochester, NY",
  "Yonkers, NY",
  "Syracuse, NY",
  "Albany, NY",
  "New Rochelle, NY",
  "Mount Vernon, NY",
  "Schenectady, NY",
  "Utica, NY",
  "White Plains, NY",
  "Hempstead, NY",
  "Troy, NY",
  "Niagara Falls, NY",
  "Binghamton, NY",
  "Freeport, NY",
  "Valley Stream, NY",
  "Los Angeles, CA",
  "San Diego, CA",
  "San Jose, CA",
  "San Francisco, CA",
  "Fresno, CA",
  "Sacramento, CA",
  "Long Beach, CA",
  "Oakland, CA",
  "Bakersfield, CA",
  "Anaheim, CA",
  "Santa Ana, CA",
  "Riverside, CA",
  "Stockton, CA",
  "Chula Vista, CA",
  "Irvine, CA",
  "Fremont, CA",
  "San Bernardino, CA",
  "Modesto, CA",
  "Fontana, CA",
  "Oxnard, CA",
  "Moreno Valley, CA",
  "Huntington Beach, CA",
  "Glendale, CA",
  "Santa Clarita, CA",
  "Garden Grove, CA",
  "Oceanside, CA",
  "Rancho Cucamonga, CA",
  "Santa Rosa, CA",
  "Ontario, CA",
  "Lancaster, CA",
  "Elk Grove, CA",
  "Corona, CA",
  "Palmdale, CA",
  "Salinas, CA",
  "Pomona, CA",
  "Hayward, CA",
  "Escondido, CA",
  "Torrance, CA",
  "Sunnyvale, CA",
  "Orange, CA",
  "Fullerton, CA",
  "Pasadena, CA",
  "Thousand Oaks, CA",
  "Visalia, CA",
  "Simi Valley, CA",
  "Concord, CA",
  "Roseville, CA",
  "Victorville, CA",
  "Santa Clara, CA",
  "Vallejo, CA",
  "Berkeley, CA",
  "El Monte, CA",
  "Downey, CA",
  "Costa Mesa, CA",
  "Inglewood, CA",
  "Carlsbad, CA",
  "San Buenaventura (Ventura), CA",
  "Fairfield, CA",
  "West Covina, CA",
  "Murrieta, CA",
  "Richmond, CA",
  "Norwalk, CA",
  "Antioch, CA",
  "Temecula, CA",
  "Burbank, CA",
  "Daly City, CA",
  "Rialto, CA",
  "Santa Maria, CA",
  "El Cajon, CA",
  "San Mateo, CA",
  "Clovis, CA",
  "Compton, CA",
  "Jurupa Valley, CA",
  "Vista, CA",
  "South Gate, CA",
  "Mission Viejo, CA",
  "Vacaville, CA",
  "Carson, CA",
  "Hesperia, CA",
  "Santa Monica, CA",
  "Westminster, CA",
  "Redding, CA",
  "Santa Barbara, CA",
  "Chico, CA",
  "Newport Beach, CA",
  "San Leandro, CA",
  "San Marcos, CA",
  "Whittier, CA",
  "Hawthorne, CA",
  "Citrus Heights, CA",
  "Tracy, CA",
  "Alhambra, CA",
  "Livermore, CA",
  "Buena Park, CA",
  "Menifee, CA",
  "Hemet, CA",
  "Lakewood, CA",
  "Merced, CA",
  "Chino, CA",
  "Indio, CA",
  "Redwood City, CA",
  "Lake Forest, CA",
  "Napa, CA",
  "Tustin, CA",
  "Bellflower, CA",
  "Mountain View, CA",
  "Chino Hills, CA",
  "Baldwin Park, CA",
  "Alameda, CA",
  "Upland, CA",
  "San Ramon, CA",
  "Folsom, CA",
  "Pleasanton, CA",
  "Union City, CA",
  "Perris, CA",
  "Manteca, CA",
  "Lynwood, CA",
  "Apple Valley, CA",
  "Redlands, CA",
  "Turlock, CA",
  "Milpitas, CA",
  "Redondo Beach, CA",
  "Rancho Cordova, CA",
  "Yorba Linda, CA",
  "Palo Alto, CA",
  "Davis, CA",
  "Camarillo",
  "Walnut Creek, CA",
  "Pittsburg, CA",
  "South San Francisco, CA",
  "Yuba City, CA",
  "San Clemente, CA",
  "Laguna Niguel, CA",
  "Pico Rivera, CA",
  "Montebello, CA",
  "Lodi, CA",
  "Madera, CA",
  "Santa Cruz, CA",
  "La Habra, CA",
  "Encinitas, CA",
  "Monterey Park, CA",
  "Tulare, CA",
  "Cupertino, CA",
  "Gardena, CA",
  "National City, CA",
  "Rocklin, CA",
  "Petaluma, CA",
  "Huntington Park, CA",
  "San Rafael, CA",
  "La Mesa, CA",
  "Arcadia, CA",
  "Fountain Valley, CA",
  "Diamond Bar, CA",
  "Woodland, CA",
  "Santee, CA",
  "Lake Elsinore, CA",
  "Porterville, CA",
  "Paramount, CA",
  "Eastvale, CA",
  "Rosemead, CA",
  "Hanford, CA",
  "Highland, CA",
  "Brentwood, CA",
  "Novato, CA",
  "Colton, CA",
  "Cathedral City, CA",
  "Delano, CA",
  "Yucaipa, CA",
  "Watsonville, CA",
  "Placentia, CA",
  "Glendora, CA",
  "Gilroy, CA",
  "Palm Desert, CA",
  "Cerritos, CA",
  "West Sacramento, CA",
  "Aliso Viejo, CA",
  "Poway, CA",
  "La Mirada, CA",
  "Rancho Santa Margarita, CA",
  "Cypress, CA",
  "Dublin, CA",
  "Covina, CA",
  "Azusa, CA",
  "Palm Springs, CA",
  "San Luis Obispo, CA",
  "Ceres, CA",
  "San Jacinto, CA",
  "Lincoln, CA",
  "Newark, CA",
  "Lompoc, CA",
  "El Centro, CA",
  "Danville, CA",
  "Bell Gardens, CA",
  "Coachella, CA",
  "Rancho Palos Verdes, CA",
  "San Bruno, CA",
  "Rohnert Park, CA",
  "Brea, CA",
  "La Puente, CA",
  "Campbell, CA",
  "San Gabriel, CA",
  "Beaumont, CA",
  "Morgan Hill, CA",
  "Culver City, CA",
  "Calexico, CA",
  "Stanton, CA",
  "La Quinta, CA",
  "Pacifica, CA",
  "Montclair, CA",
  "Oakley, CA",
  "Monrovia, CA",
  "Los Banos, CA",
  "Martinez, CA",
  "Chicago, IL",
  "Aurora, IL",
  "Rockford, IL",
  "Joliet, IL",
  "Naperville, IL",
  "Springfield, IL",
  "Peoria, IL",
  "Elgin, IL",
  "Waukegan, IL",
  "Cicero, IL",
  "Champaign, IL",
  "Bloomington, IL",
  "Arlington Heights, IL",
  "Evanston, IL",
  "Decatur, IL",
  "Schaumburg, IL",
  "Bolingbrook, IL",
  "Palatine, IL",
  "Skokie, IL",
  "Des Plaines, IL",
  "Orland Park, IL",
  "Tinley Park, IL",
  "Oak Lawn, IL",
  "Berwyn, IL",
  "Mount Prospect, IL",
  "Normal, IL",
  "Wheaton, IL",
  "Hoffman Estates, IL",
  "Oak Park, IL",
  "Downers Grove, IL",
  "Elmhurst, IL",
  "Glenview, IL",
  "DeKalb, IL",
  "Lombard, IL",
  "Belleville, IL",
  "Moline, IL",
  "Buffalo Grove, IL",
  "Bartlett, IL",
  "Urbana, IL",
  "Quincy, IL",
  "Crystal Lake, IL",
  "Plainfield, IL",
  "Streamwood, IL",
  "Carol Stream, IL",
  "Romeoville, IL",
  "Rock Island",
  "Hanover Park, IL",
  "Carpentersville, IL",
  "Wheeling, IL",
  "Park Ridge, IL",
  "Addison, IL",
  "Calumet City, IL",
  "Houston, TX",
  "San Antonio, TX",
  "Dallas, TX",
  "Austin, TX",
  "Fort Worth, TX",
  "El Paso, TX",
  "Arlington, TX",
  "Corpus Christi, TX",
  "Plano, TX",
  "Laredo, TX",
  "Lubbock, TX",
  "Garland, TX",
  "Irving, TX",
  "Amarillo, TX",
  "Grand Prairie, TX",
  "Brownsville, TX",
  "Pasadena, TX",
  "McKinney, TX",
  "Mesquite, TX",
  "McAllen, TX",
  "Killeen, TX",
  "Frisco, TX",
  "Waco, TX",
  "Carrollton, TX",
  "Denton, TX",
  "Midland, TX",
  "Abilene, TX",
  "Beaumont, TX",
  "Round Rock, TX",
  "Odessa, TX",
  "Wichita Falls, TX",
  "Richardson, TX",
  "Lewisville, TX",
  "Tyler, TX",
  "College Station, TX",
  "Pearland, TX",
  "San Angelo, TX",
  "Allen, TX",
  "League City, TX",
  "Sugar Land, TX",
  "Longview, TX",
  "Edinburg, TX",
  "Mission, TX",
  "Bryan, TX",
  "Baytown, TX",
  "Pharr, TX",
  "Temple, TX",
  "Missouri City, TX",
  "Flower Mound, TX",
  "Harlingen, TX",
  "North Richland Hills, TX",
  "Victoria, TX",
  "Conroe, TX",
  "New Braunfels, TX",
  "Mansfield, TX",
  "Cedar Park, TX",
  "Rowlett, TX",
  "Port Arthur, TX",
  "Euless, TX",
  "Georgetown, TX",
  "Pflugerville, TX",
  "DeSoto, TX",
  "San Marcos, TX",
  "Grapevine, TX",
  "Bedford, TX",
  "Galveston, TX",
  "Cedar Hill, TX",
  "Texas City, TX",
  "Wylie, TX",
  "Haltom City, TX",
  "Keller, TX",
  "Coppell, TX",
  "Rockwall, TX",
  "Huntsville, TX",
  "Duncanville, TX",
  "Sherman, TX",
  "The Colony, TX",
  "Burleson, TX",
  "Hurst, TX",
  "Lancaster, TX",
  "Texarkana, TX",
  "Friendswood, TX",
  "Weslaco, TX",
  "Philadelphia, PA",
  "Pittsburgh, PA",
  "Allentown, PA",
  "Erie, PA",
  "Reading, PA",
  "Scranton, PA",
  "Bethlehem, PA",
  "Lancaster, PA",
  "Harrisburg, PA",
  "Altoona, PA",
  "York, PA",
  "State College, PA",
  "Wilkes-Barre, PA",
  "Phoenix, AZ",
  "Tucson, AZ",
  "Mesa, AZ",
  "Chandler, AZ",
  "Glendale, AZ",
  "Scottsdale, AZ",
  "Gilbert, AZ",
  "Tempe, AZ",
  "Peoria, AZ",
  "Surprise, AZ",
  "Yuma, AZ",
  "Avondale, AZ",
  "Goodyear, AZ",
  "Flagstaff, AZ",
  "Buckeye, AZ",
  "Lake Havasu City, AZ",
  "Casa Grande, AZ",
  "Sierra Vista, AZ",
  "Maricopa, AZ",
  "Oro Valley, AZ",
  "Prescott, AZ",
  "Bullhead City, AZ",
  "Prescott Valley, AZ",
  "Marana, AZ",
  "Apache Junction, AZ",
  "Jacksonville, FL",
  "Miami, FL",
  "Tampa, FL",
  "Orlando, FL",
  "St. Petersburg, FL",
  "Hialeah, FL",
  "Tallahassee, FL",
  "Fort Lauderdale, FL",
  "Port St. Lucie, FL",
  "Cape Coral, FL",
  "Pembroke Pines, FL",
  "Hollywood, FL",
  "Miramar, FL",
  "Gainesville, FL",
  "Coral Springs, FL",
  "Miami Gardens, FL",
  "Clearwater, FL",
  "Palm Bay, FL",
  "Pompano Beach, FL",
  "West Palm Beach, FL",
  "Lakeland, FL",
  "Davie, FL",
  "Miami Beach, FL",
  "Sunrise, FL",
  "Plantation, FL",
  "Boca Raton, FL",
  "Deltona, FL",
  "Largo, FL",
  "Deerfield Beach, FL",
  "Palm Coast, FL",
  "Melbourne, FL",
  "Boynton Beach, FL",
  "Lauderhill, FL",
  "Weston, FL",
  "Fort Myers, FL",
  "Kissimmee, FL",
  "Homestead, FL",
  "Tamarac, FL",
  "Delray Beach, FL",
  "Daytona Beach, FL",
  "North Miami, FL",
  "Wellington, FL",
  "North Port, FL",
  "Jupiter, FL",
  "Ocala, FL",
  "Port Orange, FL",
  "Margate, FL",
  "Coconut Creek, FL",
  "Sanford, FL",
  "Sarasota, FL",
  "Pensacola, FL",
  "Bradenton, FL",
  "Palm Beach Gardens, FL",
  "Pinellas Park, FL",
  "Coral Gables, FL",
  "Doral, FL",
  "Bonita Springs, FL",
  "Apopka, FL",
  "Titusville, FL",
  "North Miami Beach, FL",
  "Oakland Park, FL",
  "Fort Pierce, FL",
  "North Lauderdale, FL",
  "Cutler Bay, FL",
  "Altamonte Springs, FL",
  "St. Cloud, FL",
  "Greenacres, FL",
  "Ormond Beach, FL",
  "Ocoee, FL",
  "Hallandale Beach, FL",
  "Winter Garden, FL",
  "Aventura, FL",
  "Indianapolis, IN",
  "Fort Wayne, IN",
  "Evansville, IN",
  "South Bend, IN",
  "Carmel, IN",
  "Bloomington, IN",
  "Fishers, IN",
  "Hammond, IN",
  "Gary, IN",
  "Muncie, IN",
  "Lafayette, IN",
  "Terre Haute, IN",
  "Kokomo, IN",
  "Anderson, IN",
  "Noblesville, IN",
  "Greenwood, IN",
  "Elkhart, IN",
  "Mishawaka, IN",
  "Lawrence, IN",
  "Jeffersonville, IN",
  "Columbus, IN",
  "Portage, IN",
  "Columbus, OH",
  "Cleveland, OH",
  "Cincinnati, OH",
  "Toledo, OH",
  "Akron, OH",
  "Dayton, OH",
  "Parma, OH",
  "Canton, OH",
  "Youngstown, OH",
  "Lorain, OH",
  "Hamilton, OH",
  "Springfield, OH",
  "Kettering, OH",
  "Elyria, OH",
  "Lakewood, OH",
  "Cuyahoga Falls, OH",
  "Middletown, OH",
  "Euclid, OH",
  "Newark, OH",
  "Mansfield, OH",
  "Mentor, OH",
  "Beavercreek, OH",
  "Cleveland Heights, OH",
  "Strongsville, OH",
  "Dublin, OH",
  "Fairfield, OH",
  "Findlay, OH",
  "Warren, OH",
  "Lancaster, OH",
  "Lima, OH",
  "Huber Heights, OH",
  "Westerville, OH",
  "Marion, OH",
  "Grove City, OH",
  "Charlotte, NC",
  "Raleigh, NC",
  "Greensboro, NC",
  "Durham, NC",
  "Winston-Salem, NC",
  "Fayetteville, NC",
  "Cary, NC",
  "Wilmington, NC",
  "High Point, NC",
  "Greenville, NC",
  "Asheville, NC",
  "Concord, NC",
  "Gastonia, NC",
  "Jacksonville, NC",
  "Chapel Hill, NC",
  "Rocky Mount, NC",
  "Burlington, NC",
  "Wilson, NC",
  "Huntersville, NC",
  "Kannapolis, NC",
  "Apex, NC",
  "Hickory, NC",
  "Goldsboro, NC",
  "Detroit, MI",
  "Grand Rapids, MI",
  "Warren, MI",
  "Sterling Heights, MI",
  "Ann Arbor, MI",
  "Lansing, MI",
  "Flint, MI",
  "Dearborn, MI",
  "Livonia, MI",
  "Westland, MI",
  "Troy, MI",
  "Farmington Hills, MI",
  "Kalamazoo, MI",
  "Wyoming, MI",
  "Southfield, MI",
  "Rochester Hills, MI",
  "Taylor, MI",
  "Pontiac, MI",
  "St. Clair Shores, MI",
  "Royal Oak, MI",
  "Novi, MI",
  "Dearborn Heights, MI",
  "Battle Creek, MI",
  "Saginaw, MI",
  "Kentwood, MI",
  "East Lansing, MI",
  "Roseville, MI",
  "Portage, MI",
  "Midland, MI",
  "Lincoln Park, MI",
  "Muskegon, MI",
  "Memphis, TN",
  "Nashville-Davidson, TN",
  "Knoxville, TN",
  "Chattanooga, TN",
  "Clarksville, TN",
  "Murfreesboro, TN",
  "Jackson, TN",
  "Franklin, TN",
  "Johnson City, TN",
  "Bartlett, TN",
  "Hendersonville, TN",
  "Kingsport, TN",
  "Collierville, TN",
  "Cleveland, TN",
  "Smyrna, TN",
  "Germantown, TN",
  "Brentwood, TN",
  "Boston, MA",
  "Worcester, MA",
  "Springfield, MA",
  "Lowell, MA",
  "Cambridge, MA",
  "New Bedford, MA",
  "Brockton, MA",
  "Quincy, MA",
  "Lynn, MA",
  "Fall River, MA",
  "Newton, MA",
  "Lawrence, MA",
  "Somerville, MA",
  "Waltham, MA",
  "Haverhill, MA",
  "Malden, MA",
  "Medford, MA",
  "Taunton, MA",
  "Chicopee, MA",
  "Weymouth Town, MA",
  "Revere, MA",
  "Peabody, MA",
  "Methuen, MA",
  "Barnstable Town, MA",
  "Pittsfield, MA",
  "Attleboro, MA",
  "Everett, MA",
  "Salem, MA",
  "Westfield, MA",
  "Leominster, MA",
  "Fitchburg, MA",
  "Beverly, MA",
  "Holyoke, MA",
  "Marlborough, MA",
  "Woburn, MA",
  "Chelsea, MA",
  "Seattle, WA",
  "Spokane, WA",
  "Tacoma, WA",
  "Vancouver, WA",
  "Bellevue, WA",
  "Kent, WA",
  "Everett, WA",
  "Renton, WA",
  "Yakima, WA",
  "Federal Way, WA",
  "Spokane Valley, WA",
  "Bellingham, WA",
  "Kennewick, WA",
  "Auburn, WA",
  "Pasco, WA",
  "Marysville, WA",
  "Lakewood, WA",
  "Redmond, WA",
  "Shoreline, WA",
  "Richland, WA",
  "Kirkland, WA",
  "Burien, WA",
  "Sammamish, WA",
  "Olympia, WA",
  "Lacey, WA",
  "Edmonds, WA",
  "Bremerton, WA",
  "Puyallup, WA",
  "Denver, CO",
  "Colorado Springs, CO",
  "Aurora, CO",
  "Fort Collins, CO",
  "Lakewood, CO",
  "Thornton, CO",
  "Arvada, CO",
  "Westminster, CO",
  "Pueblo, CO",
  "Centennial, CO",
  "Boulder, CO",
  "Greeley, CO",
  "Longmont, CO",
  "Loveland, CO",
  "Grand Junction, CO",
  "Broomfield, CO",
  "Castle Rock, CO",
  "Commerce City, CO",
  "Parker, CO",
  "Littleton, CO",
  "Northglenn, CO",
  "Washington, DC",
  "Baltimore, MD",
  "Frederick, MD",
  "Rockville, MD",
  "Gaithersburg, MD",
  "Bowie, MD",
  "Hagerstown, MD",
  "Annapolis, MD",
  "Louisville/Jefferson County, KY",
  "Lexington-Fayette, KY",
  "Bowling Green, KY",
  "Owensboro, KY",
  "Covington, KY",
  "Portland, OR",
  "Eugene, OR",
  "Salem, OR",
  "Gresham, OR",
  "Hillsboro, OR",
  "Beaverton, OR",
  "Bend, OR",
  "Medford, OR",
  "Springfield, OR",
  "Corvallis, OR",
  "Albany, OR",
  "Tigard, OR",
  "Lake Oswego, OR",
  "Keizer, OR",
  "Oklahoma City, OK",
  "Tulsa, OK, OK",
  "Norman, OK",
  "Broken Arrow, OK",
  "Lawton, OK",
  "Edmond, OK",
  "Moore, OK",
  "Midwest City, OK",
  "Enid, OK",
  "Stillwater, OK",
  "Muskogee, OK",
  "Milwaukee, WI",
  "Madison, WI",
  "Green Bay, WI",
  "Kenosha, WI",
  "Racine, WI",
  "Appleton, WI",
  "Waukesha, WI",
  "Eau Claire, WI",
  "Oshkosh, WI",
  "Janesville, WI",
  "West Allis, WI",
  "La Crosse, WI",
  "Sheboygan, WI",
  "Wauwatosa, WI",
  "Fond du Lac, WI",
  "New Berlin, WI",
  "Wausau, WI",
  "Brookfield, WI",
  "Greenfield, WI",
  "Beloit, WI",
  "Las Vegas, NV",
  "Henderson, NV",
  "Reno, NV",
  "North Las Vegas, NV",
  "Sparks, NV",
  "Carson City, NV",
  "Albuquerque, NM",
  "Las Cruces, NM",
  "Rio Rancho, NM",
  "Santa Fe, NM",
  "Roswell, NM",
  "Farmington, NM",
  "Clovis, NM",
  "Kansas City, MO",
  "St. Louis, MO",
  "Springfield, MO",
  "Independence, MO",
  "Columbia, MO",
  "Lee's Summit, MO",
  "O'Fallon, MO",
  "St. Joseph, MO",
  "St. Charles, MO",
  "St. Peters, MO",
  "Blue Springs, MO",
  "Florissant, MO",
  "Joplin, MO",
  "Chesterfield, MO",
  "Jefferson City, MO",
  "Cape Girardeau, MO",
  "Virginia Beach, VA",
  "Norfolk, VA",
  "Chesapeake, VA",
  "Richmond, VA",
  "Newport News, VA",
  "Alexandria, VA",
  "Hampton, VA",
  "Roanoke, VA",
  "Portsmouth, VA",
  "Suffolk, VA",
  "Lynchburg, VA",
  "Harrisonburg, VA",
  "Leesburg, VA",
  "Charlottesville, VA",
  "Danville, VA",
  "Blacksburg, VA",
  "Manassas, VA",
  "Atlanta, GA",
  "Columbus, GA",
  "Augusta-Richmond County, GA",
  "Savannah, GA",
  "Athens-Clarke County, GA",
  "Sandy Springs, GA",
  "Roswell, GA",
  "Macon, GA",
  "Johns Creek, GA",
  "Albany, GA",
  "Warner Robins, GA",
  "Alpharetta, GA",
  "Marietta, GA",
  "Valdosta, GA",
  "Smyrna, GA",
  "Dunwoody, GA",
  "Omaha, NE",
  "Lincoln, NE",
  "Bellevue, NE",
  "Grand Island, NE",
  "Minneapolis, MN",
  "St. Paul, MN",
  "Rochester, MN",
  "Duluth, MN",
  "Bloomington, MN",
  "Brooklyn Park, MN",
  "Plymouth, MN",
  "St. Cloud, MN",
  "Eagan, MN",
  "Woodbury, MN",
  "Maple Grove, MN",
  "Eden Prairie, MN",
  "Coon Rapids, MN",
  "Burnsville, MN",
  "Blaine, MN",
  "Lakeville, MN",
  "Minnetonka, MN",
  "Apple Valley, MN",
  "Edina, MN",
  "St. Louis Park, MN",
  "Mankato, MN",
  "Maplewood, MN",
  "Moorhead, MN",
  "Shakopee, MN",
  "Wichita, KS",
  "Overland Park, KS",
  "Kansas City, KS",
  "Olathe, KS",
  "Topeka, KS",
  "Lawrence, KS",
  "Shawnee, KS",
  "Manhattan, KS",
  "Lenexa, KS",
  "Salina, KS",
  "Hutchinson, KS",
  "New Orleans, LA",
  "Baton Rouge, LA",
  "Shreveport, LA",
  "Lafayette, LA",
  "Lake Charles, LA",
  "Kenner, LA",
  "Bossier City, LA",
  "Monroe, LA",
  "Alexandria, LA",
  "Honolulu, HI",
  "Anchorage, AK",
  "Newark, NJ",
  "Jersey City, NJ",
  "Paterson, NJ",
  "Elizabeth, NJ",
  "Clifton, NJ",
  "Trenton, NJ",
  "Camden, NJ",
  "Passaic, NJ",
  "Union City, NJ",
  "Bayonne, NJ",
  "East Orange, NJ",
  "Vineland, NJ",
  "New Brunswick, NJ",
  "Hoboken, NJ",
  "Perth Amboy, NJ",
  "West New York, NJ",
  "Plainfield, NJ",
  "Hackensack, NJ",
  "Sayreville, NJ",
  "Kearny, NJ",
  "Linden, NJ",
  "Atlantic City, NJ",
  "Boise City, ID",
  "Nampa, ID",
  "Meridian, ID",
  "Idaho Falls, ID",
  "Pocatello, ID",
  "Caldwell, ID",
  "Coeur d'Alene, ID",
  "Twin Falls, ID",
  "Birmingham, AL",
  "Montgomery, AL",
  "Mobile, AL",
  "Huntsville, AL",
  "Tuscaloosa, AL",
  "Hoover, AL",
  "Dothan, AL",
  "Auburn, AL",
  "Decatur, AL",
  "Madison, AL",
  "Florence, AL",
  "Gadsden, AL",
  "Des Moines, IA",
  "Cedar Rapids, IA",
  "Davenport, IA",
  "Sioux City, IA",
  "Iowa City, IA",
  "Waterloo, IA",
  "Council Bluffs, IA",
  "Ames, IA",
  "West Des Moines, IA",
  "Dubuque, IA",
  "Ankeny, IA",
  "Urbandale, IA",
  "Cedar Falls, IA",
  "Little Rock, AR",
  "Fort Smith, AR",
  "Fayetteville, AR",
  "Springdale, AR",
  "Jonesboro, AR",
  "North Little Rock, AR",
  "Conway, AR",
  "Rogers, AR",
  "Pine Bluff, AR",
  "Bentonville, AR",
  "Salt Lake City, UT",
  "West Valley City, UT",
  "Provo, UT",
  "West Jordan, UT",
  "Orem, UT",
  "Sandy, UT",
  "Ogden, UT",
  "St. George, UT",
  "Layton, UT",
  "Taylorsville, UT",
  "South Jordan, UT",
  "Lehi, UT",
  "Logan, UT",
  "Murray, UT",
  "Draper, UT",
  "Bountiful, UT",
  "Riverton, UT",
  "Roy, UT",
  "Providence, RI",
  "Warwick, RI",
  "Cranston, RI",
  "Pawtucket, RI",
  "East Providence, RI",
  "Woonsocket, RI",
  "Jackson, MS",
  "Gulfport, MS",
  "Southaven, MS",
  "Hattiesburg, MS",
  "Biloxi, MS",
  "Meridian, MS",
  "Sioux Falls, SD",
  "Rapid City, SD",
  "Bridgeport, CT",
  "New Haven, CT",
  "Stamford, CT",
  "Hartford, CT",
  "Waterbury, CT",
  "Norwalk, CT",
  "Danbury, CT",
  "New Britain, CT",
  "Meriden, CT",
  "Bristol, CT",
  "West Haven, CT",
  "Milford, CT",
  "Middletown, CT",
  "Norwich, CT",
  "Shelton, CT",
  "Columbia, SC",
  "Charleston, SC",
  "North Charleston, SC",
  "Mount Pleasant, SC",
  "Rock Hill, SC",
  "Greenville, SC",
  "Summerville, SC",
  "Sumter, SC",
  "Goose Creek, SC",
  "Hilton Head Island, SC",
  "Florence, SC",
  "Spartanburg, SC",
  "Manchester, NH",
  "Nashuam, NH",
  "Concord, NH",
  "Fargo, ND",
  "Bismarck, ND",
  "Grand Forks, ND",
  "Minot, ND",
  "Billings, MT",
  "Missoula, MT",
  "Great Falls, MT",
  "Bozeman, MT",
  "Wilmington, DE",
  "Dover, DE",
  "Portland, ME",
  "Cheyenne, WY",
  "Casper, WY",
  "Charleston, WV",
  "Huntington, WV",
  "Burlington, VT"
];
const us_cities = {
  cities
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let uberData = {
    rating: 0,
    car: "",
    services: [],
    cities: [],
    dateJoined: /* @__PURE__ */ new Date()
  };
  const uberServices = [
    "UberX",
    "UberXL",
    "UberX Share",
    "UberX Comfort",
    "Uber Black",
    "Uber Black SUV",
    "WAV",
    "Uber Car Seat X",
    "Uber Green",
    "Uber Taxi"
  ];
  let roverData = {
    rating: 0,
    pets: [],
    services: [],
    cities: [],
    dateJoined: /* @__PURE__ */ new Date()
  };
  const pets = ["Small Dog", "Medium Dog", "Giant Dog", "Cat", "Puppy"];
  const roverServices = ["Boarding", "House Sitting", "Drop-In Visits", "Doggy Day Care", "Dog Walking"];
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex flex-row">${validate_component(Sidebar_1, "Sidebar").$$render($$result, {}, {}, {})} <div class="p-8 w-1/2"><h1 data-svelte-h="svelte-1h5qrv0">Worker Information</h1> ${$page.data.user?.platform == "uber" ? `<h1 data-svelte-h="svelte-dd7314">Uber</h1> <div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Uber Rating`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      { type: "number", value: uberData.rating },
      {
        value: ($$value) => {
          uberData.rating = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Car Driven`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      { value: uberData.car },
      {
        value: ($$value) => {
          uberData.car = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Services Provided`;
      }
    })} ${validate_component(MultiSelect, "MultiSelect").$$render(
      $$result,
      {
        options: uberServices,
        selected: uberData.services
      },
      {
        selected: ($$value) => {
          uberData.services = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Cities Served`;
      }
    })} ${validate_component(MultiSelect, "MultiSelect").$$render(
      $$result,
      {
        options: us_cities.cities,
        selected: uberData.cities
      },
      {
        selected: ($$value) => {
          uberData.cities = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Date of Joining Uber`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "date",
        selected: uberData.dateJoined
      },
      {
        selected: ($$value) => {
          uberData.dateJoined = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>` : `${$page.data.user?.platform == "rover" ? `<div><h1 data-svelte-h="svelte-pm2la2">Rover</h1>  <div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Rover Rating`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      { type: "number", value: roverData.rating },
      {
        value: ($$value) => {
          roverData.rating = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Pets Accepted`;
      }
    })} ${validate_component(MultiSelect, "MultiSelect").$$render(
      $$result,
      { options: pets, selected: roverData.pets },
      {
        selected: ($$value) => {
          roverData.pets = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Services Offered`;
      }
    })} ${validate_component(MultiSelect, "MultiSelect").$$render(
      $$result,
      {
        options: roverServices,
        selected: roverData.services
      },
      {
        selected: ($$value) => {
          roverData.services = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Cities Served`;
      }
    })} ${validate_component(MultiSelect, "MultiSelect").$$render(
      $$result,
      {
        options: us_cities.cities,
        selected: roverData.cities
      },
      {
        selected: ($$value) => {
          roverData.cities = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="py-5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Date of Joining Rover`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "date",
        selected: roverData.dateJoined
      },
      {
        selected: ($$value) => {
          roverData.dateJoined = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>` : `${$page.data.user?.platform == "upwork" ? `<h1 data-svelte-h="svelte-jufu9w">UpWork</h1>` : ``}`}`} <button data-svelte-h="svelte-12pxir">Submit</button></div></div>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
