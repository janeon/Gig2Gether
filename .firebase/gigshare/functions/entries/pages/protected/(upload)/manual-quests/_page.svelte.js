import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import "../../../../../chunks/client2.js";
import { U as UploadSidebar } from "../../../../../chunks/UploadSidebar.js";
import "firebase/firestore";
import { L as Label } from "../../../../../chunks/Label.js";
import { I as Input } from "../../../../../chunks/Input.js";
import { N as NumberInput } from "../../../../../chunks/NumberInput.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let questData = {
    startTime: "",
    endTime: "",
    baseTrips: 0,
    rewardForTrips: 0,
    rewardForBonusTrips: 0,
    hoursSince: 0,
    tripsCompleted: 0,
    earnings: 0,
    distance: 0,
    tips: 0
  };
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex flex-row">${validate_component(UploadSidebar, "UploadSidebar").$$render($$result, {}, {}, {})} <div class="p-8 flex flex-col items-center w-full"><h1 class="text-2xl font-bold mb-6" data-svelte-h="svelte-w3naxm">Manual Quest Input</h1> <div class="w-full max-w-md space-y-5"><div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Start Time`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        class: "mt-1",
        value: questData.startTime
      },
      {
        value: ($$value) => {
          questData.startTime = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `End Time`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        class: "mt-1",
        value: questData.endTime
      },
      {
        value: ($$value) => {
          questData.endTime = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Base # Trips`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      {
        class: "mt-1",
        value: questData.baseTrips
      },
      {
        value: ($$value) => {
          questData.baseTrips = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Reward for Base # of Trips`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      {
        class: "mt-1",
        value: questData.rewardForTrips
      },
      {
        value: ($$value) => {
          questData.rewardForTrips = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Reward for Bonus Trips`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      {
        class: "mt-1",
        value: questData.rewardForBonusTrips
      },
      {
        value: ($$value) => {
          questData.rewardForBonusTrips = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Hours Since Beginning of Quest`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      {
        class: "mt-1",
        value: questData.hoursSince
      },
      {
        value: ($$value) => {
          questData.hoursSince = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `# Trips Completed`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      {
        class: "mt-1",
        value: questData.tripsCompleted
      },
      {
        value: ($$value) => {
          questData.tripsCompleted = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Earnings`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      { class: "mt-1", value: questData.earnings },
      {
        value: ($$value) => {
          questData.earnings = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Distance`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      { class: "mt-1", value: questData.distance },
      {
        value: ($$value) => {
          questData.distance = $$value;
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
      { class: "mt-1", value: questData.tips },
      {
        value: ($$value) => {
          questData.tips = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex justify-center mt-6"><button class="bg-black text-white py-2 px-4 rounded" data-svelte-h="svelte-15mqsgt">Submit</button></div></div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
