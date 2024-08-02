<script lang="ts">
  import TrendsSidebar from "$lib/components/TrendsSidebar.svelte";
  import { Chart, Card, Tooltip, Button } from 'flowbite-svelte';
  import { page } from "$app/stores";

  let seriesData = [];

  // Conditionally create the series data based on the user platform
  // Static can query into
  if ($page.data.user?.platform == "uber") {
    seriesData = [
      { x: '12am', y: 0.50 },
      { x: '4am', y: 0.75 },
      { x: '8am', y: 1.20 },
      { x: '12pm', y: 1.50 },
      { x: '4pm', y: 2.00 },
      { x: '8pm', y: 1.50 }
    ];
  } else if ($page.data.user?.platform == "rover") {
    seriesData = [
      { x: '12am', y: 0.50 },
      { x: '4am', y: 0.75 },
      { x: '8am', y: 1.20 },
      { x: '12pm', y: 1.50 },
      { x: '4pm', y: 2.00 },
      { x: '8pm', y: 1.50 }
    ];
  } else if ($page.data.user?.platform == "upwork") {
    seriesData = [
      { x: 'January', y: 0.0 },
      { x: 'February', y: 800.0 },
      { x: 'March', y: 1000.0 },
      { x: 'April', y: 1200.2 },
      { x: 'May', y:  3000.34 },
      { x: 'June', y: 1115.0 },
      { x: 'July', y: 4440.0 },
      { x: 'August', y: 500.0 },
      { x: 'September', y: 200.0},
      { x: 'October', y: 2000.0 },
      { x: 'November', y: 1200.0 },
      { x: 'December', y: 200.0},
    ];
  }

  const options = {
    colors: ['#1A56DB', '#FDBA8C'],
    series: [
      {
        name: 'Fair Per Minute ($)',
        color: '#1A56DB',
        data: seriesData
      }
    ],
    chart: {
      type: 'bar',
      height: '320px',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
        borderRadiusApplication: 'end',
        borderRadius: 8
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 1
        }
      }
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent']
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -14
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      floating: false,
      labels: {
        show: true,
        style: {
          fontFamily: 'Inter, sans-serif',
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    fill: {
      opacity: 1
    }
  };

</script>

<div class="flex flex-row">
  <div class="w-1/4 p-2">
    <TrendsSidebar />
  </div>

  <div class="flex flex-col items-center w-3/4 p-2">
    <div class="justify-center">
      <h1 class="font-bold">Configure Visualization</h1>
    </div>

    <div class="flex-col mt-3">
      <div class = "w-1/2">
        <Card>
          <div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center">
              <div>
                <h3 class="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
                  {#if $page.data.user?.platform == "uber"}
                  Driver Earnings Per Hour
                  {:else if $page.data.user?.platform == "rover"} 
                  Worker Earnings Per Hour
                  {:else if $page.data.user?.platform == "upwork"} 
                  Earnings Per Month
                  {/if}
                </h3>
              </div>
            </div>
          </div>
          <Chart {options} />
          <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
            <div class="flex justify-between items-center pt-5">
              <h1 class="uppercase text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2 hover:no-underline">
                {#if $page.data.user?.platform == "uber"}
                Pickup Time (Hours of the Day)
                {:else if $page.data.user?.platform == "rover"} 
                Hours of the Day
                {:else if $page.data.user?.platform == "upwork"} 
                Days of the Month
                {/if}
              </h1>
            </div>
          </div>
        </Card>
      </div>

      <div class = "w-1/2">
            Calendar
      </div>
    </div>

    <div class="justify-center mt-4">
      <div class="justify-center mt-4">
        <Card>
          <div class="flex flex-col">
            <h1 class="font-bold text-black mb-3">Other Information</h1>
            <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-3">
              Average Job Length: 1 Month
            </p>
            <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-3">
              Average Work/Day: 8 Hours
            </p>
            <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-3">
              Average Hourly Pay: $15/hr
            </p>
          </div>
        </Card>
      </div>

      <div class="mt-2">
        <Button class="text-white bg-blue-400">Content</Button>
        <Tooltip 
            type="custom" 
            defaultClass="" 
            class="p-4 text-lg font-medium bg-blue-500 text-gray-100" 
            arrow={false}>
            The content displayed is an example of results layout. It does not contain real user data.
        </Tooltip>
    </div>

    </div>
  </div>
</div>
