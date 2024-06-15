import { s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component, a as add_attribute, e as escape, b as each, v as validate_component } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
import "firebase/auth";
import "firebase/app";
import "firebase/firestore";
import { a as authUser } from "../../../chunks/authstore.js";
const css = {
  code: `:root{--accent-color:CornflowerBlue;--gray:#ccc}.s--inner.svelte-oqfdep button.svelte-oqfdep.svelte-oqfdep{padding:0.5em;background-color:#fff;border:0px solid var(--gray)}[role='switch'][aria-checked='true'].svelte-oqfdep .svelte-oqfdep.svelte-oqfdep:first-child,[role='switch'][aria-checked='false'].svelte-oqfdep .svelte-oqfdep.svelte-oqfdep:last-child{display:none;color:#fff}.s--inner.svelte-oqfdep button span.svelte-oqfdep.svelte-oqfdep{-webkit-user-select:none;-moz-user-select:none;user-select:none;pointer-events:none;padding:0.25em}.s--slider.svelte-oqfdep.svelte-oqfdep.svelte-oqfdep{display:flex;align-items:center}.s--slider.svelte-oqfdep button.svelte-oqfdep.svelte-oqfdep{width:3em;height:1.6em;position:relative;margin:0 0 0 0.5em;background:var(--gray);border:none}.s--slider.svelte-oqfdep button.svelte-oqfdep.svelte-oqfdep::before{content:'';position:absolute;width:1.3em;height:1.3em;background:#fff;top:0.13em;right:1.5em;transition:transform 0.3s}.s--slider.svelte-oqfdep button[aria-checked='true'].svelte-oqfdep.svelte-oqfdep{background-color:var(--accent-color)
    }.s--slider.svelte-oqfdep button[aria-checked='true'].svelte-oqfdep.svelte-oqfdep::before{transform:translateX(1.3em);transition:transform 0.3s}.s--slider.svelte-oqfdep button.svelte-oqfdep.svelte-oqfdep:focus{box-shadow:0 0px 0px 1px var(--accent-color)}.s--multi.svelte-oqfdep .group-container.svelte-oqfdep.svelte-oqfdep{border:none;padding:0;white-space:nowrap}.s--multi.svelte-oqfdep label.svelte-oqfdep.svelte-oqfdep{display:inline-block;line-height:1.6;position:relative;z-index:2}.s--multi.svelte-oqfdep input.svelte-oqfdep.svelte-oqfdep{opacity:0;position:absolute}.s--multi.svelte-oqfdep label.svelte-oqfdep.svelte-oqfdep:first-of-type{padding-right:5em}.s--multi.svelte-oqfdep label.svelte-oqfdep.svelte-oqfdep:last-child{margin-left:-5em;padding-left:5em}.s--multi.svelte-oqfdep:focus-within label.svelte-oqfdep.svelte-oqfdep:first-of-type:after{box-shadow:0 0px 8px var(--accent-color);border-radius:1.5em}.s--multi.svelte-oqfdep label.svelte-oqfdep.svelte-oqfdep:first-of-type:before,.s--multi.svelte-oqfdep label.svelte-oqfdep.svelte-oqfdep:first-of-type:after{content:"";height:1.25em;overflow:hidden;pointer-events:none;position:absolute;vertical-align:middle}.s--multi.svelte-oqfdep label.svelte-oqfdep.svelte-oqfdep:first-of-type:before{border-radius:100%;z-index:2;position:absolute;width:1.2em;height:1.2em;background:#fff;top:0.2em;right:1.2em;transition:transform 0.3s}.s--multi.svelte-oqfdep label.svelte-oqfdep.svelte-oqfdep:first-of-type:after{background:var(--accent-color);border-radius:1em;margin:0 1em;transition:background .2s ease-in-out;width:3em;height:1.6em}.s--multi.svelte-oqfdep input.svelte-oqfdep:first-of-type:checked~label.svelte-oqfdep:first-of-type:after{background:var(--gray)}.s--multi.svelte-oqfdep input.svelte-oqfdep:first-of-type:checked~label.svelte-oqfdep:first-of-type:before{transform:translateX(-1.4em)}.s--multi.svelte-oqfdep input.svelte-oqfdep:last-of-type:checked~label.svelte-oqfdep:last-of-type{z-index:1}.s--multi.svelte-oqfdep input.svelte-oqfdep.svelte-oqfdep:focus{box-shadow:0 0px 8px var(--accent-color);border-radius:1.5em}[role='switch'][aria-checked='true'].svelte-oqfdep .svelte-oqfdep.svelte-oqfdep:first-child,[role='switch'][aria-checked='false'].svelte-oqfdep .svelte-oqfdep.svelte-oqfdep:last-child{border-radius:0.25em;background:var(--accent-color);display:inline-block}.s--slider.svelte-oqfdep button.svelte-oqfdep.svelte-oqfdep{border-radius:1.5em}.s--slider.svelte-oqfdep button.svelte-oqfdep.svelte-oqfdep::before{border-radius:100%}.s--slider.svelte-oqfdep button.svelte-oqfdep.svelte-oqfdep:focus{box-shadow:0 0px 8px var(--accent-color);border-radius:1.5em}`,
  map: `{"version":3,"file":"Switch.svelte","sources":["Switch.svelte"],"sourcesContent":["<script>\\n    // based on suggestions from:\\n    // Inclusive Components by Heydon Pickering https://inclusive-components.design/toggle-button/\\n    // On Designing and Building Toggle Switches by Sara Soueidan https://www.sarasoueidan.com/blog/toggle-switch-design/\\n    // and this example by Scott O'hara https://codepen.io/scottohara/pen/zLZwNv \\n\\n    export let label;\\n    export let design = 'inner label'\\n    /**\\n   * @type {any[]}\\n   */\\n     export let options = [];\\n\\t\\texport let fontSize = 16;\\n\\t  export let value = 'on';\\n\\n    let checked = true;\\n\\n\\n\\t\\tconst uniqueID = Math.floor(Math.random() * 100)\\n\\n    /**\\n   * @param {{ target: any; }} event\\n   */\\n    function handleClick(event){\\n        const target = event.target\\n\\n        const state = target.getAttribute('aria-checked')\\n\\n        checked = state === 'true' ? false : true\\n\\n        value = checked === true ? 'worker' : 'policymaker'\\n        console.log(value);\\n    }\\n\\t\\n\\t  const slugify = (str = \\"\\") =>\\n    str.toLowerCase().replace(/ /g, \\"-\\").replace(/\\\\./g, \\"\\");\\n\\n<\/script>\\n\\n{#if design == 'inner'}\\n<div class=\\"s s--inner \\">\\n    <span id={\`switch-\${uniqueID}\`}>{label}</span>\\n    <button\\n        role=\\"switch\\"\\n        aria-checked={checked}\\n        aria-labelledby={\`switch-\${uniqueID}\`}\\n        on:click={handleClick}>\\n            <span>worker</span>\\n            <span>policymaker</span>\\n    </button>\\n</div>\\n{:else if design == 'slider'}\\n<div class=\\"s s--slider\\" style=\\"font-size:{fontSize}px\\">\\n    <span id={\`switch-\${uniqueID}\`}>{label}</span>\\n    <button\\n        role=\\"switch\\"\\n        aria-checked={checked}\\n        aria-labelledby={\`switch-\${uniqueID}\`}\\n        on:click={handleClick}>\\n    </button>\\n</div>\\n{:else}\\n<div class=\\"s s--multi\\">\\n    <div role='radiogroup'\\n\\t\\t\\t\\t class=\\"group-container\\"\\n\\t\\t\\t\\t aria-labelledby={\`label-\${uniqueID}\`}\\n\\t\\t\\t\\t style=\\"font-size:{fontSize}px\\" \\n\\t\\t\\t\\t id={\`group-\${uniqueID}\`}>\\n    <div class='legend' id={\`label-\${uniqueID}\`}>{label}</div>\\n        {#each options as option}\\n            <input type=\\"radio\\" id={\`\${option}-\${uniqueID}\`} value={option} bind:group={value}>\\n            <label for={\`\${option}-\${uniqueID}\`}>\\n                {option}\\n            </label> \\n        {/each}\\n    </div>\\n</div>\\n\\n{/if}\\n\\n<style>\\n\\t\\t\\t:root {\\n\\t\\t--accent-color: CornflowerBlue;\\n\\t\\t--gray: #ccc;\\n\\t}\\n    /* Inner Design Option */\\n    .s--inner button {\\n        padding: 0.5em;\\n        background-color: #fff;\\n        border: 0px solid var(--gray);\\n    }\\n    [role='switch'][aria-checked='true'] :first-child,\\n    [role='switch'][aria-checked='false'] :last-child {\\n        display: none;\\n        color: #fff;\\n    }\\n\\n    .s--inner button span {\\n        -webkit-user-select: none;\\n           -moz-user-select: none;\\n                user-select: none;\\n        pointer-events:none;\\n        padding: 0.25em;\\n    }\\n\\n    .s--inner button:focus {\\n        /* outline: var(--accent-color) solid 1px; */\\n    }\\n\\n    /* Slider Design Option */\\n\\n    .s--slider {\\n        display: flex;\\n        align-items: center;\\n    }\\n\\n    .s--slider button {\\n        width: 3em;\\n        height: 1.6em;\\n        position: relative;\\n        margin: 0 0 0 0.5em;\\n        background: var(--gray);\\n        border: none;\\n    }\\n\\n    .s--slider button::before {\\n        content: '';\\n        position: absolute;\\n        width: 1.3em;\\n        height: 1.3em;\\n        background: #fff;\\n        top: 0.13em;\\n        right: 1.5em;\\n        transition: transform 0.3s;\\n    }\\n\\n    .s--slider button[aria-checked='true']{\\n        background-color: var(--accent-color)\\n    }\\n\\n    .s--slider button[aria-checked='true']::before{\\n        transform: translateX(1.3em);\\n        transition: transform 0.3s;\\n    }\\n\\n    .s--slider button:focus {\\n        box-shadow: 0 0px 0px 1px var(--accent-color);\\n    }\\n\\n    /* Multi Design Option */\\n\\n    /* Based on suggestions from Sara Soueidan https://www.sarasoueidan.com/blog/toggle-switch-design/\\n    and this example from Scott O'hara https://codepen.io/scottohara/pen/zLZwNv */\\n\\n    .s--multi .group-container {\\n        border: none;\\n        padding: 0;\\n        white-space: nowrap;\\n    }\\n\\n    /* .s--multi legend {\\n    font-size: 2px;\\n    opacity: 0;\\n    position: absolute;\\n    } */\\n\\n    .s--multi label {\\n        display: inline-block;\\n        line-height: 1.6;\\n        position: relative;\\n        z-index: 2;\\n    }\\n\\n    .s--multi input {\\n        opacity: 0;\\n        position: absolute;\\n    }\\n\\n    .s--multi label:first-of-type {\\n        padding-right: 5em;\\n    }\\n\\n    .s--multi label:last-child {\\n        margin-left: -5em;\\n        padding-left: 5em;\\n    }\\n\\n    .s--multi:focus-within label:first-of-type:after {\\n        box-shadow: 0 0px 8px var(--accent-color);\\n        border-radius: 1.5em;\\n    }\\n\\n\\n\\n    /* making the switch UI.  */\\n    .s--multi label:first-of-type:before,\\n    .s--multi label:first-of-type:after {\\n        content: \\"\\";\\n        height: 1.25em;\\n        overflow: hidden;\\n        pointer-events: none;\\n        position: absolute;\\n        vertical-align: middle;\\n    }\\n\\n    .s--multi label:first-of-type:before {\\n        border-radius: 100%;\\n        z-index: 2;\\n        position: absolute;\\n        width: 1.2em;\\n        height: 1.2em;\\n        background: #fff;\\n        top: 0.2em;\\n        right: 1.2em;\\n        transition: transform 0.3s;\\n    }\\n\\n    .s--multi label:first-of-type:after {\\n        background: var(--accent-color);\\n        border-radius: 1em;\\n        margin: 0 1em;\\n        transition: background .2s ease-in-out;\\n        width: 3em;\\n        height: 1.6em;\\n    }\\n\\n    .s--multi input:first-of-type:checked ~ label:first-of-type:after {\\n        background: var(--gray);\\n    }\\n\\n    .s--multi input:first-of-type:checked ~ label:first-of-type:before {\\n        transform: translateX(-1.4em);\\n    }\\n\\n    .s--multi input:last-of-type:checked ~ label:last-of-type {\\n        z-index: 1;\\n    }\\n\\n    .s--multi input:focus {\\n        box-shadow: 0 0px 8px var(--accent-color);\\n        border-radius: 1.5em;\\n    }\\n\\n    /* gravy */ \\n\\n    /* Inner Design Option */\\n    [role='switch'][aria-checked='true'] :first-child,\\n    [role='switch'][aria-checked='false'] :last-child {\\n        border-radius: 0.25em;\\n        background: var(--accent-color);\\n        display: inline-block;\\n    }\\n\\n    .s--inner button:focus {\\n        /* box-shadow: 0 0px 8px var(--accent-color);\\n        border-radius: 0.1em; */\\n    }\\n\\n    /* Slider Design Option */\\n    .s--slider button {\\n        border-radius: 1.5em;\\n    } \\n    \\n    .s--slider button::before {\\n        border-radius: 100%;\\n    }\\n\\n    .s--slider button:focus {\\n        box-shadow: 0 0px 8px var(--accent-color);\\n        border-radius: 1.5em;\\n    }\\n   \\n\\n</style>"],"names":[],"mappings":"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"}`
};
const Switch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { label } = $$props;
  let { design = "inner label" } = $$props;
  let { options = [] } = $$props;
  let { fontSize = 16 } = $$props;
  let { value = "on" } = $$props;
  let checked = true;
  const uniqueID = Math.floor(Math.random() * 100);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.design === void 0 && $$bindings.design && design !== void 0)
    $$bindings.design(design);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.fontSize === void 0 && $$bindings.fontSize && fontSize !== void 0)
    $$bindings.fontSize(fontSize);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  $$result.css.add(css);
  return `${design == "inner" ? `<div class="s s--inner  svelte-oqfdep"><span${add_attribute("id", `switch-${uniqueID}`, 0)} class="svelte-oqfdep">${escape(label)}</span> <button role="switch"${add_attribute("aria-checked", checked, 0)}${add_attribute("aria-labelledby", `switch-${uniqueID}`, 0)} class="svelte-oqfdep"><span class="svelte-oqfdep" data-svelte-h="svelte-175zwfg">worker</span> <span class="svelte-oqfdep" data-svelte-h="svelte-g1qozs">policymaker</span></button></div>` : `${design == "slider" ? `<div class="s s--slider svelte-oqfdep" style="${"font-size:" + escape(fontSize, true) + "px"}"><span${add_attribute("id", `switch-${uniqueID}`, 0)}>${escape(label)}</span> <button role="switch"${add_attribute("aria-checked", checked, 0)}${add_attribute("aria-labelledby", `switch-${uniqueID}`, 0)} class="svelte-oqfdep"></button></div>` : `<div class="s s--multi svelte-oqfdep"><div role="radiogroup" class="group-container svelte-oqfdep"${add_attribute("aria-labelledby", `label-${uniqueID}`, 0)} style="${"font-size:" + escape(fontSize, true) + "px"}"${add_attribute("id", `group-${uniqueID}`, 0)}><div class="legend"${add_attribute("id", `label-${uniqueID}`, 0)}>${escape(label)}</div> ${each(options, (option) => {
    return `<input type="radio"${add_attribute("id", `${option}-${uniqueID}`, 0)}${add_attribute("value", option, 0)} class="svelte-oqfdep"${option === value ? add_attribute("checked", true, 1) : ""}> <label${add_attribute("for", `${option}-${uniqueID}`, 0)} class="svelte-oqfdep">${escape(option)} </label>`;
  })}</div></div>`}`}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_authUser;
  $$unsubscribe_authUser = subscribe(authUser, (value) => value);
  let email;
  let password;
  let role = "worker";
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-f1nrop_START -->${$$result.title = `<title>Register</title>`, ""}<!-- HEAD_svelte-f1nrop_END -->`, ""} <div class="flex flex-col items-center">${validate_component(Switch, "Switch").$$render(
      $$result,
      {
        label: "I'm a gig",
        options: ["worker", "policymaker"],
        design: "inner",
        value: role
      },
      {
        value: ($$value) => {
          role = $$value;
          $$settled = false;
        }
      },
      {}
    )} <form class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-6/12"><input type="email" placeholder="Email" class="px-4 py-2 border border-gray-300 rounded-md" required${add_attribute("value", email, 0)}> <input type="password" placeholder="Password" class="px-4 py-2 border border-gray-300 rounded-md" required${add_attribute("value", password, 0)}> <button type="submit" class="default-action" data-svelte-h="svelte-r6twxh">Register</button> ${``}</form></div>`;
  } while (!$$settled);
  $$unsubscribe_authUser();
  return $$rendered;
});
export {
  Page as default
};
