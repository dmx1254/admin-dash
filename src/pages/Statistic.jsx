/* @ts-nocheck */
/* eslint-disable */

import React from "react";
import { ChartOrder, ChartLine, ChartBar, Header } from "../components";

const Statistic = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg statistic">
      <Header category="Stats" title="Statistiques " />
      <div className="flex flex-col items-center">
        <div className="mt-10">
          <ChartOrder />
        </div>
        <div className="mt-10">
          <ChartLine />
        </div>
        <div className="mt-10">
          <ChartBar />
        </div>
      </div>
    </div>
  );
};

export default Statistic;
