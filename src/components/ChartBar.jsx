/* @ts-nocheck */
/* eslint-disable */

import React from "react";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { lineCha } from "../data/dummy";

const ChartBar = () => {
  return (
    <div className="mt-2 flex justify-center bg-pink-300 p-4 flex-col items-center">
      <h1 className="mt-4 mb-6 text-2xl text-blue-600">
        Statistiques des ventes.
      </h1>
      <BarChart width={730} height={250} data={lineCha}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Remboursements" fill="#8884d8" />
        <Bar dataKey="Ventes" fill="#34ef47" />
      </BarChart>
    </div>
  );
};

export default ChartBar;
