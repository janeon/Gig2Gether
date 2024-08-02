<script>
    import { Button } from 'flowbite-svelte';
    import "../app.css";
    import { goto } from '$app/navigation';    
  
    const sections = [
      {
        title: 'For Gig Workers',
        items: [
          { img: '/Boost-Earnings.png', heading: 'Boost Earnings', text: 'Unlock data-driven strategies' },
          { img: '/Work-Smarter.png', heading: 'Work Smarter', text: 'Tap into collective wisdom' },
          { img: '/Connect-&-Thrive.png', heading: 'Connect & Thrive', text: 'Join a supportive community' },
          { img: '/Data-Control.png', heading: 'You\'re in Control', text: 'Manage your data, your way' }
        ]
      },
      {
        title: 'For Policy Makers',
        items: [
          { img: '/Instant-Insights.png', heading: 'Instant Insights', text: 'Access real-time gig economy data' },
          { img: '/Smarter-Policies.png', heading: 'Craft Smarter Policies', text: 'Let worker experiences and data guide you' }
        ]
      }
    ];
  
    const howItWorks = [
      { img: '/Registration.png', heading: 'User Registration', text: 'Create your Gig2Gether account by your phone number and complete a short demographics form to finalize registration.' },
      { img: '/Sharing-Settings.png', heading: 'Choose Data to Share', text: 'Set your preferences for data sharing and visibility to maintain control over your information.' },
      { img: '/Data-Uploading.png', heading: 'Upload Your Data', text: 'Easily upload your gig work data through our secure system.' },
      { img: '/Trends.png', heading: 'Explore Trends', text: 'Access personal trends to track your performance over time. View collective insights to compare your data with aggregated statistics.' },
      { img: '/Planner.png', heading: 'Optimize with the Planner', text: 'Use Planner to strategically choose work locations and times. Leverage your historical data to improve earnings and efficiency in your gig work.' },
      { img: '/Community.png', heading: 'Community Engagement', text: 'Connect with fellow gig workers in our community. Exchange experiences, discuss issues, and share successful strategies to thrive in the gig economy.' }
    ];
  </script>
  
  <main class="px-4 md:px-20 lg:px-40 py-8 space-y-12 font-sans">
    <div class="p-4 rounded-lg">
      <div class="intro mx-auto max-w-screen-lg text-center md:text-left">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mt-20 mb-10">Welcome to Gig2Gether</h1>
        <p class="text-base md:text-lg mb-10">
          Gig2Gether is a worker-centered app that empowers gig workers through data sharing and collective action. It enables workers to analyze their work data, connect with peers, and gain valuable insights, while providing policymakers with crucial information to improve work conditions in the gig economy.
        </p>
        <div class="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
          <Button on:click={() => goto('register-worker')} color="dark" size="lg">
            Register As a Gig Worker
          </Button>
          <Button on:click={() => goto('register-policymaker')} color="dark" size="lg">
            Register As a Gig Policymaker
          </Button>
        </div>
      </div>
  
      <div class="mb-60"></div>
  
      {#each sections as section}
      <section class="px-6 py-12 bg-gray-50">
        <h2 class="text-3xl font-bold text-center mb-12">{section.title}</h2>
        <div class="flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-12">
          {#each section.items as item}
          <div class="flex-1 text-center">
            <img src={item.img} alt={item.heading} class="mx-auto mb-6" style="width: 200px; height: auto;">
            <h3 class="text-xl font-semibold mb-4">{item.heading}</h3>
            <p class="text-gray-700">{item.text}</p>
          </div>
          {/each}
        </div>
      </section>
      {/each}
  
      <section class="px-6 py-12 bg-gray-50">
        <h2 class="text-3xl font-bold text-center mb-12">How it works</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {#each howItWorks as item}
          <div class="text-center">
            <img src={item.img} alt={item.heading} class="mx-auto mb-6">
            <h3 class="text-xl font-semibold mb-4">{item.heading}</h3>
            <p class="text-gray-700">{item.text}</p>
          </div>
          {/each}
        </div>
      </section>
  
      <section class="px-6 py-12">
        <div class="flex flex-col md:flex-row items-center space-y-6 md:space-y-0">
          <div class="flex-1">
            <img src="/Platform.png" alt="Platform" class="mx-auto" style="width: 300px; height: auto;">
          </div>
          <div class="flex-1 text-center md:text-left">
            <h2 class="text-3xl font-bold mb-4">Supported Platforms</h2>
            <p class="text-gray-700">We support gig work platforms for ride-sharing services, pet sitting/care, as well as freelance work.</p>
            <p class="text-gray-700 mt-4">Stay tuned for more work domains and platforms!</p>
          </div>
        </div>
      </section>
  
      <h3 class="text-2xl font-semibold mt-10 mb-6">Funding</h3>
      <div class="flex items-center mt-10 mb-6">
        <img src="/NSF.png" alt="National Science Foundation Logo" class="mr-4" style="width: 100px; height: auto;">
        <p>Gig2Gether was built by a group of researchers from CMU/UT Austin. We are funded by the National Science Foundation and have no affiliation with specific platforms.</p>
      </div>
    </div>
  </main>
  