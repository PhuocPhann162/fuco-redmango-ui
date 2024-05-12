import { Bar } from "react-chartjs-2";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function YearlyRevenueChart() {
  const labels = ["2020", "2021", "2022", "2023", "2024"];
  const [startDate, setStartDate] = useState(new Date());
  const data = {
    labels: labels,
    datasets: [{
      label: 'Monthly Revenue',
      data: [65, 59, 80, 81, 56],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
      ],
      borderWidth: 1
    }]
  };
  const options = {};
  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="yyyy"
        showMonthYearPicker
        style = {{width: "fit-content"}}
      />
      <Bar options={options} data={data} />
    </div>
  );
}