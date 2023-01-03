/* @ts-nocheck */
/* eslint-disable */

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

import { chartBar } from "../data/dummy";

const ChartLine = () => {
  return (
    <div className="mt-2 flex justify-center flex-col bg-purple-300 p-4 items-center">
      <h1 className="mt-4 mb-6 text-2xl text-blue-600">
        Statistiques des ventes.
      </h1>
      <LineChart
        width={730}
        height={250}
        data={chartBar}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Remboursements" stroke="#8884d8" />
        <Line type="monotone" dataKey="Ventes" stroke="#34ef47" />
      </LineChart>
    </div>
  );
};

export default ChartLine;
