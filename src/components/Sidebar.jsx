/* @ts-nocheck */
/* eslint-disable */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { FiShoppingBag, FiEdit } from "react-icons/fi";
import {
  MdOutlineCancel,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { BsKanban } from "react-icons/bs";
import { AiOutlineShoppingCart, AiOutlineCalendar } from "react-icons/ai";
import { RiExchangeFill, RiContactsLine, RiServerLine } from "react-icons/ri";
import { ImStatsDots } from "react-icons/im";
import { GiLifeInTheBalance } from "react-icons/gi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

// import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const { user } = useSelector((state) => state.user);
  const [userId, setUserId] = useState(user?.user);

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    userId &&
    user?.person?.isAdmin && (
      <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
        {activeMenu && (
          <>
            <div className="flex justify-between items-center">
              <Link
                to="/"
                onClick={handleCloseSideBar}
                className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
              >
                <SiShopware /> <span>Ibendouma</span>
              </Link>
              <TooltipComponent content="Menu" position="BottomCenter">
                <button
                  type="button"
                  onClick={() => setActiveMenu(!activeMenu)}
                  style={{ color: currentColor }}
                  className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                >
                  <MdOutlineCancel />
                </button>
              </TooltipComponent>
            </div>
            <div className="mt-10 ">
              <div>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  DASHBOARD
                </p>

                <NavLink
                  to={`/`}
                  onClick={handleCloseSideBar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : "",
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <RiServerLine />
                  <span className="capitalize ">Servers</span>
                </NavLink>
              </div>

              <div>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  PAGES
                </p>

                <NavLink
                  to={`/commandes`}
                  onClick={handleCloseSideBar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : "",
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <AiOutlineShoppingCart />
                  <span className="capitalize ">Commandes</span>
                </NavLink>

                <NavLink
                  to={`/clients`}
                  onClick={handleCloseSideBar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : "",
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <RiContactsLine />
                  <span className="capitalize ">Clients</span>
                </NavLink>

                <NavLink
                  to={`/products`}
                  onClick={handleCloseSideBar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : "",
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <MdOutlineProductionQuantityLimits />
                  <span className="capitalize ">Produits</span>
                </NavLink>

                <NavLink
                  to={`/statistics`}
                  onClick={handleCloseSideBar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : "",
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <ImStatsDots />
                  <span className="capitalize ">Stats</span>
                </NavLink>
              </div>

              {/* <div>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  APPS
                </p>

                <NavLink
                  to={`/calendar`}
                  onClick={handleCloseSideBar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : "",
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <AiOutlineCalendar />
                  <span className="capitalize ">calendar</span>
                </NavLink>

                <NavLink
                  to={`/kanban`}
                  onClick={handleCloseSideBar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : "",
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <BsKanban />
                  <span className="capitalize ">kanban</span>
                </NavLink>

                <NavLink
                  to={`/editor`}
                  onClick={handleCloseSideBar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : "",
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <FiEdit />
                  <span className="capitalize ">editor</span>
                </NavLink>
              </div> */}
            </div>
          </>
        )}
      </div>
    )
  );
};

export default Sidebar;
