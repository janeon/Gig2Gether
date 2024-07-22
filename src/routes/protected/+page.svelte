<script>
    import HomeCard from "$lib/components/HomeCard.svelte";
  </script>
  
<div class="flex flex-col items-center justify-center min-h-screen px-4">
    <div class="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl w-full">
      <HomeCard
        iconClass="fa-upload"
        title="Upload"
        description="Upload your daily rates and hours, etc."
        route="/protected/upload"
      />
  
      <HomeCard
        iconClass="fa-book"
        title="Stories"
        description="Share your strategies and issues with others, etc."
        route="/protected/stories"
      />
  
      <HomeCard
        iconClass="fa-chart-line"
        title="Trends"
        description="Here are some visualizations of your and others' work/earning trends."
        route="/protected" 
      />
  
      <HomeCard
        iconClass="fa-cog"
        title="Settings"
        description="Manage your worker profile, sharing preferences, and more."
        route="/protected/settings/account" 
      />

      <HomeCard
        iconClass="fa-calendar"
        title="Planner"
        description="Plan work schedules, locations, long-term earnings, etc."
        route="/protected" 
      />

    </div>
  </div>
  