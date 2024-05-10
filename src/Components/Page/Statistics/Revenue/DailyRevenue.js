import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DailyRevenueChart() {
  const [startDate, setStartDate] = useState(new Date());

  const labels = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [
          80, 56, 81, 65, 80, 55, 65, 59, 59, 56, 81, 81, 65, 59, 56, 40, 65,
          55, 56, 80, 59, 81, 40, 65, 56, 80, 59, 55, 81, 65,
        ],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const options = {};

  return (
    <div>
      <DatePicker 
        selected={startDate} 
        onChange={(date) => setStartDate(date)} 
        dateFormat="MM/yyyy" 
        showMonthYearPicker
      />
      <Line options={options} data={data} />
    </div>
  );
}