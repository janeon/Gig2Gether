<script lang="ts">
  import { Chart, Card, Button, Tooltip } from 'flowbite-svelte';
  import { page } from "$app/stores";
  import Sidebar from '$lib/components/Sidebar.svelte';
  import CalHeatmap from 'cal-heatmap';
  import 'cal-heatmap/cal-heatmap.css';
  import { onMount } from 'svelte';

  let cal: CalHeatmap;
  let seriesData = [];
  let title = '';
  let subtitle = '';

  if ($page.data.user?.platform) {
    const data = {
      uber: [
        { x: '12am', y: 0.50 }, { x: '4am', y: 0.75 },
        { x: '8am', y: 1.20 }, { x: '12pm', y: 1.50 },
        { x: '4pm', y: 2.00 }, { x: '8pm', y: 1.50 }
      ],
      rover: [
        { x: '12am', y: 0.50 }, { x: '4am', y: 0.75 },
        { x: '8am', y: 1.20 }, { x: '12pm', y: 1.50 },
        { x: '4pm', y: 2.00 }, { x: '8pm', y: 1.50 }
      ],
      upwork: [
        { x: 'January', y: 0.0 }, { x: 'February', y: 800.0 },
        { x: 'March', y: 1000.0 }, { x: 'April', y: 1200.2 },
        { x: 'May', y: 3000.34 }, { x: 'June', y: 1115.0 },
        { x: 'July', y: 4440.0 }, { x: 'August', y: 500.0 },
        { x: 'September', y: 200.0 }, { x: 'October', y: 2000.0 },
        { x: 'November', y: 1200.0 }, { x: 'December', y: 200.0 }
      ]
    };
    switch ($page.data.user.platform) {
      case "uber":
        seriesData = data.uber;
        title = 'Driver Earnings Per Hour';
        subtitle = 'Pickup Time (Hours of the Day)';
        break;
      case "rover":
        seriesData = data.rover;
        title = 'Worker Earnings Per Hour';
        subtitle = 'Hours of the Day';
        break;
      case "upwork":
        seriesData = data.upwork;
        title = 'Earnings Per Month';
        subtitle = 'Days of the Month';
        break;
    }
  }

  const options = {
    colors: ['#1A56DB', '#FDBA8C'],
    series: [{ name: 'Fair Per Minute ($)', color: '#1A56DB', data: seriesData }],
    chart: { type: 'bar', height: '320px', fontFamily: 'Inter, sans-serif', toolbar: { show: false } },
    plotOptions: { bar: { horizontal: false, columnWidth: '70%', borderRadiusApplication: 'end', borderRadius: 8 } },
    tooltip: { shared: true, intersect: false, style: { fontFamily: 'Inter, sans-serif' } },
    states: { hover: { filter: { type: 'darken', value: 1 } } },
    stroke: { show: true, width: 0, colors: ['transparent'] },
    grid: { show: false, strokeDashArray: 4, padding: { left: 2, right: 2, top: -14 } },
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: { floating: false, labels: { show: true, style: { fontFamily: 'Inter, sans-serif', cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400' } }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
    fill: { opacity: 1 }
  };

  function handlePrevious() {
    cal.previous();
  }

  function handleNext() {
    cal.next();
  }

  onMount(() => {
    cal = new CalHeatmap();
    cal.paint({
      data: {
        source: '/fixtures/seattle-weather.csv', // Ensure correct path
        type: 'csv',
        x: 'date',
        y: d => +d['temp_min'],
        groupY: 'min',
      },
      verticalOrientation: false,
      range: 1,
      itemSelector: '#cal-heatmap',
      date: { start: new Date('2024-01-01') }, // Updated start date
      scale: { color: { type: 'diverging', scheme: 'PRGn', domain: [-10, 15] } },
      domain: {
        type: 'month',
        padding: [10, 10, 10, 10],
        label: { position: 'top' }
      },
      subDomain: {
        type: 'xDay',
        radius: 6,
        width: 30,
        height: 30,
        label: 'D',
      }
    }
  )
  });
</script>

<div class="flex flex-row">
  <div class="w-1/4 p-2">
    <Sidebar title="Trends" option="trends" />
  </div>

  <div class="flex flex-col items-center w-3/4 p-2">
    <h1 class="font-bold">Configure Visualization</h1>

    <div class="flex flex-row justify-between mt-3 w-full">
      <div class="w-1/2 p-2">
        <Card>
          <div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
              {title}
            </h3>
          </div>
          <Chart {options} />
          <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
            <div class="flex justify-between items-center pt-5">
              <h1 class="uppercase text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2 hover:no-underline">
                {subtitle}
              </h1>
            </div>
          </div>
        </Card>
      </div>

      <div class="w-1/2 p-2">
        <Card>
          <div class="flex flex-col">
            <h1 class="font-bold text-black mb-3">Calendar</h1>
            <div id="cal-heatmap" class="w-full h-128 mb-4"></div> <!-- Larger container size -->

  <!-- Buttons for navigation -->
  <div class="flex items-center space-x-2">
    <button
      class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
      on:click={handlePrevious}
    >
      ← Previous
    </button>
    <button
      class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
      on:click={handleNext}
    >
      Next →
    </button>
  </div>

          </div>
        </Card>
      </div>
    </div>

    <div class="justify-center mt-4 w-full">
      <Card>
        <div class="flex flex-col items-center">
          <h1 class="font-bold text-black mb-3">Other Information</h1>
          <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-3">Average Job Length: XXXX</p>
          <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-3">Average Work/Day: XXXX</p>
          <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-3">Average Hourly Pay: XXXX</p>
        </div>
      </Card>
    </div>

    <div class="mt-4 flex justify-center">
      <Button class="text-white bg-blue-400">Content</Button>
      <Tooltip type="custom" defaultClass="" class="p-4 text-lg font-medium bg-blue-500 text-gray-100" arrow={false}>
        The content displayed is an example of breakdowns layout. It does not contain real user data.
      </Tooltip>
    </div>
  </div>
</div>
