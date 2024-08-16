<script lang="ts">
	import '@fortawesome/fontawesome-free/css/all.min.css';
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
			new Date(year, 5, 17), // June 15
			new Date(year, 8, 16), // September 15
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
		const diff = nextTaxDate.getTime() - now.getTime();

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
	<div class="w-full flex flex-col p-2 space-y-4">
		<div class="flex flex-col items-start bg-gray-100 p-4 rounded-lg">
			<div class="text-left mb-4">
				<h1 class="text-2xl font-bold mb-4 text-black">
					The next <a
							href="https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes"
							target="_blank"
							class="text-blue-500 underline">estimated tax payment</a>
					day is {getNextTaxDate().toLocaleDateString()}
				</h1>
				<div class="flex justify-center space-x-4 text-center">
					<div class="bg-white p-2 rounded shadow">
						<div class="font-bold text-3xl text-black">{countdown.days}</div>
						<div class="text-sm">Days</div>
					</div>
					<div class="bg-white p-2 rounded shadow">
						<div class="font-bold text-3xl text-black">{countdown.hours}</div>
						<div class="text-sm">Hours</div>
					</div>
					<div class="bg-white p-2 rounded shadow">
						<div class="font-bold text-3xl text-black">{countdown.minutes}</div>
						<div class="text-sm">Minutes</div>
					</div>
					<div class="bg-white p-2 rounded shadow">
						<div class="font-bold text-3xl text-black">{countdown.seconds}</div>
						<div class="text-sm">Seconds</div>
					</div>
				</div>
			</div>
			<div class="mt-4 bg-white p-4 rounded shadow">
				<p class="text-sm font-light mb-4">
					In most cases, <span class="font-semibold"
						>you must pay estimated tax for the current year</span
					> if both of the following apply:
				</p>
				<ul class="list-disc list-inside text-sm font-light mb-4 space-y-2">
					<li>
						You expect to owe at least $1,000 in tax for the current year, after subtracting your
						withholding and refundable credits.
					</li>
					<li>
						You expect your withholding and refundable credits to be less than the smaller of:
						<ul class="list-decimal list-inside ml-6 space-y-2">
							<li>90% of the tax to be shown on your 2024 tax return, or</li>
							<li>
								100% of the tax shown on your 2023 tax return. Your 2023 tax return must cover all
								12 months.
							</li>
						</ul>
					</li>
				</ul>
				<p class="text-sm font-light mb-4">
					You can pay <span class="font-semibold">all</span> of your estimated tax by 4/15/2024, or
					in <span class="font-semibold">four equal amounts</span> by 4/15/2024, 6/17/2024, 9/16/2024,
					and 1/15/2025.
				</p>
				<p class="text-sm font-light mb-4">
					<span class="font-semibold">You don't have to pay estimated tax for the current year</span
					> if you were a U.S. citizen or resident for all of last year and had no tax liability (your
					total tax was zero or you didn’t need to file a return).
				</p>
				<a
					href="https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes"
					target="_blank"
					class="text-sm text-blue-500 underline font-semibold">Learn More</a
				>
			</div>
		</div>
		<div class="flex flex-col items-start bg-gray-100 p-4 rounded-lg">
			<h1 class="text-2xl font-bold mb-4 text-black">What you need to know</h1>
			<div class="flex flex-col space-y-4">
				<div class="flex space-x-2 items-start mb-1">
					<i class="fas fa-clipboard-list w-6 h-6 text-black"></i>
					<div>
						<h2 class="text-lg font-semibold mb-1 text-black">What are my tax obligations?</h2>
						<p class="text-sm font-light">
							As a self-employed individual, generally you are required to file an <span
								class="font-semibold">annual income tax return</span
							>
							and pay
							<a
								href="https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes"
								target="_blank"
								class="text-blue-500 underline">estimated tax</a
							> quarterly.
						</p>
						{#if showMoreObligations}
							<p class="text-sm font-light">
								<span class="font-semibold">Self-employed individuals</span> generally must pay self-employment
								(SE) tax as well as income tax. SE tax is a Social Security and Medicare tax primarily
								for individuals who work for themselves. It is similar to the Social Security and Medicare
								taxes withheld from the pay of most wage earners. In general, the wording "self-employment
								tax" only refers to Social Security and Medicare taxes and not any other tax (like income
								tax).
							</p>
							<p class="text-sm font-light">
								Before you can determine if you are subject to self-employment tax and income tax,
								you must figure any <span class="font-semibold">net profit or net loss</span> from
								your business. You do this by subtracting your business expenses from your business
								income. If your expenses are less than your income, the difference is net profit and
								becomes part of your income on page 1 of Form 1040 or 1040-SR. If your expenses are
								more than your income, the difference is a net loss. You usually can deduct your
								loss from gross income on page 1 of Form 1040 or 1040-SR. But in some situations
								your loss is limited. See
								<a
									href="https://www.irs.gov/forms-pubs/about-publication-334"
									target="_blank"
									class="text-blue-500 underline"
									>Publication 334, Tax Guide for Small Business (For Individuals Who Use Schedule
									C)</a
								>, for more information.
							</p>
							<p class="text-sm font-light">
								You have to file an income tax return if your <span class="font-semibold"
									>net earnings from self-employment were $400 or more.</span
								>
								If your net earnings from self-employment were less than $400, you still have to
								file an income tax return if you meet any other filing requirement listed in the
								<a
									href="https://www.irs.gov/pub/irs-pdf/i1040gi.pdf"
									target="_blank"
									class="text-blue-500 underline">Form 1040 and 1040-SR instructions</a
								>.
							</p>
						{/if}
						<button
							on:click={() => (showMoreObligations = !showMoreObligations)}
							on:keydown={handleKeydown}
							class="text-sm text-blue-500 underline mb-4 cursor-pointer font-semibold"
						>
							{showMoreObligations ? 'Show Less' : 'Show More'}
						</button>
					</div>
				</div>

				<div class="flex space-x-2 items-start mb-1">
					<i class="fas fa-calendar-alt w-6 h-6 text-black"></i>
					<div>
						<h2 class="text-lg font-semibold mb-1 text-black">
							How do I make my quarterly payments?
						</h2>
						<p class="text-sm font-light">
							As a self-employed individual, <span class="font-semibold">estimated tax</span> is the
							method used to pay Social Security, Medicare, and income taxes; this is because you do
							not have an employer withholding these taxes for you.
						</p>
						{#if showMoreQuarterlyPayments}
							<p class="text-sm font-light">
								<a
									href="https://www.irs.gov/pub/irs-pdf/f1040es.pdf"
									target="_blank"
									class="text-blue-500 underline">Form 1040-ES, Estimated Tax for Individuals</a
								>, is used to figure these taxes. Form 1040-ES contains a worksheet that is similar
								to Form 1040 or 1040-SR. You will need your prior year's annual income tax return in
								order to fill out Form 1040-ES.
							</p>
							<p class="text-sm font-light">
								Use the worksheet found in <a
									href="https://www.irs.gov/pub/irs-pdf/f1040es.pdf"
									target="_blank"
									class="text-blue-500 underline">Form 1040-ES</a
								> to find out if you are required to pay estimated taxes quarterly.
							</p>
							<p class="text-sm font-light">
								<a
									href="https://www.irs.gov/pub/irs-pdf/f1040es.pdf"
									target="_blank"
									class="text-blue-500 underline">Form 1040-ES</a
								>
								also contains blank vouchers you can use to mail your estimated tax payments. Other
								payment options, including pay by phone and online methods, can be found at
								<a
									href="https://www.irs.gov/payments"
									target="_blank"
									class="text-blue-500 underline">IRS.gov/payments</a
								>. If this is your first year being self-employed, you will need to estimate the
								amount of income you expect to earn for the year. If you estimated your annual
								earnings too high, simply complete another Form 1040-ES worksheet to refigure your
								estimated tax for the next quarter. If you estimated your annual earnings too low,
								again complete another Form 1040-ES worksheet to recalculate your estimated taxes
								for the next quarter.
							</p>
							<p class="text-sm font-light">
								See the <a
									href="https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes"
									target="_blank"
									class="text-blue-500 underline">estimated tax</a
								>
								page for more information. The
								<a
									href="https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes"
									target="_blank"
									class="text-blue-500 underline">self-employment</a
								> tax page has more information on Social Security and Medicare taxes.
							</p>
						{/if}
						<button
							on:click={() => (showMoreQuarterlyPayments = !showMoreQuarterlyPayments)}
							on:keydown={handleKeydownScheduleC}
							class="text-sm text-blue-500 underline mb-4 cursor-pointer font-semibold"
						>
							{showMoreQuarterlyPayments ? 'Show Less' : 'Show More'}
						</button>
					</div>
				</div>

				<div class="flex space-x-2 items-start mb-1">
					<i class="fas fa-file-alt w-6 h-6 text-black"></i>
					<div>
						<h2 class="text-lg font-semibold mb-1 text-black">How do I file my annual return?</h2>
						<p class="text-sm font-light">
							To file your annual income tax return, you will need to use <a
								href="https://www.irs.gov/forms-pubs/about-schedule-c-form-1040"
								target="_blank"
								class="text-blue-500 underline"
								>Schedule C (Form 1040), Profit or Loss from Business (Sole Proprietorship)</a
							>, to report any income or loss from a business you operated or profession you
							practiced as a sole proprietor, or
							<a
								href="https://www.irs.gov/businesses/gig-economy-tax-center"
								target="_blank"
								class="text-blue-500 underline">gig work</a
							> performed.
						</p>
						{#if showMoreAnnualReturn}
							<p class="text-sm font-light">
								<a
									href="https://www.irs.gov/pub/irs-pdf/i1040sc.pdf"
									target="_blank"
									class="text-blue-500 underline">Schedule C instructions</a
								> may be helpful in filling out this form.
							</p>
							<p class="text-sm font-light">
								In order to report your Social Security and Medicare taxes, you must file <a
									href="https://www.irs.gov/pub/irs-pdf/f1040sse.pdf"
									target="_blank"
									class="text-blue-500 underline"
									>Schedule SE (Form 1040 or 1040-SR), Self-Employment Tax</a
								>. Use the income or loss calculated on Schedule C to calculate the amount of Social
								Security and Medicare taxes you should have paid during the year. The
								<a
									href="https://www.irs.gov/pub/irs-pdf/i1040sse.pdf"
									target="_blank"
									class="text-blue-500 underline">instructions for Schedule SE</a
								> may be helpful in filing out the form.
							</p>
						{/if}
						<button
							on:click={() => (showMoreAnnualReturn = !showMoreAnnualReturn)}
							on:keydown={handleKeydownEstimatedTax}
							class="text-sm text-blue-500 underline mb-4 cursor-pointer font-semibold"
						>
							{showMoreAnnualReturn ? 'Show Less' : 'Show More'}
						</button>
					</div>
				</div>

				<div class="flex space-x-1 items-start mb-1">
					<i class="fas fa-info-circle w-6 h-6 text-black"></i>
					<div>
						<h2 class="text-lg font-semibold mb-1 text-black">
							Am I required to file an information return?
						</h2>
						<p class="text-sm font-light">
							If you made a payment as a small business or self-employed (individual), you are most
							likely required to file an information return to the IRS.
						</p>
						{#if showMoreInformationReturn}
							<p class="text-sm font-light">
								In some situations, if you received a payment as a small business or self-employed
								(individual), you may be required to file an information return to the IRS. See, <a
									href="https://www.irs.gov/businesses/small-businesses-self-employed/am-i-required-to-file-a-form-1099-or-other-information-return"
									target="_blank"
									class="text-blue-500 underline"
									>Am I required to file a Form 1099 or other information return</a
								>, for additional information.
							</p>
						{/if}
						<button
							on:click={() => (showMoreInformationReturn = !showMoreInformationReturn)}
							on:keydown={handleKeydownInformationReturn}
							class="text-sm text-blue-500 underline mb-4 cursor-pointer font-semibold"
						>
							{showMoreInformationReturn ? 'Show Less' : 'Show More'}
						</button>
					</div>
				</div>

				<div class="flex space-x-1 items-start mb-1">
					<i class="fas fa-lightbulb w-6 h-6 text-black"></i>
					<a
						href="https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center"
						class="text-sm text-blue-500 underline mb-4 font-semibold"
						target="_blank"
						rel="noopener noreferrer">Learn More In the Tax Center</a
					>
				</div>
			</div>
		</div>

		<div class="flex flex-col items-start bg-gray-100 p-4 rounded-lg">
			<h1 class="text-2xl font-bold mb-4 text-black">Tips for effective tax management</h1>
			<h2 class="text-lg font-semibold mb-2">Track your earnings and expenses</h2>
			<p class="text-sm font-light mb-4">
				Collect and keep your records and receipts during the year. <a
					href="https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping"
					class="text-sm text-blue-500 underline mb-4"
					target="_blank"
					rel="noopener noreferrer">Recordkeeping</a
				>
				can help you track your income, deduct expenses and complete your tax return. Save expense
				receipts to lower your taxable income, and keep records of all gig work income,
				<span class="font-semibold">even without Forms 1099.</span>
			</p>
			<h2 class="text-lg font-semibold mb-2">Pay estimated tax</h2>
			<p class="text-sm font-light mb-4">
				As an independent contractor, pay quarterly estimated taxes to avoid penalties. Employees
				with gig work on the side may avoid making estimated tax payments on their gig income by
				withholding more tax from their employee paycheck. Use the <a
					href="https://www.irs.gov/individuals/tax-withholding-estimator"
					target="_blank"
					class="text-blue-500 underline">Tax Withholding Estimator</a
				>. Then fill out a new Form W-4, Employee’s Withholding Certificate and give it to
				employers.
			</p>
			<h2 class="text-lg font-semibold mb-2">Get ready to file</h2>
			<p class="text-sm font-light mb-4">
				Collect income forms like Form 1099-K, Form 1099-MISC, Form W-2, and Form 1099-NEC by
				January 31. Report all income and subtract <a
					href="https://www.irs.gov/forms-pubs/guide-to-business-expense-resources"
					target="_blank"
					class="text-blue-500 underline">deductible expenses</a
				>.
			</p>
			<h2 class="text-lg font-semibold mb-2">File your tax return</h2>
			<p class="text-sm font-light mb-4">
				Use your records to fill out: Form 1040 or Form 1040-SR, Schedule SE (Self-Employment Tax),
				and Schedule C (Profit or Loss from Business)
			</p>
			<a
				href="https://www.irs.gov/businesses/small-businesses-self-employed/manage-taxes-for-your-gig-work"
				class="text-sm text-blue-500 underline mb-4 font-semibold"
				target="_blank"
				rel="noopener noreferrer">Learn More</a
			>
		</div>

		<div class="flex flex-col items-start bg-gray-100 p-4 rounded-lg">
			<h1 class="text-2xl font-bold mb-4 text-black">Recommended Resources</h1>
			<div class="flex space-x-2 items-start mb-4">
				<i class="fas fa-file-alt w-6 h-6 text-black"></i>
				<div>
					<h2 class="text-lg font-semibold mb-2">IRS Free File</h2>
					<p class="text-sm font-light mb-2">
						Use free tax prep software or fillable forms based on your income and the forms you must
						file.
					</p>
					<a
						href="https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free"
						class="text-sm text-blue-500 underline font-semibold"
						target="_blank"
						rel="noopener noreferrer">Learn More</a
					>
				</div>
			</div>
			<div class="flex space-x-2 items-start mb-4">
				<i class="fas fa-hands-helping w-6 h-6 text-black"></i>
				<div>
					<h2 class="text-lg font-semibold mb-2">Volunteer Income Tax Assistance</h2>
					<p class="text-sm font-light mb-2">Get free, in-person filing help near you.</p>
					<a
						href="https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers"
						class="text-sm text-blue-500 underline font-semibold"
						target="_blank"
						rel="noopener noreferrer">Learn More</a
					>
				</div>
			</div>
			<div class="flex space-x-2 items-start mb-4">
				<i class="fas fa-check-circle w-6 h-6 text-black"></i>
				<div>
					<h2 class="text-lg font-semibold mb-2">Authorized E-file Providers</h2>
					<p class="text-sm font-light mb-2">
						Search the list of tax professionals approved by the IRS for e-filing.
					</p>
					<a
						href="https://www.irs.gov/e-file-providers/authorized-irs-e-file-providers-for-individuals"
						class="text-sm text-blue-500 underline font-semibold"
						target="_blank"
						rel="noopener noreferrer">Learn More</a
					>
				</div>
			</div>
		</div>
		<div class="flex flex-col items-start bg-gray-100 p-4 rounded-lg">
			<p class="text-sm font-light mb-2">
				<span class="font-semibold">Please note</span>: As this system is still in the early stages
				of development, it currently does not have the capability to estimate tax obligations. We
				appreciate your understanding as we continue to enhance its functionality.
			</p>
		</div>
	</div>
</div>
