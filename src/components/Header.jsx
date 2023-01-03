/* @ts-nocheck */
/* eslint-disable */

import React from "react";

const Header = ({ category, title }) => (
  <div className=" mb-10 flex flex-col items-center">
    <p className="text-lg text-gray-400">{category}</p>
    <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-blue-600">
      {title}
    </p>
  </div>
);

export default Header;
