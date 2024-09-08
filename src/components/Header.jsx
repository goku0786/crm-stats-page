import { useEffect, useState } from "react";
import TimeSelector from "./TimeSelector";

export default function Header({ timeRange, setTimeRange }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-blue-500 dark:bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">CRM Stats Page</h1>
      <div className="flex items-center space-x-4">
        <TimeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
        <button
          onClick={toggleDarkMode}
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-2 rounded-lg transition-colors duration-300"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
}
