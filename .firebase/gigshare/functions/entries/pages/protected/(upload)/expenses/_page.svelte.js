import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import "../../../../../chunks/client2.js";
import { U as UploadSidebar } from "../../../../../chunks/UploadSidebar.js";
import "firebase/firestore";
import { L as Label } from "../../../../../chunks/Label.js";
import { I as Input } from "../../../../../chunks/Input.js";
import { M as MultiSelect } from "../../../../../chunks/MultiSelect.js";
import { N as NumberInput } from "../../../../../chunks/NumberInput.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let uberData = {
    date: "",
    time: "",
    expenseType: [],
    description: "",
    amount: 0
  };
  let roverData = {
    date: "",
    time: "",
    expenseType: [],
    description: "",
    amount: 0
  };
  let upworkData = {
    date: "",
    time: "",
    expenseType: [],
    description: "",
    amount: 0
  };
  const uberExpenseType = [
    {
      value: "cleaning",
      name: "Car Wash/ Cleaning"
    },
    { value: "gas", name: "Gas" },
    { value: "rental", name: "Car Rental" },
    { value: "other", name: "Other" }
  ];
  const roverExpenseType = [
    { value: "supplies", name: "Pet Supplies" },
    {
      value: "transport",
      name: "Transportation"
    },
    { value: "other", name: "Other" }
  ];
  const upworkExpenseType = [
    { value: "software", name: "Software" },
    {
      value: "supplies",
      name: "Office Supplies"
    },
    { value: "insurance", name: "Insurance" },
    { value: "other", name: "Other" }
  ];
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex flex-row">${validate_component(UploadSidebar, "UploadSidebar").$$render($$result, {}, {}, {})} <div class="p-8 flex flex-col items-center w-full"><h1 class="text-2xl font-bold mb-6" data-svelte-h="svelte-var0x7">Expenses</h1> ${$page.data.user?.platform == "uber" ? `<h2 class="text-xl font-semibold mb-4" data-svelte-h="svelte-c9wdf0">Uber</h2> <div class="w-full max-w-md space-y-5"><div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Date`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        class: "mt-1",
        value: uberData.date
      },
      {
        value: ($$value) => {
          uberData.date = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Time`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        class: "mt-1",
        value: uberData.time
      },
      {
        value: ($$value) => {
          uberData.time = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Expense Type`;
      }
    })} ${validate_component(MultiSelect, "MultiSelect").$$render(
      $$result,
      {
        items: uberExpenseType,
        class: "mt-1",
        value: uberData.expenseType
      },
      {
        value: ($$value) => {
          uberData.expenseType = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Description`;
      }
    })} <textarea rows="4" class="mt-1 border border-gray-300 rounded px-3 py-2">${escape("")}</textarea></div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Amount`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      { class: "mt-1", value: uberData.amount },
      {
        value: ($$value) => {
          uberData.amount = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>` : `${$page.data.user?.platform == "rover" ? `<h2 class="text-xl font-semibold mb-4" data-svelte-h="svelte-6yhki0">Rover</h2> <div class="w-full max-w-md space-y-5"><div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Date`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        class: "mt-1",
        value: roverData.date
      },
      {
        value: ($$value) => {
          roverData.date = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Time`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        class: "mt-1",
        value: roverData.time
      },
      {
        value: ($$value) => {
          roverData.time = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Expense Type`;
      }
    })} ${validate_component(MultiSelect, "MultiSelect").$$render(
      $$result,
      {
        items: roverExpenseType,
        class: "mt-1",
        value: roverData.expenseType
      },
      {
        value: ($$value) => {
          roverData.expenseType = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Description`;
      }
    })} <textarea rows="4" class="mt-1 border border-gray-300 rounded px-3 py-2">${escape("")}</textarea></div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Amount`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      { class: "mt-1", value: roverData.amount },
      {
        value: ($$value) => {
          roverData.amount = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>` : `${$page.data.user?.platform == "upwork" ? `<h2 class="text-xl font-semibold mb-4" data-svelte-h="svelte-1p6v8s0">UpWork</h2> <div class="w-full max-w-md space-y-5"><div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Date`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        class: "mt-1",
        value: upworkData.date
      },
      {
        value: ($$value) => {
          upworkData.date = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Time`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        class: "mt-1",
        value: upworkData.time
      },
      {
        value: ($$value) => {
          upworkData.time = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Expense Type`;
      }
    })} ${validate_component(MultiSelect, "MultiSelect").$$render(
      $$result,
      {
        items: upworkExpenseType,
        class: "mt-1",
        value: upworkData.expenseType
      },
      {
        value: ($$value) => {
          upworkData.expenseType = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Description`;
      }
    })} <textarea rows="4" class="mt-1 border border-gray-300 rounded px-3 py-2">${escape("")}</textarea></div> <div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Amount`;
      }
    })} ${validate_component(NumberInput, "NumberInput").$$render(
      $$result,
      { class: "mt-1", value: upworkData.amount },
      {
        value: ($$value) => {
          upworkData.amount = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>` : ``}`}`} <div class="flex justify-center mt-6"><button class="bg-black text-white py-2 px-4 rounded" data-svelte-h="svelte-uxh0xi">Submit</button> ${``} ${``}</div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
