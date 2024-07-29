<script lang="ts">
    import { goto } from "$app/navigation";
    import PlannerSidebar from "$lib/components/PlannerSidebar.svelte";
    import { Avatar, Button } from "flowbite-svelte";

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
                <div class="flex space-x-2 items-start mb-1">
                    <Avatar src="../QuestionIcon.png" class="w-6 h-6" />
                    <div>
                        <h2 class="text-sm font-semibold mb-1">Do I have to file a tax return?</h2>
                        <a href="taxes.com" class="text-sm text-blue-500 underline mb-1">Learn More</a>
                        <p class="text-xs font-light">You must file a tax return if your net earnings from self-employment were $400 or more. If you have other income, you may also need to file.</p>
                    </div>
                </div>
             
                <div class="flex space-x-2 items-start mb-1">
                    <Avatar src="../QuestionIcon.png" class="w-6 h-6" />
                    <div>
                        <h2 class="text-sm font-semibold mb-1">What is self-employment tax?</h2>
                        <a href="taxes.com" class="text-sm text-blue-500 underline mb-1">Learn More</a>
                        <p class="text-xs font-light">You must pay self-employment tax if your net earnings are $400 or more. This tax is in addition to regular income tax and covers Social Security and Medicare.</p>
                    </div>
                </div>

                <div class="flex space-x-2 items-start mb-1">
                    <Avatar src="../QuestionIcon.png" class="w-6 h-6" />
                    <div>
                        <h2 class="text-sm font-semibold mb-1">What is Form 1099-K?</h2>
                        <a href="taxes.com" class="text-sm text-blue-500 underline mb-1">Learn More</a>
                        <p class="text-xs font-light">If you earned $600 or more from a company, they should issue you a Form 1099-K. You'll use this form when filing your taxes.</p>
                    </div>
                </div>

                <div class="flex space-x-2 items-start mb-1">
                    <Avatar src="../QuestionIcon.png" class="w-6 h-6" />
                    <div>
                        <h2 class="text-sm font-semibold mb-1">What is Form 1099-NEC?</h2>
                        <a href="taxes.com" class="text-sm text-blue-500 underline mb-1">Learn More</a>
                        <p class="text-xs font-light">If you received $600 or more in non-employee compensation from a single client, they should issue you a Form 1099-NEC. You'll report this income on your tax return.</p>
                    </div>
                </div>

                <div class="flex space-x-2 items-start mb-1">
                    <Avatar src="../QuestionIcon.png" class="w-6 h-6" />
                    <div>
                        <h2 class="text-sm font-semibold mb-1">Do I need to pay estimated taxes?</h2>
                        <a href="taxes.com" class="text-sm text-blue-500 underline mb-1">Learn More</a>
                        <p class="text-xs font-light">If you expect to owe $1,000 or more in taxes, you'll need to make quarterly estimated tax payments. This includes self-employment tax.</p>
                    </div>
                </div>

                <div class="flex space-x-2 items-start mb-1">
                    <Avatar src="../QuestionIcon.png" class="w-6 h-6" />
                    <div>
                        <h2 class="text-sm font-semibold mb-1">What can I deduct as a business expense?</h2>
                        <a href="taxes.com" class="text-sm text-blue-500 underline mb-1">Learn More</a>
                        <p class="text-xs font-light">You can deduct certain business expenses to reduce your taxable income. Keep records of your expenses and report them on your tax return.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col items-start mb-2">
            <h1 class="text-lg font-medium mb-1">Tips for effective tax management</h1>
            <div class="mb-1">
                <Button class="w-64 h-12 py-1 flex items-center justify-start text-black">Track your expenses</Button>
            </div>
            <div class="mb-1">
                <Button class="w-64 h-12 py-1 flex items-center justify-start text-black">Set aside money for taxes</Button>
            </div>
            <div class="mb-1">
                <Button class="w-64 h-12 py-1 flex items-center justify-start text-black">Check your estimate payments</Button>
            </div>
            <div class="mb-1">
                <Button class="w-64 h-12 py-1 flex items-center justify-start text-black">Understand your tax deductions</Button>
            </div>
        </div>

        <div class="flex flex-col items-start">
            <h1 class="text-lg font-medium mb-1">Recommended Resources</h1>
            <div class="flex space-x-2 items-start mb-1">
                <Avatar src="../magnifying.jpeg" class="w-6 h-6" />
                <div>
                    <h2 class="text-sm font-semibold mb-1">IRS FAQs</h2>
                    <p class="text-xs font-light mb-1">Find answers to common tax questions from IRS.</p>
                    <Button href="tax.com" class="w-40 h-12 py-1 flex items-center justify-start">Link</Button>
                </div>
            </div>
            <div class="flex space-x-2 items-start mb-1">
                <Avatar src="../book.png" class="w-6 h-6" />
                <div>
                    <h2 class="text-sm font-semibold mb-1">Self Employment Tax Guide</h2>
                    <p class="text-xs font-light mb-1">Learn about self employment tax and how it works.</p>
                    <Button href="tax.com" class="w-40 h-12 py-1 flex items-center justify-start">Link</Button>
                </div>
            </div>
            <div class="flex space-x-2 items-start mb-1">
                <Avatar src="../book.png" class="w-6 h-6" />
                <div>
                    <h2 class="text-sm font-semibold mb-1">Business Expense Deductions</h2>
                    <p class="text-xs font-light mb-1">Discover what you can deduct as a business expense.</p>
                    <Button href="tax.com" class="w-40 h-12 py-1 flex items-center justify-start">Link</Button>
                </div>
            </div>
        </div>
    </div>
</div>
