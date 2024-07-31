<script lang="ts">
    import { goto } from "$app/navigation";
    import PlannerSidebar from "$lib/components/PlannerSidebar.svelte";
    import { Avatar, Button } from "flowbite-svelte";
  
    const taxInfo = [
      {
        question: "Do I have to file a tax return?",
        link: "https://tax.com",
        description: "You must file a tax return if your net earnings from self-employment were $400 or more. If you have other income, you may also need to file."
      },
      {
        question: "What is self-employment tax?",
        link: "https://tax.com",
        description: "You must pay self-employment tax if your net earnings are $400 or more. This tax is in addition to regular income tax and covers Social Security and Medicare."
      },
      {
        question: "What is Form 1099-K?",
        link: "https://tax.com",
        description: "If you earned $600 or more from a company, they should issue you a Form 1099-K. You'll use this form when filing your taxes."
      },
      {
        question: "What is Form 1099-NEC?",
        link: "https://tax.com",
        description: "If you received $600 or more in non-employee compensation from a single client, they should issue you a Form 1099-NEC. You'll report this income on your tax return."
      },
      {
        question: "Do I need to pay estimated taxes?",
        link: "https://tax.com",
        description: "If you expect to owe $1,000 or more in taxes, you'll need to make quarterly estimated tax payments. This includes self-employment tax."
      },
      {
        question: "What can I deduct as a business expense?",
        link: "https://tax.com",
        description: "You can deduct certain business expenses to reduce your taxable income. Keep records of your expenses and report them on your tax return."
      }
    ];
  
    const taxTips = [
      "Track your expenses",
      "Set aside money for taxes",
      "Check your estimate payments",
      "Understand your tax deductions"
    ];
  
    const resources = [
      {
        title: "IRS FAQs",
        description: "Find answers to common tax questions from IRS.",
        link: "https://tax.com",
        icon: "/magnifying.jpeg"
      },
      {
        title: "Self Employment Tax Guide",
        description: "Learn about self employment tax and how it works.",
        link: "https://tax.com",
        icon: "/book.png"
      },
      {
        title: "Business Expense Deductions",
        description: "Discover what you can deduct as a business expense.",
        link: "https://tax.com",
        icon: "/book.png"
      }
    ];
  </script>
  
  <div class="flex flex-row">
    <div class="w-1/4 p-2">
      <PlannerSidebar />
    </div>
    <div class="w-3/4 flex flex-col p-2 space-y-2">
      <div class="flex flex-col items-start mb-2">
        <h1 class="text-xl font-bold mb-1">The next tax day is April 18th</h1>
        <h1 class="text-lg font-medium mb-1">What you need to know</h1>
        <div class="flex flex-col">
          {#each taxInfo as { question, link, description }}
            <div class="flex space-x-2 items-start mb-1">
              <Avatar src="/QuestionIcon.png" class="w-6 h-6" />
              <div>
                <h2 class="text-sm font-semibold mb-1">{question}</h2>
                <a href={link} target="_blank" rel="noopener noreferrer" class="text-sm text-blue-500 underline mb-1">Learn More</a>
                <p class="text-xs font-light">{description}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
  
      <div class="flex flex-col items-start mb-2">
        <h1 class="text-lg font-medium mb-1">Tips for effective tax management</h1>
        {#each taxTips as tip}
          <div class="mb-1">
            <Button class="w-64 h-12 py-1 flex items-center justify-start text-black">{tip}</Button>
        </div>
        {/each}
      </div>
  
      <div class="flex flex-col items-start">
        <h1 class="text-lg font-medium mb-1">Recommended Resources</h1>
        {#each resources as { title, description, link, icon }}
          <div class="flex space-x-2 items-start mb-1">
            <Avatar src={icon} class="w-6 h-6" />
            <div>
              <h2 class="text-sm font-semibold mb-1">{title}</h2>
              <p class="text-xs font-light mb-1">{description}</p>
              <Button href={link} target="_blank" rel="noopener noreferrer" class="w-40 h-12 py-1 flex items-center justify-start text-black">Link</Button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  