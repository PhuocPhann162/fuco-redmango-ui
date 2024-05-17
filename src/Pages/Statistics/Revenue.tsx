import { useState } from "react";

import DailyOrdersChart from "../../Components/Page/Statistics/Orders/DailyOrders";
import MonthlyOrdersChart from "../../Components/Page/Statistics/Orders/MonthlyOrders";
import YearlyOrdersChart from "../../Components/Page/Statistics/Orders/YearlyOrders";
import {
  DailyRevenue,
  MonthlyRevenue,
  YearlyRevenue,
} from "../../Components/Page/Statistics";

let decoration = require("../../Assets/Images/decoration_6.jpg");

function Revenue() {
  const [chart, setChart] = useState("DailyChart");

  return (
    <div className="table p-4 fade-in">
      <div className="d-flex align-items-center">
        <div className="row justify-content-center align-items-center">
          <div className="col-auto">
            <img
              src={decoration}
              alt="Decoration Header"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginRight: "20px",
              }}
            />
          </div>
          <div className="col">
            <h1 className="text-success">Statistics</h1>
          </div>
        </div>
      </div>
      <div className="col-xl-12">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            {chart === "DailyChart" ? (
              <DailyRevenue />
            ) : chart === "MonthlyChart" ? (
              <MonthlyRevenue />
            ) : chart === "YearlyChart" ? (
              <YearlyRevenue />
            ) : chart === "DailyOrdersChart" ? (
              <DailyOrdersChart />
            ) : chart === "MonthlyOrdersChart" ? (
              <MonthlyOrdersChart />
            ) : chart === "YearlyOrdersChart" ? (
              <YearlyOrdersChart />
            ) : null}
          </div>
          <div className="col-xl-2">
            <h2 className="text-success">Revenue</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value="DailyChart"
                onChange={(e) => setChart(e.target.value)}
                checked={chart === "DailyChart"}
              />
              <label className="form-check-label">Daily Revenue</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="MonthlyChart"
                onChange={(e) => setChart(e.target.value)}
                checked={chart === "MonthlyChart"}
              />
              <label className="form-check-label">Monthly Revenue</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
                value="YearlyChart"
                onChange={(e) => setChart(e.target.value)}
                checked={chart === "YearlyChart"}
              />
              <label className="form-check-label">Yearly Revenue</label>
            </div>
          </div>
          <div className="col-xl-2">
            <h2 className="text-success">Orders</h2>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault4"
                value="DailyOrdersChart"
                onChange={(e) => setChart(e.target.value)}
                checked={chart === "DailyOrdersChart"}
              />
              <label className="form-check-label">Daily Orders</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault5"
                value="MonthlyOrdersChart"
                onChange={(e) => setChart(e.target.value)}
                checked={chart === "MonthlyOrdersChart"}
              />
              <label className="form-check-label">Monthly Orders</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault6"
                value="YearlyOrdersChart"
                onChange={(e) => setChart(e.target.value)}
                checked={chart === "YearlyOrdersChart"}
              />
              <label className="form-check-label">Yearly Orders</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Revenue;

/* <LineChart /> */
/* <BarChart /> */
/* <DoughnutChart /> */
