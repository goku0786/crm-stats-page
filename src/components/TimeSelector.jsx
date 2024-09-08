export default function TimeSelector({ timeRange, setTimeRange }) {
  const timeRanges = ["1 Day", "1 Week", "1 Month"];

  const handleTimeRangeChange = (e) => {
    const newTimeRange = e.target.value;
    setTimeRange(newTimeRange); 
  };

  return (
    <select
      className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={timeRange} 
      onChange={handleTimeRangeChange}
    >
      {timeRanges.map((range) => (
        <option key={range} value={range}>
          {range}
        </option>
      ))}
    </select>
  );
}
