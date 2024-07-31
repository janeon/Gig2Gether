<script>
    import YouTube from "react-youtube";
    import ScheduleSelector from 'react-schedule-selector'
    let schedule = [];

    const handleChange = (newSchedule) => {
        // console.log(newSchedule);
        schedule = newSchedule;
    };

  </script>
  <react:ScheduleSelector         
  selection={schedule}
  numDays={5}
  minTime={8}
  maxTime={22}
  hourlyChunks={2}
  onChange={handleChange}/>