<script lang="ts">
    import { goto } from "$app/navigation";
    import '@fortawesome/fontawesome-free/css/all.min.css';
    import { Button } from "flowbite-svelte";
    import { onMount } from 'svelte';

    let countdown = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    let showMoreObligations = false;
    let showMoreQuarterlyPayments = false;
    let showMoreAnnualReturn = false;
    let showMoreInformationReturn = false;

    function getNextTaxDate() {
        const now = new Date();
        const year = now.getFullYear();
        const dates = [
            new Date(year, 3, 15), // April 15
            new Date(year, 5, 15), // June 15
            new Date(year, 8, 15), // September 15
            new Date(year + 1, 0, 15) // January 15 next year
        ];

        for (const date of dates) {
            if (now < date) return date;
        }
        return new Date(year + 1, 3, 15); // Next April 15
    }

    function updateCountdown() {
        const nextTaxDate = getNextTaxDate();
        const now = new Date();
        const diff = nextTaxDate.getTime() - now.getTime(); // Ensure this is a number

        countdown.days = Math.floor(diff / (1000 * 60 * 60 * 24));
        countdown.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        countdown.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        countdown.seconds = Math.floor((diff % (1000 * 60)) / 1000);
    }

    onMount(() => {
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    });

    function handleKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            showMoreObligations = !showMoreObligations;
        }
    }

    function handleKeydownScheduleC(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            showMoreQuarterlyPayments = !showMoreQuarterlyPayments;
        }
    }

    function handleKeydownEstimatedTax(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            showMoreAnnualReturn = !showMoreAnnualReturn;
        }
    }

    function handleKeydownInformationReturn(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            showMoreInformationReturn = !showMoreInformationReturn;
        }
    }
</script>

