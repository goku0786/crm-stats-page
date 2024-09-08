import React, { useEffect, useState } from 'react';
import Header from './Header';
import StatsCard from './StatsCard';
import PieChartComponent from '../charts/PieChartComponent';
import LineChartComponent from '../charts/LineChartComponent';
import BarChartComponent from '../charts/BarChartComponent';
import axios from 'axios';

function Home() {
  const [userData, setUserData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [timeRange, setTimeRange] = useState('1 Week');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const pricePerUnit = 100; 

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(false);
      try {
        const [usersResponse, salesResponse] = await Promise.all([
          axios.get('https://jsonplaceholder.typicode.com/users'),
          axios.get('https://jsonplaceholder.typicode.com/posts'),
        ]);
        const filteredSalesData = filterDataByTimeRange(salesResponse.data, timeRange);
        setUserData(usersResponse.data);
        setSalesData(filteredSalesData);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [timeRange]);

  const filterDataByTimeRange = (data, range) => {
    switch (range) {
      case '1 Day':
        return data.slice(0, 3); 
      case '1 Week':
        return data.slice(0, 10); 
      case '1 Month':
        return data.slice(0, 30); 
      default:
        return data;
    }
  };


  const totalUsers = userData.length;
  const totalSales = salesData.length;
  const totalRevenue = totalSales * pricePerUnit;  
 
  const pieChartData = [totalSales, totalRevenue, totalUsers];

  
  const monthlySalesData = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100)); 
  const monthlyRevenueData = monthlySalesData.map(sales => sales * pricePerUnit);  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-red-500">Error fetching data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Header setTimeRange={setTimeRange} />
      <main className="p-8">
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard title="Total Users" value={totalUsers} />
          <StatsCard title="Total Revenue" value={`$${totalRevenue}`} />
          <StatsCard title="Total Sales" value={totalSales} />
        </div>

       
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Sales, Revenue, and Users</h2>
            <PieChartComponent data={pieChartData} />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Monthly Revenue</h2>
            <BarChartComponent data={monthlyRevenueData} />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Monthly Sales</h2>
            <LineChartComponent data={monthlySalesData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
