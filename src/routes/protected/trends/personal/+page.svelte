<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from 'svelte';
  import { updateTitle } from "$lib/stores/title";
  
  import { Chart, Card } from 'flowbite-svelte';
  import CalHeatmap from 'cal-heatmap';
  import Tooltip from 'cal-heatmap/plugins/Tooltip';
  import 'cal-heatmap/cal-heatmap.css';

  updateTitle("My Trends");

  let cal: CalHeatmap;
  let seriesData = [];
  let title = '';
  let subtitle = '';
  let viewMode = 'earnings'; // Default mode is now 'earnings'

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

  // Chart options
  const options = {
    colors: viewMode === 'earnings' ? ['#B6E1B0', '#4CAF50'] : ['#EFE8EE', '#6A1B9A'],
    series: [{ name: 'Fair Per Minute ($)', color: viewMode === 'earnings' ? '#4CAF50' : '#6A1B9A', data: seriesData }],
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
    fill: { opacity: 1 },
  };

  function handlePrevious() {
    cal.previous();
  }

  function handleNext() {
    cal.next();
  }

  function showEarnings() {
    viewMode = 'earnings';
    // Repaint the calendar heatmap with earnings colors
    cal.paint({
      data: {
        source: '/fixtures/seattle-weather.csv', // Ensure correct path
        type: 'csv',
        x: 'date',
        y: d => +d[viewMode],
        groupY: 'min',
      },
      verticalOrientation: false,
      range: 1,
      itemSelector: '#cal-heatmap',
      date: { 
        start: new Date('2024-08-01'),
        max: new Date('2024-12-31'),
        min: new Date('2024-01-01')},
      scale: { color: { type: 'log', scheme: 'Greens' } },
      domain: {
        type: 'month',
        padding: [10, 10, 10, 10],
        label: { 
          position: 'top', 
          style: { 
            fontFamily: 'Inter, sans-serif', 
            textAlign: 'center', 
            class: 'text-2lg font-semibold text-gray-900 dark:text-white px-3 py-2' } 
        }
      },
      subDomain: {
        type: 'xDay',
        radius: 9,
        width: 40,
        height: 40,
        label: 'D',
        style: { fontFamily: 'Inter, sans-serif', fontWeight: 'normal', textAlign: 'center', class: 'text-sm font-semibold text-gray-900 dark:text-white px-3 py-2' }
      }
    }, 
    [
    [
      Tooltip,
      {
        text: function (date, value, dayjsDate) {
          return (
            (value ? value*30 : 'No data') + ' on ' + dayjsDate.format('LL')
          );
        },
      },
    ],
  ]);
  }

  function showExpenses() {
    viewMode = 'expenses';
    // Repaint the calendar heatmap with expenses colors
    cal.paint({
      data: {
        source: '/fixtures/seattle-weather.csv', // Ensure correct path
        type: 'csv',
        x: 'date',
        y: d => +d[viewMode],
        groupY: 'min',
      },
      verticalOrientation: false,
      range: 1,
      itemSelector: '#cal-heatmap',
      date: { 
        start: new Date('2024-08-01'),
          max: new Date('2024-12-31'),
          min: new Date('2024-01-01')
      }, // Updated start date
      scale: { color: { type: 'linear', scheme: 'Purples' } },
      domain: {
        type: 'month',
        padding: [10, 10, 10, 10],
        label: { 
          position: 'top', 
          style: { 
            fontFamily: 'Inter, sans-serif', 
            textAlign: 'center', 
            class: 'text-2lg font-semibold text-gray-900 dark:text-white px-3 py-2' } 
        }
      },
      subDomain: {
        type: 'xDay',
        radius: 8,
        width: 40,
        height: 40,
        label: 'D',
        style: { fontFamily: 'Inter, sans-serif', fontWeight: 'normal', textAlign: 'center', class: 'text-sm font-semibold text-gray-900 dark:text-white px-3 py-2' }
      }
    },
  );
  }

  onMount(() => {
    cal = new CalHeatmap();
    showEarnings();  // Initialize with the 'earnings' mode
  });

  let mobile: boolean;
  onMount(() => {
      mobile = window.navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i) !== null;
  });
</script>

<h1 class="text-lg font-bold text-red-600 mb-4 text-center">
  The content displayed is an example of breakdowns layout. It does not contain real user data.
</h1>
<div class="flex flex-col md:flex-row justify-center">      
  <div class="flex justify-center p-2">
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

  <div class="flex justify-center p-2">
    <Card>
      <div class="flex flex-col">
        <h1 class="text-2xl font-bold text-gray-900 mb-3 text-center">Calendar</h1>

        <!-- Buttons for Earnings and Expenses -->
        <div class="flex justify-center space-x-4 mb-4">
          <button
          class={`text-white font-semibold px-4 py-2 rounded hover:bg-green-600 bg-green-500 ${
            viewMode === 'earnings' ? 'border-2 border-gray-700' : ''
          }`}
            on:click={showEarnings}
            disabled={viewMode === 'earnings'}
          >
            Earnings
          </button>
          <button
            class={`text-white font-semibold bg-purple-500 px-4 py-2 rounded hover:bg-purple-600
            ${ viewMode === 'expenses' ? 'border-2 border-gray-700' : ''
            }`}
            on:click={showExpenses}
            disabled={viewMode === 'expenses'}
          >
            Expenses
          </button>
        </div>

        <div id="cal-heatmap" class="w-full h-128 mb-4 flex justify-center"></div>

        <!-- Centered Gradient Legend for the Heatmap -->
        <div class="flex justify-center items-center space-x-4 mt-4">
          <span class="text-sm font-semibold text-gray-900">
            {viewMode === 'earnings' ? '$' : '-$'}
          </span>
          <div class="w-36 h-4" style="background: linear-gradient(to right, {viewMode === 'earnings' ? '#E0F4E9, #4CAF50' : '#E8DAEF, #6A1B9A'});"></div>
          <span class="text-sm font-semibold text-gray-900">
            {viewMode === 'earnings' ? '$$$' : '-$$$'}
          </span>
        </div>

        <span class="text-sm font-semibold text-gray-900 mt-2 text-center">
          {viewMode === 'earnings' ? 'Earnings' : 'Expenses'}
        </span>

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

<div class="flex justify-center p-2">
  <Card>
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold text-gray-900 mb-3 text-center">Other Information</h1>
      <p class="text-sm font-normal text-gray-700 dark:text-gray-400 leading-tight mb-3">Average Job Length: XXXX</p>
      <p class="text-sm font-normal text-gray-700 dark:text-gray-400 leading-tight mb-3">Average Work/Day: XXXX</p>
      <p class="text-sm font-normal text-gray-700 dark:text-gray-400 leading-tight mb-3">Average Hourly Pay: XXXX</p>
    </div>
  </Card>
</div>
