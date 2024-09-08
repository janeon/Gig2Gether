<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from 'svelte';
  import { updateTitle } from "$lib/stores/title";
  
  import { Chart, Card, Toggle } from 'flowbite-svelte';
  import CalHeatmap from 'cal-heatmap';
  import Tooltip from 'cal-heatmap/plugins/Tooltip';
  import 'cal-heatmap/cal-heatmap.css';
	import { db } from "$lib/firebase/client.js";
	import { doc, setDoc } from "firebase/firestore";
	import { capitalize } from "$lib/utils.js";

  export let data;
  const hourlySegments = data.workSegments;
  const weekdayEarnings = data.weeklyEarnings;
  const averageHourlyPay = data.averageEarningsPerHour || 'coming soon...';
  const averageHoursPerDay = data.averageHoursPerDay;
  const calEarnings = data.calEarnings;
  const calExpenses = data.calExpenses; 
  updateTitle('My Trends');

  let cal: CalHeatmap;
  let seriesData = [];
  let title = '';
  let subtitle = '';
  let viewMode = 'earnings'; // Default mode is now 'earnings'

  if ($page.data.user?.platform) {
      const platform = $page.data.user.platform;
      const platformData = {
          uber: [
          ],
          rover: hourlySegments,
          upwork: weekdayEarnings
      };
      switch (platform) {
          case 'uber':
              seriesData = platformData.uber;
              title = 'Driver Earnings';
              subtitle = 'Pickup Time (Hours of the Day)';
              break;
          case 'rover':
              seriesData = platformData.rover;
              title = 'Sitter Earnings';
              subtitle = 'Hours of the Day';
              break;
          case 'upwork':
              seriesData = platformData.upwork;
              title = 'Hourly Earnings';
              subtitle = 'Days of the Week';
              break;
      }
  }
  // Chart options
  let hourly = false;

  let options;
  const isRover = $page.data.user.platform === 'rover';
  options = {
  colors: viewMode === 'earnings' ? ['#B6E1B0', '#4CAF50'] : ['#EFE8EE', '#6A1B9A'],
  series: [{ name: 'Hourly ($)', color: viewMode === 'earnings' ? '#4CAF50' : '#6A1B9A', data: seriesData }],
  chart: { type: 'bar', height: '320px', fontFamily: 'Inter, sans-serif', toolbar: { show: false } },
  plotOptions: { bar: { horizontal: false, columnWidth: '70%', borderRadiusApplication: 'end', borderRadius: 8 } },
  tooltip: {
    shared: true,
    intersect: false,
    style: { fontFamily: 'Inter, sans-serif' },
    y: {
      formatter: function (val) {
        return val.toFixed(2); // Truncate tooltip value to two decimal places
      }
    }
  },
  states: { hover: { filter: { type: 'darken', value: 1 } } },
  stroke: { show: true, width: 0, colors: ['transparent'] },
  grid: { show: false, strokeDashArray: 4, padding: { left: 2, right: 2, top: -14 } },
  dataLabels: { enabled: false },
  legend: { show: false },
  xaxis: { floating: false, labels: { show: true, style: { fontFamily: 'Inter, sans-serif', cssClass: 'text-sm font-normal fill-gray-500 dark:fill-gray-400' } }, axisBorder: { show: false }, axisTicks: { show: false } },
  yaxis: {
    floating: false,
    labels: {
      show: true,
      style: { fontFamily: 'Inter, sans-serif', cssClass: 'text-sm font-normal fill-gray-500 dark:fill-gray-400' },
      formatter: function (val) {
        return val.toFixed(0); // Truncate y-axis labels to two decimal places
      }
    },
    axisBorder: { show: false },
    axisTicks: { show: true }
  },
  fill: { opacity: 1 },
};


  $: options.series = (hourly && isRover) ? [{ name: 'Hourly ($)', color: viewMode === 'earnings' ? '#4CAF50' : '#6A1B9A', data: seriesData }] : [{ name: 'Earnings ($)', color: '#4CAF50', data: weekdayEarnings }];

  function handlePrevious() {
      cal.previous();
  }

  function handleNext() {
      cal.next();
  }

  const upperEnd = { "uber": 300, "rover": 400, "upwork": 800 };
  function showEarnings() {
    viewMode = 'earnings';
    // Repaint the calendar heatmap with earnings colors
    cal.paint({
      data: {
        source: calEarnings,
        x: 'date',
        y: 'value',
        groupY: 'min',
      },
      verticalOrientation: false,
      range: 1,
      itemSelector: '#cal-heatmap',
      date: { 
        start: new Date().toISOString().split('T')[0],
        max: new Date('2024-12-31'),
        min: new Date('2022-01-01')},
      scale: { 
        color: { type: 'linear', scheme: 'Greens', domain: [0, upperEnd[$page.data.user?.platform]]} },
      domain: {
        type: 'month',
        padding: [10, 10, 10, 10],
        label: { 
          position: 'top', 
          cellSize: 15,

          // height: 90,
          // width: 90,
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
            (value ? "$"+value : 'No data') + ' on ' + dayjsDate.format('LL')
          );
        },
      },
    ],
  ]);
  }

  const upperEndExpenses = { "uber": 100, "rover": 200, "upwork": 400 };
  function showExpenses() {
    viewMode = 'expenses';
    // Repaint the calendar heatmap with expenses colors
    cal.paint({
      data: {
        source: calExpenses, 
        x: 'date',
        y: 'value',
        groupY: 'min',
      },
      verticalOrientation: false,
      range: 1,
      itemSelector: '#cal-heatmap',
      date: { 
        start: new Date().toISOString().split('T')[0],
          max: new Date('2024-12-31'),
          min: new Date('2022-01-01')
      }, 
      // Updated start date
      scale: { color: { type: 'linear', scheme: 'Purples', domain: [-1*upperEndExpenses[$page.data.user?.platform], upperEndExpenses[$page.data.user?.platform]] } },
      domain: {
        type: 'month',
        padding: [10, 10, 10, 10],
        label: { 
          position: 'top', 
          style: { 
            fontFamily: 'Inter, sans-serif', 
            // textAlign: 'center', 
            class: 'text-2lg font-bold text-blue-900 dark:text-white px-3 py-2' } 
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

  onMount(async () => {
    const docRef = doc(db, 'logging', 'trends_visits', $page.data.user.uid, new Date().toISOString().split('T')[0]);
    await setDoc(docRef, {time: new Date().toTimeString().split(' ')[0].substring(0, 5)});
    cal = new CalHeatmap();
    const queryParams = new URLSearchParams(window.location.search);
		const expense = queryParams.get('expense');
    if (expense) {
      showExpenses();
    } else {
      showEarnings();
    }
  });

  let mobile: boolean;
  onMount(() => {
      mobile = window.navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i) !== null;
  });
</script>

<div class="flex flex-col md:flex-row justify-center items-stretch">
  <!-- First Card with Chart -->
  <div class="flex justify-center p-2 items-stretch">
    <Card class="flex-1">
      {#if $page.data.user.platform === "rover"}
      <Toggle bind:checked={hourly}>{hourly ? "Show Daily" : "Show Hourly"}</Toggle>
      {/if}
      <div class="flex justify-center pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
          {(hourly && isRover)? "Hourly " : "Daily "}{title}
        </h3>
      </div>
      <Chart {options} />
      <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div class="flex justify-center items-center pt-5">
          <h1 class="text-sm font-semibold text-gray-900 dark:text-white px-3 py-2">
            {(hourly && isRover) ? 'Hours of the Day' : 'Days of the Week'}
          </h1>
        </div>
      </div>
    </Card>
  </div>

  <!-- Calendar Card -->
  <div class="flex justify-center p-2 items-stretch">
    <Card class="flex-1">
      <div class="flex flex-col">
        <h1 class="text-2xl font-bold text-gray-900 mb-3 text-center">Monthly {capitalize(viewMode)}</h1>

        <!-- Buttons for Earnings and Expenses -->
        <div class="flex justify-center space-x-4 mb-4">
          <button
          class={`text-white font-semibold px-4 py-2 rounded ${
            viewMode === 'earnings' 
              ? 'bg-gray-400 cursor-not-allowed border-2 border-gray-700' 
              : 'hover:bg-green-600 bg-green-500'
          }`}
            on:click={showEarnings}
            disabled={viewMode === 'earnings'}
          >
            Earnings
          </button>
          <button
            class={`text-white font-semibold px-4 py-2 rounded
            ${ viewMode === 'expenses' 
             ? 'bg-gray-400 cursor-not-allowed border-2 border-gray-700' 
             : 'hover:bg-purple-600 bg-purple-500'
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

<div class="flex flex-col md:flex-row justify-center items-stretch">

  <!-- General Information Card -->
  <div class="flex justify-center p-2 items-stretch">
    <Card class="flex-1">
      <div class="flex flex-col items-center">
        <h1 class="text-2xl font-bold text-gray-900 mb-3 text-center">General Information</h1>
        <p class="text-sm font-normal text-gray-700 dark:text-gray-400 leading-tight mb-3">Average Hourly Income: ${averageHourlyPay == "coming soon..." ? averageHourlyPay : averageHourlyPay.toFixed(2)}</p>
        <p class="text-sm font-normal text-gray-700 dark:text-gray-400 leading-tight mb-3">Average Time Worked (Daily): {averageHoursPerDay ? averageHoursPerDay.toFixed(2) + " Hours" : "coming soon..."}</p>
      </div>
    </Card>
  </div>
</div>


<style>
    :global(.ch-domain-text) {
      font-size: 20px !important;
      font-weight: 600;
      color: #000000;
  }
</style>