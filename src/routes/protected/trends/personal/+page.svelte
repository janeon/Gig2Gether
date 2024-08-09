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
    xaxis: { floating: false, labels: { show: true, style: { fontFamily: 'Inter, sans-serif', cssClass: 'text-sm font-normal fill-gray-500 dark:fill-gray-400' } }, axisBorder: { show: false }, axisTicks: { show: false } },
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
        label: { 
          position: 'top', 
          style: { fontFamily: 'Inter, sans-serif', fontSize: '30px', fontWeight: 'normal', textAlign: 'center', class: 'text-lg font-semibold text-gray-900 dark:text-white px-3 py-2' } 
        }
      },
      subDomain: {
        type: 'xDay',
        radius: 8,  // Made blocks larger
        width: 40,  // Made blocks larger
        height: 40, // Made blocks larger
        label: 'D',
        style: { fontFamily: 'Inter, sans-serif', fontWeight: 'normal', textAlign: 'center', class: 'text-sm font-semibold text-gray-900 dark:text-white px-3 py-2' }
      }
    });
  });
</script>

<div class="flex flex-col md:flex-row">
  <div class="md:w-1/4 p-2">
    <Sidebar title="Trends" option="trends" />
  </div>

  <div class="flex flex-col items-center md:w-3/4 p-2">
    <h1 class="text-3xl font-bold text-gray-900 mb-4 text-center">Configure Visualization</h1>

    <h3 class="text-sm text-gray-900 text-center mb-4">The content displayed is an example of breakdowns layout. It does not contain real user data.</h3>

    <div class="flex flex-col md:flex-row justify-between mt-3 w-full">
      <div class="md:w-1/2 p-2">
        <Card>
          <div class="flex justify-center pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
          <Chart {options} />
          <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
            <div class="flex justify-center items-center pt-5">
              <h1 class="text-sm font-semibold text-gray-900 dark:text-white px-3 py-2">
                {subtitle}
              </h1>
            </div>
          </div>
        </Card>
      </div>

      <div class="md:w-1/2 p-2 mt-6 md:mt-0">
        <Card>
          <div class="flex flex-col">
            <h1 class="text-2xl font-bold text-gray-900 mb-3 text-center">Calendar</h1>
            <div id="cal-heatmap" class="w-full h-128 mb-4 flex justify-center"></div> <!-- Larger container size -->

            <!-- Legend for the Heatmap -->
            <div class="flex flex-col items-start space-y-1 mt-15">
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4" style="background-color: #B6E1B0;"></div> <!-- Color matching heatmap -->
                <span class="text-sm font-semibold text-gray-900">Earnings</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4" style="background-color: #EFE8EE;"></div> <!-- Color matching heatmap -->
                <span class="text-sm font-semibold text-gray-900">Expenses</span>
              </div>
            </div>

            <!-- Buttons for navigation -->
            <div class="flex justify-center items-center space-x-4 mt-4">
              <button
                class="text-white font-semibold bg-blue-400 px-4 py-2 rounded hover:bg-blue-500"
                on:click={handlePrevious}
              >
                ← Previous
              </button>
              <button
                class="text-white font-semibold bg-blue-400 px-4 py-2 rounded hover:bg-blue-500"
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
          <h1 class="text-2xl font-bold text-gray-900 mb-3 text-center">Other Information</h1>
          <p class="text-sm font-normal text-gray-700 dark:text-gray-400 leading-tight mb-3">Average Job Length: XXXX</p>
          <p class="text-sm font-normal text-gray-700 dark:text-gray-400 leading-tight mb-3">Average Work/Day: XXXX</p>
          <p class="text-sm font-normal text-gray-700 dark:text-gray-400 leading-tight mb-3">Average Hourly Pay: XXXX</p>
        </div>
      </Card>
    </div>
  </div>
</div>

<style>
  .cal-heatmap-container .graph-label {
    font-size: 30px;

  }
</style>