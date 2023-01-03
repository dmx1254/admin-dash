/* @ts-nocheck */
/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Button } from ".";
// import { chatData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

import axios from "axios";

import { MdOutlineCancel } from "react-icons/md";

import defaultUser from "../assets/default-user.png";

import { Link } from "react-router-dom";

// import notifRingtone from "../assets/notif_exchange.mp3";

const Notification = () => {
  const { currentColor } = useStateContext();

  const { products } = useSelector((state) => state.orderlist);

  // const { dataNotif } = useSelector((state) => state.dataNotif);

  // console.log(dataNotif);

  const [productExchanges, setProductExchanges] = useState(products);
  const [notifiExchanges, setNotifiExchanges] = useState(
    productExchanges?.filter((exchange) => exchange.status === "En attente")
  );

  // useEffect(() => {
  //   setProductExchanges(dataNotif);
  // }, [dataNotif]);

  console.log(notifiExchanges);

  useEffect(() => {
    setNotifiExchanges(
      productExchanges?.filter((order) => order?.status === "En attente")
    );
  }, [productExchanges]);

  console.log(productExchanges);

  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">
            Notifications
          </p>
          <button
            type="button"
            className="text-red-600 text-sm rounded p-1 px-2 bg-orange-theme mb-1"
          >
            {" "}
            {notifiExchanges ? notifiExchanges.length : 0} commande(s)
          </button>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="mt-5 ">
        {productExchanges
          .filter((order) => order.status === "En attente")
          .map((item, index) => (
            <div
              key={index}
              className="flex items-center leading-8 gap-5 border-b-1 border-color p-3"
            >
              {
                <img
                  className="rounded-full h-10 w-10"
                  src={
                    item.profilExchanger ? item.profilExchanger : defaultUser
                  }
                  alt={"item.nameExchanger"}
                />
              }

              <div>
                <Link to="/echanges">
                  <p className="font-semibold dark:text-gray-200">
                    {item.userId}
                  </p>
                </Link>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {" "}
                  <Link to="/commandes">
                    {" "}
                    {item.userId} vient de faire une commande N°{" "}
                  </Link>
                  {item.orderNum}
                </p>
              </div>
            </div>
          ))}
        <div className="mt-5">
          <Button
            color="white"
            bgColor={currentColor}
            text="See all notifications"
            borderRadius="10px"
            width="full"
          />
        </div>
      </div>
    </div>
  );
};

export default Notification;
