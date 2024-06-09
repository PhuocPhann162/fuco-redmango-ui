import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
import { format } from "date-fns";
import { ReactNode, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import ReactDatePicker from "react-datepicker";
import { useGetRevenueStatisticQuery } from "../../../../Apis/statisticApi";

Chart.register(...registerables);

export const YearlyRevenue = () => {
  const [startYear, setStartYear] = useState(new Date(2021, 1, 1));
  const [endYear, setEndYear] = useState(new Date(2025, 1, 1));
  const [yearlyRevenue, setMonthlyRevenue] = useState<any>();
  const { data, isLoading } = useGetRevenueStatisticQuery({
    type: "yearly",
    year: startYear.getFullYear(),
    endYear: endYear.getFullYear(),
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setMonthlyRevenue(data?.result);
    }
  }, [data]);

  const labels = Array.from(
    { length: endYear.getFullYear() + 1 - startYear.getFullYear() },
    (_, i) => format(new Date(startYear.getFullYear() + i, 1, 1), "yyyy")
  );
  console.log(labels);
  const renderChart = (percents: number[]) => {
    if (!yearlyRevenue) return null;
    const dataLine: ChartData<"bar"> = {
      labels: labels,
      datasets: [
        {
          label: yearlyRevenue.label,
          data: yearlyRevenue.revenueData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const options: ChartOptions<"bar"> = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.label + ": " + context.raw;
            },
          },
        },
      },
    };

    return <Bar options={options} data={dataLine}></Bar>;
  };

  const render = (): ReactNode => {
    // const percents = props.args["percents"]
    const percents = [76, 24];

    return <span>{renderChart(percents)}</span>;
  };

  return (
    <div>
      <div className="flex flex-col">
        <div>From</div>
        <ReactDatePicker
          selected={startYear}
          onChange={(date: any) => setStartYear(date)}
          dateFormat="yyyy"
          showYearPicker
        />
      </div>
      <div className="flex flex-col">
        <div>To</div>
        <ReactDatePicker
          selected={endYear}
          onChange={(date: any) => setEndYear(date)}
          dateFormat="yyyy"
          showYearPicker
        />
      </div>
      {render()}
    </div>
  );
};
