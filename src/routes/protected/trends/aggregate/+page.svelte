<script lang="ts">
  import { page } from "$app/stores";
  import { Chart, Card, Radio, Checkbox, Button, Tooltip } from 'flowbite-svelte';
  import { writable } from 'svelte/store';
  import Sidebar from "$lib/components/Sidebar.svelte";

  let seriesData = writable([]);
  let selectedCompareBy = 'Hourly income rates';
  let selectedDataSelection = 'Hourly income rates';
  let chartTitle = 'Hourly income rates';
  let yValueLabel = 'Y Value';
  let showMyData = writable(false);

  const xValues = {
    'Hourly income rates': ['12am', '4am', '8am', '12pm', '4pm', '8pm'],
    'Age (Years)': ['18-24', '25-35', '36-45', '46-55', '56-65', '66+'],
    'Gender': ['Male', 'Female', 'Non-Binary', 'Other'],
    'Ethnicity': ['Asian', 'Indigenous', 'Black', 'Pacific Islander', 'White'],
    'Income': ['0-10k', '10-20k', '20-50k', '50-75k', '75k+'],
    'Car Model': ['Audi', 'Toyota', 'Honda', 'Chrysler', 'Nissan', 'Ford', 'Lexus', 'Tesla'],
    'Education': ['No Degree', 'High School diploma', 'Bachelors', 'Graduate'],
    'Tenure (Years)': ['0.5 years', '1 year', '2 years', '3 years', '4+'],
    'Part/Full Time': ['Part-Time', 'Full-Time']
  };
  
  const dataSelections = {
    'Hourly income rates (Dollars)': [7.50, 7.75, 11.20, 11.50, 12.00, 11.50, 12.3, 12.40],
    'Tipping rate (Percent)': [10, 15, 6, 5, 30, 20, 10],
    'Ratings': [4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 3.5, 4.3]
  };

  const userData = {
    'Hourly income rates (Dollars)': [8.00, 8.00, 8.00, 8.00, 8.00, 8.00, 8.00, 8.00],
    'Tipping rate (Percent)': [5, 5, 5, 5, 5, 5, 5],
    'Ratings': [4.3, 4.3, 4.3, 4.3, 4.3, 4.3, 4.3, 4.3]
  };

  const updateSeriesData = () => {
    const xData = xValues[selectedCompareBy] || [];
    const yData = dataSelections[selectedDataSelection] || [];
    const myYData = userData[selectedDataSelection] || [];

    const series = [
      {
        name: selectedDataSelection,
        color: '#1A56DB',
        data: xData.map((x, index) => ({
          x,
          y: yData[index] || 0
        }))
      }
    ];

    if ($showMyData) {
      series.push({
        name: 'My Data',
        color: '#FDBA8C',
        data: xData.map((x, index) => ({
          x,
          y: myYData[index] || 0
        }))
      });
    }

    seriesData.set(series);
  };

  const updateCompareBy = (event) => {
    selectedCompareBy = event.target.value;
    updateSeriesData();
    yValueLabel = selectedCompareBy;
  };

  const updateDataSelection = (event) => {
    selectedDataSelection = event.target.value;
    updateSeriesData();
    chartTitle = selectedDataSelection;
  };

  const toggleShowMyData = () => {
    showMyData.update(current => !current);
    updateSeriesData();
  };

  updateSeriesData();

  const options = {
    colors: ['#1A56DB', '#FDBA8C'],
    series: [],
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

  // Re-create the chart options when seriesData changes
  $: options.series = $seriesData;
  $: options.series[0].name = chartTitle;
</script>

<div class="flex flex-col md:flex-row">
  <div class="w-full md:w-1/4 p-2">
      <Sidebar title="Trends" option="trends"/>
  </div>

  <div class="flex flex-col items-center w-full md:w-3/4 p-2">
      <h1 class="text-3xl font-bold text-gray-900 mb-4 text-center">Configure Visualization</h1>
      <h3 class="text-sm text-gray-900 text-center">The content displayed is an example of breakdowns layout. It does not contain real user data.</h3>

      <div class="flex flex-col md:flex-row w-full mt-3">
          <div class="w-full md:w-1/3 p-2">
              <div>
                  <h1 class="text-sm">Data Selection</h1>
              </div>
              <div class="mt-3">
                  <h1 class="mt-2">Dimensions/Outcome</h1>
                  <Radio class="mt-1" name="dataSelection" value="Hourly income rates (Dollars)" on:change={updateDataSelection} checked>Hourly income rates (Dollars)</Radio>
                  <Radio name="dataSelection" value="Tipping rate (Percent)" on:change={updateDataSelection}>Tipping rate (Percent)</Radio>
                  <Radio name="dataSelection" value="Ratings" on:change={updateDataSelection}>Ratings</Radio>
              </div>
              <div class="mt-3">
                  <h1 class="mt-2">Compare by:</h1>
                  <Radio class="mt-1" name="compareBy" value="Age (Years)" on:change={updateCompareBy} checked>Age</Radio>
                  <Radio name="compareBy" value="Gender" on:change={updateCompareBy}>Gender</Radio>
                  <Radio name="compareBy" value="Ethnicity" on:change={updateCompareBy}>Ethnicity</Radio>
                  <Radio name="compareBy" value="Income" on:change={updateCompareBy}>Income</Radio>
                  {#if $page.data.user?.platform == "uber"}
                  <Radio name="compareBy" value="Car Model" on:change={updateCompareBy}>Car Model</Radio>
                  {/if}
                  <Radio name="compareBy" value="Education" on:change={updateCompareBy}>Education</Radio>
                  <Radio name="compareBy" value="Tenure (Years)" on:change={updateCompareBy}>Tenure</Radio>
                  <Radio name="compareBy" value="Part/Full Time" on:change={updateCompareBy}>Part/Full Time</Radio>
              </div>
              <div class="mt-3">
                  <h1 class="mt-2">My Trends:</h1>
                  <Checkbox on:change={toggleShowMyData}>Show My Data</Checkbox>
              </div>
          </div>

          <div class="w-full md:w-2/3 p-2 mt-6 md:mt-0">
              <Card>
                  <div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                      <div class="flex items-center justify-center w-full">
                          <h3 class="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1 text-center">
                              {chartTitle}   
                          </h3>
                      </div>
                  </div>
                  <Chart class="" {options} />
                  <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                      <div class="flex justify-center items-center pt-5">
                          <h1 class="uppercase text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2 hover:no-underline">
                              {yValueLabel}
                          </h1>
                      </div>
                  </div>
              </Card>
          </div>
      </div>
  </div>
</div>
