import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import "../../../../../chunks/client2.js";
import { U as UploadSidebar } from "../../../../../chunks/UploadSidebar.js";
import "firebase/firestore";
import { L as Label } from "../../../../../chunks/Label.js";
import { N as NumberInput } from "../../../../../chunks/NumberInput.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let tripData = {
    fare: 0,
    surge: 0,
    tips: 0,
    waitTimeBonus: 0,
    boost: 0,
    withholdingsPercent: 0
  };
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex flex-row">${validate_component(UploadSidebar, "UploadSidebar").$$render($$result, {}, {}, {})} <div class="p-8 flex flex-col items-center w-full"><h1 class="text-2xl font-bold mb-6" data-svelte-h="svelte-8tnhqr">Manual Trip Input</h1> <div class="w-full max-w-md space-y-5"><div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Fare`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      { class: "mt-1", value: tripData.fare },
      {
        value: ($$value) => {
          tripData.fare = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Surge`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      { class: "mt-1", value: tripData.surge },
      {
        value: ($$value) => {
          tripData.surge = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Tips`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      { class: "mt-1", value: tripData.tips },
      {
        value: ($$value) => {
          tripData.tips = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Wait Time Bonus`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      {
        class: "mt-1",
        value: tripData.waitTimeBonus
      },
      {
        value: ($$value) => {
          tripData.waitTimeBonus = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Promotion/Boost`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      { class: "mt-1", value: tripData.boost },
      {
        value: ($$value) => {
          tripData.boost = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Percentage of Uber Fees/Withholdings`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      {
        class: "mt-1",
        value: tripData.withholdingsPercent
      },
      {
        value: ($$value) => {
          tripData.withholdingsPercent = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex justify-center mt-6"><button class="bg-black text-white py-2 px-4 rounded" data-svelte-h="svelte-1mi59km">Submit</button></div></div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
