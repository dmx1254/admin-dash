/* @ts-nocheck */
/* eslint-disable */

import React from "react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { orderData } from "../data/dummy";

const ChartOrder = () => {
  return (
    <div className="mt-2 flex justify-center flex-col items-center bg-cyan-500 p-20">
      <h1 className="mt-4 mb-6 text-2xl text-blue-600">
        Statistiques des ventes.
      </h1>
      <LineChart
        width={600}
        height={300}
        data={orderData}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="total" stroke="#1652f0" />
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
};

export default ChartOrder;
