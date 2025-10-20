import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { FaUserFriends, FaBlog, FaEye, FaHeart } from "react-icons/fa";

// ✅ Correct ChartJS registration
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const stats = [
    { id: 1, name: "Total Readers", value: 1240, icon: <FaUserFriends size={22} /> },
    { id: 2, name: "Total Blogs", value: 58, icon: <FaBlog size={22} /> },
    { id: 3, name: "Total Views", value: 18340, icon: <FaEye size={22} /> },
    { id: 4, name: "Total Reactions", value: 4231, icon: <FaHeart size={22} /> },
  ];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  const viewsData = {
    labels: months,
    datasets: [
      {
        label: "Blog Views",
        data: [1200, 1800, 1650, 2000, 2200, 1950, 2300, 2100, 2500, 2700, 2900, 3100],
        borderColor: "rgba(139, 92, 246, 1)",
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const incomeData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Income ($)",
        data: [500, 750, 900, 850, 1000, 1200, 1100, 1300, 1500, 1600, 1700, 2000],
        backgroundColor: "rgba(139, 92, 246, 0.7)",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1f1f1f",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 8,
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#9ca3af" },
      },
      y: {
        grid: { color: "rgba(156,163,175,0.1)" },
        ticks: { color: "#9ca3af" },
      },
    },
  };

  return (
    <div className="w-full h-full p-4 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white dark:bg-gray-900 border border-purple-800/40 rounded-2xl p-4 shadow-md hover:shadow-lg"
          >
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{item.name}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {item.value.toLocaleString()}
              </h3>
            </div>
            <div className="text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Views Chart */}
        <div className="w-full bg-white dark:bg-gray-900 border border-purple-800/40 rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Views Overview
          </h2>
          <div className="w-full h-96">
            <Line data={viewsData} options={chartOptions} />
          </div>
        </div>

        {/* Income Chart */}
        <div className="w-full bg-white dark:bg-gray-900 border border-purple-800/40 rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Income Overview
          </h2>
          <div className="w-full h-96">
            <Bar data={incomeData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
