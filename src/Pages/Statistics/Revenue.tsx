import React from "react";
import { useState } from "react";
import DailyChart from "../../Components/Page/Statistics/DailyRevenue";
import MonthlyChart from "../../Components/Page/Statistics/MonthlyRevenue";
import YearlyChart from "../../Components/Page/Statistics/YearlyRevenue";

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
              <DailyChart />
            ) : chart === "MonthlyChart" ? (
              <MonthlyChart />
            ) : chart === "YearlyChart" ? (
              <YearlyChart />
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
        </div>
      </div>
    </div>
  );
}

export default Revenue;

/* <LineChart /> */
/* <BarChart /> */
/* <DoughnutChart /> */