<div class="flex flex-row">
    <div class="w-full flex flex-col p-2 space-y-2">
        <div class="flex flex-col items-start">
            <div class="text-left mb-4">
                <h1 class="text-xl font-bold mb-4">The next <a href="https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes" target="_blank" class="text-blue-500 underline">estimated tax payment</a> day is {getNextTaxDate().toLocaleDateString()}</h1>
                <div class="flex justify-center space-x-4 text-center">
                    <div>
                        <div class="font-bold text-2xl">{countdown.days}</div>
                        <div>Days</div>
                    </div>
                    <div>
                        <div class="font-bold text-2xl">{countdown.hours}</div>
                        <div>Hours</div>
                    </div>
                    <div>
                        <div class="font-bold text-2xl">{countdown.minutes}</div>
                        <div>Minutes</div>
                    </div>
                    <div>
                        <div class="font-bold text-2xl">{countdown.seconds}</div>
                        <div>Seconds</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col items-start">
            <h1 class="text-xl font-bold mb-4">What you need to know</h1>
                <div class="flex flex-col">
                <div class="flex space-x-2 items-start mb-1">
                    <i class="fas fa-clipboard-list w-6 h-6"></i>
                    <div>
                        <h2 class="text-sm font-semibold mb-1">What are my tax obligations?</h2>
                        <p class="text-xs font-light">As a self-employed individual, generally you are required to file an annual income tax return and pay <a href="https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes" target="_blank" class="text-blue-500 underline">estimated tax</a> quarterly.</p> 
                        {#if showMoreObligations}
                            <p class="text-xs font-light">Self-employed individuals generally must pay self-employment (SE) tax as well as income tax. SE tax is a Social Security and Medicare tax primarily for individuals who work for themselves. It is similar to the Social Security and Medicare taxes withheld from the pay of most wage earners. In general, the wording "self-employment tax" only refers to Social Security and Medicare taxes and not any other tax (like income tax).</p>
                            <p class="text-xs font-light">Before you can determine if you are subject to self-employment tax and income tax, you must figure any net profit or net loss from your business. You do this by subtracting your business expenses from your business income. If your expenses are less than your income, the difference is net profit and becomes part of your income on page 1 of Form 1040 or 1040-SR. If your expenses are more than your income, the difference is a net loss. You usually can deduct your loss from gross income on page 1 of Form 1040 or 1040-SR. But in some situations your loss is limited. See <a href="https://www.irs.gov/forms-pubs/about-publication-334" target="_blank" class="text-blue-500 underline">Publication 334, Tax Guide for Small Business (For Individuals Who Use Schedule C)</a>, for more information.</p>
                            <p class="text-xs font-light">You have to file an income tax return if your net earnings from self-employment were $400 or more. If your net earnings from self-employment were less than $400, you still have to file an income tax return if you meet any other filing requirement listed in the <a href="https://www.irs.gov/pub/irs-pdf/i1040gi.pdf" target="_blank" class="text-blue-500 underline">Form 1040 and 1040-SR instructions</a>.</p>
                        {/if}
                        <button on:click={() => showMoreObligations = !showMoreObligations} on:keydown={handleKeydown} class="text-xs text-blue-500 underline mb-4 cursor-pointer">
                            {showMoreObligations ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                </div>
                <div class="flex space-x-2 items-start mb-1">
                    <i class="fas fa-calendar-alt w-6 h-6"></i>
                    <div>
                        <h2 class="text-sm font-semibold mb-1">How do I make my quarterly payments?</h2>
                        <p class="text-xs font-light">As a self-employed individual, estimated tax is the method used to pay Social Security, Medicare, and income taxes; this is because you do not have an employer withholding these taxes for you.</p>
                        {#if showMoreQuarterlyPayments}
                            <p class="text-xs font-light"><a href="https://www.irs.gov/pub/irs-pdf/f1040es.pdf" target="_blank" class="text-blue-500 underline">Form 1040-ES, Estimated Tax for Individuals</a>, is used to figure these taxes. Form 1040-ES contains a worksheet that is similar to Form 1040 or 1040-SR. You will need your prior year’s annual income tax return in order to fill out Form 1040-ES.</p>
                            <p class="text-xs font-light">Use the worksheet found in <a href="https://www.irs.gov/pub/irs-pdf/f1040es.pdf" target="_blank" class="text-blue-500 underline">Form 1040-ES</a> to find out if you are required to pay estimated taxes quarterly.</p>
                            <p class="text-xs font-light"><a href="https://www.irs.gov/pub/irs-pdf/f1040es.pdf" target="_blank" class="text-blue-500 underline">Form 1040-ES</a> also contains blank vouchers you can use to mail your estimated tax payments. Other payment options, including pay by phone and online methods, can be found at IRS.gov/payments. If this is your first year being self-employed, you will need to estimate the amount of income you expect to earn for the year. If you estimated your annual earnings too high, simply complete another Form 1040-ES worksheet to refigure your estimated tax for the next quarter. If you estimated your annual earnings too low, again complete another Form 1040-ES worksheet to recalculate your estimated taxes for the next quarter.</p>
                            <p class="text-xs font-light">See the <a href="https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes" target="_blank" class="text-blue-500 underline">estimated tax</a> page for more information. The <a href="https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes" target="_blank" class="text-blue-500 underline">self-employment</a> tax page has more information on Social Security and Medicare taxes.</p>
                        {/if}
                        <button on:click={() => showMoreQuarterlyPayments = !showMoreQuarterlyPayments} on:keydown={handleKeydown} class="text-xs text-blue-500 underline mb-4 cursor-pointer">
                            {showMoreQuarterlyPayments ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                </div>
                <div class="flex space-x-2 items-start mb-1">
                    <i class="fas fas fa-file-alt w-6 h-6"></i>
                    <div>
                        <h2 class="text-sm font-semibold mb-1">How do I file my annual return?</h2>
                        <p class="text-xs font-light">To file your annual income tax return, you will need to use <a href="https://www.irs.gov/forms-pubs/about-schedule-c-form-1040" target="_blank" class="text-blue-500 underline">Schedule C (Form 1040), Profit or Loss from Business (Sole Proprietorship)</a>, to report any income or loss from a business you operated or profession you practiced as a sole proprietor, or <a href="https://www.irs.gov/businesses/gig-economy-tax-center" target="_blank" class="text-blue-500 underline">gig work</a> performed.</p>
                        {#if showMoreAnnualReturn}
                            <p class="text-xs font-light"><a href="https://www.irs.gov/pub/irs-pdf/i1040sc.pdf" target="_blank" class="text-blue-500 underline">Schedule C instructions</a> may be helpful in filling out this form.</p>
                            <p class="text-xs font-light">In order to report your Social Security and Medicare taxes, you must file <a href="https://www.irs.gov/pub/irs-pdf/f1040sse.pdf" target="_blank" class="text-blue-500 underline">Schedule SE (Form 1040 or 1040-SR), Self-Employment Tax</a>. Use the income or loss calculated on Schedule C to calculate the amount of Social Security and Medicare taxes you should have paid during the year. The <a href="https://www.irs.gov/pub/irs-pdf/i1040sse.pdf" target="_blank" class="text-blue-500 underline">instructions for Schedule SE</a> may be helpful in filing out the form.</p>
                        {/if}
                
                        <button on:click={() => showMoreAnnualReturn = !showMoreAnnualReturn} on:keydown={handleKeydownScheduleC} class="text-xs text-blue-500 underline mb-4 cursor-pointer">
                            {showMoreAnnualReturn ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                </div>
                <div class="flex space-x-1 items-start mb-1">
                    <i class="fas fas fa-info-circle w-6 h-6"></i>
                    <div>
                        <h2 class="text-sm font-semibold mb-1">Am I required to file an information return?</h2>
                        <p class="text-xs font-light">If you made a payment as a small business or self-employed (individual), you are most likely required to file an information return to the IRS.</p>
                        {#if showMoreInformationReturn}
                            <p class="text-xs font-light">In some situations, if you received a payment as a small business or self-employed (individual), you may be required to file an information return to the IRS. See, <a href="https://www.irs.gov/businesses/small-businesses-self-employed/am-i-required-to-file-a-form-1099-or-other-information-return" target="_blank" class="text-blue-500 underline">Am I required to file a Form 1099 or other information return</a>, for additional information.</p>
                        {/if}
                    
                        <button on:click={() => showMoreInformationReturn = !showMoreInformationReturn} on:keydown={handleKeydownScheduleC} class="text-xs text-blue-500 underline mb-4 cursor-pointer">
                            {showMoreInformationReturn ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                </div>
                <div class="flex space-x-1 items-start mb-1">
                    <i class="fas fas fa-lightbulb w-6 h-6"></i>
                    <a href="https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center" class="text-xs text-blue-500 underline mb-4" target="_blank" rel="noopener noreferrer">Learn More In the Tax Center</a>
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
            <a href="https://www.irs.gov/businesses/small-businesses-self-employed/manage-taxes-for-your-gig-work" class="text-xs text-blue-500 underline mb-4" target="_blank" rel="noopener noreferrer">Learn More</a>
        </div>

        <div class="flex flex-col items-start">
            <h1 class="text-xl font-bold mb-4">Recommended Resources</h1>
            <div class="flex space-x-2 items-start mb-1">
                <i class="fas fa-file-alt w-6 h-6"></i>
                <div>
                    <h2 class="text-sm font-semibold mb-1">IRS Free File</h2>
                    <p class="text-xs font-light">Use free tax prep software or fillable forms based on your income and the forms you must file.</p>
                    <a href="https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free" class="text-xs text-blue-500 underline mb-4" target="_blank" rel="noopener noreferrer">Learn More</a>
                </div>
            </div>
            <div class="flex space-x-2 items-start mb-1">
                <i class="fas fa-hands-helping w-6 h-6"></i>
                <div>
                    <h2 class="text-sm font-semibold mb-1">Volunteer Income Tax Assistance</h2>
                    <p class="text-xs font-light">Get free, in-person filing help near you.</p>
                    <a href="https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers" class="text-xs text-blue-500 underline mb-4" target="_blank" rel="noopener noreferrer">Learn More</a>
                </div>
            </div>
            <div class="flex space-x-2 items-start mb-1">
                <i class="fas fa-check-circle w-6 h-6"></i>
                <div>
                    <h2 class="text-sm font-semibold mb-1">Authorized E-file Providers</h2>
                    <p class="text-xs font-light">Search the list of tax professionals approved by the IRS for e-filing.</p>
                    <a href="https://www.irs.gov/e-file-providers/authorized-irs-e-file-providers-for-individuals" class="text-xs text-blue-500 underline mb-4" target="_blank" rel="noopener noreferrer">Learn More</a>
                </div>
            </div>
        </div>
    </div>
</div>
