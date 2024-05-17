import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
import { format } from "date-fns";
import { ReactNode, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import ReactDatePicker from "react-datepicker";
import { useGetRevenueStatisticQuery } from "../../../../Apis/statisticApi";

Chart.register(...registerables);

export const DailyRevenue = () => {
  const [monthStatis, setMonthStatis] = useState(new Date(2024, 4));
  const [dailyRevenue, setDailyRevenue] = useState<any>();
  const { data, isLoading } = useGetRevenueStatisticQuery({
    type: "daily",
    year: monthStatis.getFullYear(),
    month: monthStatis.getMonth() + 1,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setDailyRevenue(data?.result);
    }
  }, [data]);

  const labels = dailyRevenue
    ? Array.from({ length: dailyRevenue.daysInMonth }, (_, i) =>
        format(
          new Date(monthStatis.getFullYear(), monthStatis.getMonth(), i + 1),
          "dd"
        )
      )
    : [];
  console.log(labels);
  const renderChart = (percents: number[]) => {
    if (!dailyRevenue) return null;
    const dataLine: ChartData<"line"> = {
      labels: labels,
      datasets: [
        {
          label: dailyRevenue.label,
          data: dailyRevenue.revenueData,
          fill: true,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    const options: ChartOptions<"line"> = {
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

    return <Line options={options} data={dataLine}></Line>;
  };

  const render = (): ReactNode => {
    // const percents = props.args["percents"]
    const percents = [76, 24];

    return <span>{renderChart(percents)}</span>;
  };

  return (
    <div>
      <ReactDatePicker
        selected={monthStatis}
        onChange={(date: any) => setMonthStatis(date)}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />
      {render()}
    </div>
  );
};
