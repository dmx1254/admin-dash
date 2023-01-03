/* @ts-nocheck */
/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../components";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RiEyeFill, RiAddBoxFill, RiDeleteBin6Line } from "react-icons/ri";
import { RiFileEditLine } from "react-icons/ri";
import { BiAddToQueue, BiDotsHorizontalRounded } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { getOrderList } from "../features/orderSlice";

import { Link } from "react-router-dom";

import { BiSearch } from "react-icons/bi";

// import noCapture from "../assets/nomage.jpg";

import notFound from "../assets/not-found.png";

// import FileBase from "react-file-base64";

import { updateOrder, deleteOrder } from "../features/ordersSlice";
import { updateOrderList, deleteOrderList } from "../features/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.orderlist);

  console.log(products);

  // console.log(dateFilter);
  // console.log(orders);
  // const [capture, setCapture] = useState("");
  // console.log(orders);
  // console.log(capture);

  useEffect(() => {
    const getOrdersList = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/order`)
        .then((res) => dispatch(getOrderList(res.data)));
    };
    getOrdersList();
  }, [dispatch]);

  const notifyErrorToUpdateOrder = () =>
    toast.error("Veuillez la zone de capture avant de valider");

  const notifySuccessToAddOrder = (name) =>
    toast.success("Commande n° " + name + " mis à jour avec succés");

  const notifySuccessToDeleteOrder = (name) =>
    toast.success("Commande n° " + name + " supprimé avec succés");

  const [toggleSub, setToggleSub] = useState(false);

  const [dataOrder, setDataOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [editableId, setEditableId] = useState(null);
  const [status, setStatus] = useState("En attente");

  const [totalOrderDay, setTotalOrderDay] = useState(0);
  // useEffect(() => {
  //   if (dataOrder.length === 1) {
  //     if (dataOrder[0].status === "Payée") {
  //       setTotalPrice(dataOrder[0].totalPrice);
  //     } else {
  //       setTotalPrice(0);
  //     }
  //   } else if (dataOrder.length > 1) {
  //     let myTab = orderData.filter((data) => data.status === "Payée");
  //     if (myTab.length === 1) {
  //       setTotalPrice(myTab[0].totalPrice);
  //     } else {
  //       setTotalPrice(orderData.reduce((a, b) => a + b.totalPrice, 0));
  //     }
  //   } else {
  //     setTotalPrice(0);
  //   }
  // }, [dataOrder]);

  useEffect(() => {
    const getOrdersList = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/order`)
        .then((res) => dispatch(getOrderList(res.data)));
    };
    getOrdersList();
  }, [dispatch]);

  const convertDate = (date) => {
    const dateConverted = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return dateConverted;
  };

  // let day = new Date("17 novembre 2022");
  // console.log(day.getDay());
  // const d = new Date("July 21, 1983 01:15:00");
  // let day = d.getDate() + 3;
  // console.log(day);

  const convertDateAndAddDay = (date) => {
    const myDate = new Date(date);
    const day = myDate.getDay();
    myDate.setDate(day === 6 ? myDate.getDate() + 2 : myDate.getDate() + 1);
    const dateConverted = new Date(myDate).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    return dateConverted;
  };

  const handleEditOrder = (orderIdToEdit) => {
    setEditableId(orderIdToEdit);
  };
  const handleDeleteOrder = (orderIdToDelete) => {
    try {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_CLIENT_URL}/order/${orderIdToDelete}`,
      }).then((res) => {
        console.log(res?.data);
        dispatch(deleteOrderList({ id: res?.data._id }));
        notifySuccessToDeleteOrder(res?.data?.orderNum);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateOrders = (idOrderToUpdate) => {
    if (!status) {
      notifyErrorToUpdateOrder();
    } else {
      try {
        axios({
          method: "put",
          url: `${process.env.REACT_APP_CLIENT_URL}/order/${idOrderToUpdate}`,
          data: {
            status,
          },
        }).then((res) => {
          dispatch(updateOrderList(res?.data));
          notifySuccessToAddOrder(res?.data?.orderNum);
          setEditableId(null);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleCancleModifOrders = () => {
    setEditableId(null);
  };

  const handleToggleSubstr = (chaine) => {
    if (!toggleSub) {
      return chaine.substring(0, 17);
    } else {
      return chaine;
    }
  };

  const handleBasculeToggle = () => {
    setToggleSub((prevToggleSub) => !prevToggleSub);
  };

  // useEffect(() => {
  //   let newDateFiltered = convertDate(dateFilter);
  //   if (orders.length === 1) {
  //     if (
  //       orders[0].status === "Payée" &&
  //       convertDate(orders[0].createdAt) === newDateFiltered
  //     ) {
  //       setTotalOrderDay(orders[0].totalPrice);
  //     } else {
  //       setTotalOrderDay(0);
  //     }
  //   } else if (orders.length > 1) {
  //     let myTab = orders
  //       .filter((sol) => convertDate(sol.createdAt) === newDateFiltered)
  //       .filter((data) => data.status === "Payée");
  //     if (myTab.length === 1) {
  //       setTotalOrderDay(myTab[0].totalPrice);
  //     } else {
  //       setTotalOrderDay(orders.reduce((a, b) => a + b.totalPrice, 0));
  //     }
  //   } else {
  //     setTotalOrderDay(0);
  //   }
  // }, [orders, orders.status]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg orders">
      <div className="mb-2 flex items-center justify-between mr-6">
        <Header category="Dofus" title="Gestion des commandes dofus" />
        <div className="infos-user-search">
          <input
            type="text"
            name="search"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Commands..."
          />
          <span className="search_addnewsolde">
            <BiSearch />
          </span>
        </div>
      </div>
      <div className="table_responsive">
        <table>
          <thead>
            <tr>
              <th>N° Commande</th>
              <th>Jeu</th>
              {/* <th>Dofus</th> */}
              <th>Serveur</th>
              <th>Qte</th>
              <th>Prix</th>
              {/* <th>Catégorie</th> */}
              <th>Personnage</th>
              <th>Total</th>
              <th>Status</th>
              {/* {user?.person?.isAdmin && <th>Coordonnées de paiement</th>} */}
              <th>Date</th>
              <th>Méthode de paie</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products
              ?.filter((order) => order?.orderNum.includes(searchTerm))
              ?.map((order) => (
                <tr key={order._id}>
                  <td>
                    <p className="order-sales">{order.orderNum}</p>
                  </td>
                  {order?.products.map((signle) => (
                    <>
                      <td
                        className={
                          signle.category === "dofus-kamas"
                            ? "dofuskamas"
                            : signle.category === "dofus-touch"
                            ? "dofustouch"
                            : "dofusretro"
                        }
                      >
                        {signle.category}
                      </td>
                      {/* <td>
                        <img
                          src={signle?.image ? signle?.image : notFound}
                          alt="profil"
                        />
                      </td> */}
                      <td>{signle.server}</td>
                      <td>{signle.amount}M</td>
                      <td>{signle.price}</td>
                      {/* <td>{signle.category}</td> */}
                      <td>{signle.character}</td>
                      <td>{signle?.price * signle?.amount}</td>
                    </>
                  ))}
                  {order?._id === editableId ? (
                    <td>
                      {" "}
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="En attente">En attente</option>
                        <option value="En Cours de payment">
                          En Cours de payment
                        </option>
                        <option value="Terminée">Terminée</option>
                        <option value="Annulée">Annulée</option>
                      </select>{" "}
                    </td>
                  ) : (
                    <td
                      className={
                        order.status === "Terminée"
                          ? "success"
                          : order.status === "Annulée"
                          ? "no-success"
                          : order.status === "En Cours de payment"
                          ? "payment-success"
                          : order.status === "En attente"
                          ? "pending"
                          : "no-pending"
                      }
                    >
                      {order.status}
                    </td>
                  )}
                  <td>{convertDate(order.createdAt)}</td>

                  {order?.paymentMethod ? (
                    <td>{order?.paymentMethod}</td>
                  ) : (
                    <td></td>
                  )}

                  {order?.detailUser ? (
                    <td>{order?.detailUser?.email}</td>
                  ) : (
                    <td></td>
                  )}

                  {order?._id === editableId ? (
                    <td>
                      <div className="action_btn">
                        <button
                          className="servers-valid"
                          onClick={() => handleUpdateOrders(order?._id)}
                        >
                          Valider
                        </button>
                        <button
                          className="servers-cancel"
                          onClick={handleCancleModifOrders}
                        >
                          Annuler
                        </button>
                      </div>
                    </td>
                  ) : (
                    <td>
                      <div className="action_btn">
                        <span
                          className="servers-delete"
                          onClick={() => handleDeleteOrder(order?._id)}
                        >
                          <RiDeleteBin6Line />
                        </span>
                        <span
                          className="servers-edit"
                          onClick={() => handleEditOrder(order?._id)}
                        >
                          <RiFileEditLine />
                        </span>
                        <Link
                          className="profil-detail-user"
                          to={`/profil/${order?.userId}`}
                        >
                          <span className="servers-view">
                            <RiEyeFill />
                          </span>
                        </Link>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
        {/* <div className="solde-buy-thisday">
          <span className="solde-buy-thisday-text">
            Commandes Payées aujourd'hui:
          </span>
          <span className="solde-buy-thisday-text-amount">
            {totalOrderDay.toFixed(2)} dhs
          </span>
        </div> */}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
export default Orders;
