import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
import { format } from "date-fns";
import { ReactNode, useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import ReactDatePicker from "react-datepicker";
import { useGetOrdersStatisticQuery } from "../../../../Apis/statisticApi";

Chart.register(...registerables);

export const MonthlyOrders = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [monthlyRevenue, setMonthlyRevenue] = useState<any>();
  const { data, isLoading } = useGetOrdersStatisticQuery({
    type: "monthly",
    year: startDate.getFullYear(),
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setMonthlyRevenue(data?.result);
    }
  }, [data]);

  const labels = Array.from({ length: 12 }, (_, i) =>
    format(new Date(2021, i, 1), "MMMM")
  );
  const renderChart = (percents: number[]) => {
    if (!monthlyRevenue) return null;
    const dataLine: ChartData<"bar"> = {
      labels: labels,
      datasets: [
        {
          label: monthlyRevenue.label,
          data: monthlyRevenue.ordersData,
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
      <ReactDatePicker
        selected={startDate}
        onChange={(date: any) => setStartDate(date)}
        dateFormat="yyyy"
        showYearPicker
      />
      {render()}
    </div>
  );
};
