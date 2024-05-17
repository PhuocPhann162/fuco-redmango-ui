import React, { useEffect, useState } from "react";
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
import { useGetRevenueStatisticQuery } from "../../../../Apis/statisticApi";
import { format } from "date-fns";

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
  const [monthStatis, setMonthStatis] = useState(new Date(2024, 4));
  const [dataStatis, setDataStatis] = useState({});
  const { data, isLoading } = useGetRevenueStatisticQuery({
    type: "daily",
    year: monthStatis.getFullYear(),
    month: monthStatis.getMonth(),
  });

  const labels = Array.from({ length: data?.result.daysInMonth }, (_, i) =>
    format(
      new Date(monthStatis.getFullYear(), monthStatis.getMonth() + 1, i),
      "d"
    )
  );

  const options = {};

  useEffect(() => {
    if (data) {
      console.log(data);
      setDataStatis(data);
      setDataStatis({
        labels: labels,
        datasets: [
          {
            label: data.result.label,
            data: data.result.revenueData,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    }
  }, [data]);

  return (
    <div>
      <DatePicker
        selected={monthStatis}
        onChange={(date) => setMonthStatis(date)}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />
      <Line options={options} data={dataStatis} />
    </div>
  );
}
