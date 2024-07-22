<script lang="ts">
    import "../app.css";
    import { goto } from '$app/navigation';
    const registerWorker = () => {
        goto('/register_worker')
    }
    const registerPolicymaker = () => {
        goto('/register_policymaker')
    }
</script>

<main class="px-40 py-8 space-y-12 font-sans">
    <div class="p-4 rounded-lg">
        <div class="intro mx-auto max-w-screen-lg text-center md:text-left">
            <h1 class="text-4xl md:text-6xl font-bold mt-40 mb-10">Welcome to GigUnity</h1>
            <p class="text-lg mb-10">GigUnity is a worker-centered app that empowers gig workers through data sharing and collective action. It enables workers to analyze their work data, connect with peers, and gain valuable insights, while providing policymakers with crucial information to improve work conditions in the gig economy.</p>
            <div class="flex justify-center md:justify-start space-x-4">
                <button on:click={registerWorker} class="px-8 py-4 bg-black text-white rounded-full text-lg">
                    Register As a Gig Worker
                </button>
                <button on:click={registerPolicymaker} class="px-8 py-4 bg-black text-white rounded-full text-lg">
                    Register As a Gig Policymaker</button>
                <!-- <button class="px-8 py-4 bg-gray-500 text-white rounded-full text-lg">Log In</button> -->
            </div>
        </div>
    
        <div class="mb-60"></div>

        <section class="px-6 py-12 bg-gray-50">
            <h2 class="text-3xl font-bold text-center mb-12">For Gig Workers</h2>
            <div class="flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-12">
                <div class="flex-1 text-center">
                    <img src="Boost-Earnings.png" alt="Boost Earnings" class="mx-auto mb-6">
                    <h3 class="text-xl font-semibold mb-4">Boost Earnings</h3>
                    <p class="text-gray-700">Unlock data-driven strategies</p>
                </div>
                <div class="flex-1 text-center">
                    <img src="Work-Smarter.png" alt="Work Smarter" class="mx-auto mb-6">
                    <h3 class="text-xl font-semibold mb-4">Work Smarter</h3>
                    <p class="text-gray-700">Tap into collective wisdom</p>
                </div>
                <div class="flex-1 text-center">
                    <img src="Connect-&-Thrive.png" alt="Connect & Thrive" class="mx-auto mb-6">
                    <h3 class="text-xl font-semibold mb-4">Connect & Thrive</h3>
                    <p class="text-gray-700">Join a supportive community</p>
                </div>
                <div class="flex-1 text-center">
                    <img src="/Data-Control.png" alt="You're in Control" class="mx-auto mb-6">
                    <h3 class="text-xl font-semibold mb-4">You're in Control</h3>
                    <p class="text-gray-700">Manage your data, your way</p>
                </div>
            </div>
        </section>

        <section class="px-6 py-12 bg-gray-50">
            <h2 class="text-3xl font-bold text-center mb-12">For Policy Makers</h2>
            <div class="flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-12">
                <div class="flex-1 text-center">
                    <img src="/Instant-Insights.png" alt="Instant Insights" class="mx-auto mb-6" style="width: 200px; height: auto;">
                    <h3 class="text-xl font-semibold mb-4">Instant Insights</h3>
                    <p class="text-gray-700">Access real-time gig economy data</p>
                </div>
                <div class="flex-1 text-center">
                    <img src="/Smarter-Policies.png" alt="Craft Smarter Policies" class="mx-auto mb-6" style="width: 200px; height: auto;">
                    <h3 class="text-xl font-semibold mb-4">Craft Smarter Policies</h3>
                    <p class="text-gray-700">Let worker experiences and data guide you</p>
                </div>
            </div>
        </section>
        
        <section class="px-6 py-12 bg-gray-50">
            <h2 class="text-3xl font-bold text-center mb-12">How it works</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div class="text-center">
                    <img src="Registration.png" alt="User Registration" class="mx-auto mb-6">
                    <h3 class="text-xl font-semibold mb-4">User Registration</h3>
                    <p class="text-gray-700">Create your GigUnity account by your phone number and complete a short demographics form to finalize registration.</p>
                </div>
                <div class="text-center">
                    <img src="Sharing-Settings.png" alt="Choose Data to Share" class="mx-auto mb-6">
                    <h3 class="text-xl font-semibold mb-4">Choose Data to Share</h3>
                    <p class="text-gray-700">Set your preferences for data sharing and visibility to maintain control over your information.</p>
                </div>
                <div class="text-center">
                    <img src="Data-Uploading.png" alt="Upload Your Data" class="mx-auto mb-6">
                    <h3 class="text-xl font-semibold mb-4">Upload Your Data</h3>
                    <p class="text-gray-700">Easily upload your gig work data through our secure system.</p>
                </div>
                <div class="text-center">
                    <img src="Trends.png" alt="Explore Trends" class="mx-auto mb-6">
                    <h3 class="text-xl font-semibold mb-4">Explore Trends</h3>
                    <p class="text-gray-700">Access personal trends to track your performance over time. View collective insights to compare your data with aggregated statistics.</p>
                </div>
                <div class="text-center">
                    <img src="Planner.png" alt="Optimize with the Planner" class="mx-auto mb-6">
                    <h3 class="text-xl font-semibold mb-4">Optimize with the Planner</h3>
                    <p class="text-gray-700">Use Planner to strategically choose work locations and times. Leverage your historical data to improve earnings and efficiency in your gig work.</p>
                </div>
                <div class="text-center">
                    <img src="Community.png" alt="Community Engagement" class="mx-auto mb-6">
                    <h3 class="text-xl font-semibold mb-4">Community Engagement</h3>
                    <p class="text-gray-700">Connect with fellow gig workers in our community. Exchange experiences, discuss issues, and share successful strategies to thrive in the gig economy.</p>
                </div>
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
                    <br/>
                    <p class="text-gray-700">Stay tuned for more work domains and platforms!</p>
                </div>
            </div>
        </section>

        <h3 class="text-2xl font-semibold mt-10 mb-6">Funding</h3>
        <div class="flex items-center mt-10 mb-6">
            <img src="/NSF.png" alt="National Science Foundation Logo" class="mr-4" style="width: 100px; height: auto;">
            <p>GigUnity was built by a group of researchers from CMU/UT Austin. We are funded by the National Science Foundation and have no affiliation with specific platforms.</p>
        </div>
    </div>
</main>