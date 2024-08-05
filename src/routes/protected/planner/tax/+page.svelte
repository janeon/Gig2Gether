<script lang="ts">
    import { goto } from "$app/navigation";
    import '@fortawesome/fontawesome-free/css/all.min.css';
    import { Button } from "flowbite-svelte";
</script>

<div class="flex flex-row">
    <div class="w-3/4 flex flex-col p-2 space-y-2">
        <div class="flex flex-col items-start">
            <div class="text-left mb-4">
                <h1 class="text-xl font-bold mb-4">The next tax day is April 18th</h1>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <div class="font-bold text-2xl">12</div>
                        <div>Days</div>
                    </div>
                    <div>
                        <div class="font-bold text-2xl">06</div>
                        <div>Hours</div>
                    </div>
                    <div>
                        <div class="font-bold text-2xl">04</div>
                        <div>Minutes</div>
                    </div>
                    <div>
                        <div class="font-bold text-2xl">02</div>
                        <div>Seconds</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col items-start">
            <h1 class="text-xl font-bold mb-4">What you need to know</h1>
            <div class="flex flex-col">
                <div class="flex space-x-2 items-start mb-1">
                    <i class="fas fa-question w-6 h-6"></i>
                    <div>
                        <h2 class="text-sm font-semibold mb-1">What are my tax obligations?</h2>
                        <p class="text-xs font-light">You are required to file an annual income tax return and pay estimated taxes quarterly. If you do gig work as an employee, your employer withholds taxes; as an independent contractor, you may need to pay estimated taxes.</p>
                        <a href="https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee" class="text-xs text-blue-500 underline mb-4">Learn More</a>
                    </div>
                </div>
                <div class="flex space-x-2 items-start mb-1">
                    <i class="fas fa-question w-6 h-6"></i>
                    <div>
                        <h2 class="text-sm font-semibold mb-1">How do I make my quarterly payments?</h2>
                        <p class="text-xs font-light">You must use Form 1040-ES to calculate and make quarterly estimated tax payments for Social Security, Medicare, and income taxes since these are not withheld by an employer.</p>
                        <a href="https://www.irs.gov/pub/irs-pdf/f1040es.pdf" class="text-xs text-blue-500 underline mb-1">Learn More</a>
                    </div>
                </div>
                <div class="flex space-x-2 items-start mb-1">
                    <i class="fas fa-question w-6 h-6"></i>
                    <div>
                        <h2 class="text-sm font-semibold mb-1">How do I file my annual return?</h2>
                        <p class="text-xs font-light">To file your annual income tax return, use Schedule C (Form 1040) to report business income or loss and Schedule SE to calculate and report Social Security and Medicare taxes.</p>
                        <a href="https://www.irs.gov/forms-pubs/about-schedule-c-form-1040" class="text-xs text-blue-500 underline mb-1">Learn More</a>
                    </div>
                </div>
                <div class="flex space-x-2 items-start mb-1">
                    <i class="fas fa-question w-6 h-6"></i>
                    <div>
                        <h2 class="text-sm font-semibold mb-1">Do I need to pay estimated taxes?</h2>
                        <p class="text-xs font-light">If you earn money from gig work as an independent contractor, you may need to pay quarterly estimated taxes to avoid penalties; employees can adjust their W-4 to withhold more tax from their paycheck instead.</p>
                        <a href="https://www.irs.gov/forms-pubs/about-form-1040-es" class="text-xs text-blue-500 underline mb-1">Learn More</a>
                    </div>
                </div>
                <div class="flex space-x-2 items-start mb-1">
                    <i class="fas fa-question w-6 h-6"></i>
                    <div>
                        <h2 class="text-sm font-semibold mb-1">Am I required to file an information return?</h2>
                        <p class="text-xs font-light">In some situations, you may be required to file an information return to the IRS.</p>
                        <a href="https://www.irs.gov/businesses/small-businesses-self-employed/am-i-required-to-file-a-form-1099-or-other-information-return" class="text-xs text-blue-500 underline mb-1">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col items-start mb-2">
            <h1 class="text-xl font-bold mb-4">Tips for effective tax management</h1>
            <h2 class="text-sm font-semibold mb-1">Track your earnings and expenses</h2>
            <p class="text-xs font-light mb-1">Collect and keep your records and receipts during the year to track income, deduct expenses, and complete your tax return. Save expense receipts to lower your taxable income, and keep records of all gig work income, even without Forms 1099.</p>
            <h2 class="text-sm font-semibold mb-1">Pay estimated tax</h2>
            <p class="text-xs font-light mb-1">As an independent contractor, pay quarterly estimated taxes to avoid penalties. Employees with gig work on the side can withhold more tax from their paycheck by adjusting Form W-4.</p>
            <h2 class="text-sm font-semibold mb-1">Get ready to file</h2>
            <p class="text-xs font-light mb-1">Collect income forms like Form 1099-K, Form 1099-MISC, Form W-2, and Form 1099-NEC by January 31. Report all income and subtract deductible expenses.</p>
            <h2 class="text-sm font-semibold mb-1">File your tax return</h2>
            <p class="text-xs font-light mb-1">Use your records to fill out: Form 1040 or Form 1040-SR, Schedule SE (Self-Employment Tax), and Schedule C (Profit or Loss from Business)</p>
            <a href="https://www.irs.gov/businesses/small-businesses-self-employed/manage-taxes-for-your-gig-work" class="text-xs text-blue-500 underline mb-4">Learn More</a>
        </div>

        <div class="flex flex-col items-start">
            <h1 class="text-xl font-bold mb-4">Recommended Resources</h1>
            <div class="flex space-x-2 items-start mb-1">
                <i class="fas fa-file-alt w-6 h-6"></i>
                <div>
                    <h2 class="text-sm font-semibold mb-1">IRS Free File</h2>
                    <p class="text-xs font-light">Use free tax prep software or fillable forms based on your income and the forms you must file.</p>
                    <a href="https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free" class="text-xs text-blue-500 underline mb-4">Learn More</a>
                </div>
            </div>
            <div class="flex space-x-2 items-start mb-1">
                <i class="fas fa-hands-helping w-6 h-6"></i>
                <div>
                    <h2 class="text-sm font-semibold mb-1">Volunteer Income Tax Assistance</h2>
                    <p class="text-xs font-light">Get free, in-person filing help near you.</p>
                    <a href="https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers" class="text-xs text-blue-500 underline mb-4">Learn More</a>
                </div>
            </div>
            <div class="flex space-x-2 items-start mb-1">
                <i class="fas fa-check-circle w-6 h-6"></i>
                <div>
                    <h2 class="text-sm font-semibold mb-1">Authorized E-file Providers</h2>
                    <p class="text-xs font-light">Search the list of tax professionals approved by the IRS for e-filing.</p>
                    <a href="https://www.irs.gov/e-file-providers/authorized-irs-e-file-providers-for-individuals" class="text-xs text-blue-500 underline mb-4">Learn More</a>
                </div>
            </div>
        </div>
    </div>
</div>
