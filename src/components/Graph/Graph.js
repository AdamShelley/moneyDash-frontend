import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Card from "../utils/Card";

import "./Graph.css";

// Fake Data
// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

const Graph = ({ data }) => {
  let graphData = [];

  if (data) {
    data.map((account) => {
      let indAccount = {
        name: account.name,
        balance: account.balance,
      };

      graphData.push(indAccount);
    });
  }

  console.log(graphData);

  return (
    <div className="graph-container">
      <div className="graph-top">
        <h2>Summary</h2>
        <div className="graph-buttons">
          <button>Monthly</button>
          <button>Weekly</button>
          <button>Daily</button>
        </div>
      </div>

      <Card addedClass="card-graph">
        <ResponsiveContainer width="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            barSize={50}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="balance" stackId="a" fill="#25244e" />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Graph;
