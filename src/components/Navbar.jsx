/* @ts-nocheck */
/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { getNotifData } from "../features/notifAdd";

import { useDispatch } from "react-redux";

import axios from "axios";

import notifRingtone from "../assets/notif_exchange.mp3";

import { FiRefreshCcw } from "react-icons/fi";

import defaultUser from "../assets/logo.png";
import { Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const NavButton = ({ title, customFunc, icon, color, dotColor, number }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute flex items-center justify-center rounded-full text-sm text-white top-0 left-6 pr-2 pl-2"
      >
        {number}
      </span>
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const dispatch = useDispatch();
  // const { products } = useSelector((state) => state.exchange);

  const { user } = useSelector((state) => state.user);

  const { products } = useSelector((state) => state.orderlist);

  // const [productOrders, setProductOrders] = useState(
  //   // products.filter((product) => product.status === "En attente")
  //   []
  // );

  const [productExchanges, setProductExchanges] = useState(products);
  const [notifiExchanges, setNotifiExchanges] = useState(
    products?.filter((exchange) => exchange.status === "En attente")
  );

  const [productLength, setProductLength] = useState(
    notifiExchanges ? notifiExchanges.length : 0
  );

  // const getExchangesNotification = async () => {
  //   const audio = new Audio(notifRingtone);
  //   await axios.get(`${process.env.REACT_APP_CLIENT_URL}/order`).then((res) => {
  //     // setProductExchanges(res?.data);
  //     dispatch(getNotifData(res?.data));
  //     audio.play();
  //   });
  // };

  // const getExchangesNotification = async () => {
  //   const audio = new Audio(notifRingtone);
  //   await axios.get(`${process.env.REACT_APP_CLIENT_URL}/order`).then((res) => {
  //     dispatch(getNotifData(res?.data));
  //     audio.play();
  //   });
  // };

  // const getExchangesNotification = async () => {
  //   const audio = new Audio(notifRingtone);
  //   await axios.get(`${process.env.REACT_APP_CLIENT_URL}/order`).then((res) => {
  //     dispatch(getOrderList(res.data));
  //     audio.play();
  //   });
  // };

  const getExchangesNotification = async () => {
    const audio = new Audio(notifRingtone);
    await axios.get(`${process.env.REACT_APP_CLIENT_URL}/order`).then((res) => {
      dispatch(getOrderList(res.data));
      audio.play();
    });
  };

  useEffect(() => {
    setNotifiExchanges(
      productExchanges?.filter((exchange) => exchange.status === "En attente")
    );
  }, [productExchanges]);

  useEffect(() => {
    setProductLength(notifiExchanges?.length);
  }, [notifiExchanges]);

  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative navbar">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        {/* <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          color={currentColor}
          icon={<FiShoppingCart />}
        /> */}
        {/* <NavButton
          title="Chat"
          customFunc={() => handleClick("chat")}
          color={currentColor}
          icon={<BsChatLeft />}
        /> */}
        {/* <NavButton
          title="Refresh"
          color={currentColor}
          icon={<FiRefreshCcw />}
          onClick={}
        /> */}
        <span
          style={{
            color: currentColor,
            fontSize: "20px",
            marginTop: "12px",
            cursor: "pointer",
            marginRight: "2px",
          }}
          onClick={getExchangesNotification}
        >
          <FiRefreshCcw />
        </span>
        <NavButton
          title="Notification"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<RiNotification3Line />}
          dotColor="#ff0000"
          number={productLength}
        />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img
              className="rounded-full w-8 h-8"
              src={user?.person?.profil ? user?.person?.profil : defaultUser}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {user?.person?.lastname}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
