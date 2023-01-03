/* @ts-nocheck */
/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../components";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RiDeleteBin6Line } from "react-icons/ri";
import { RiFileEditLine } from "react-icons/ri";
import { BiAddToQueue } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import axios from "axios";

import { Link } from "react-router-dom";

import { deleteServer, editServer, addServers } from "../features/serverSlices";
import { updateEuro } from "../features/rateEuroSlice";
import { updateUsdt } from "../features/rateUsdtSlices";
import { updateDollar } from "../features/rateDollarSlices";

import { getGbpRate, updateGbp } from "../features/rateGbpSlice";

import { getAllUsers } from "../features/userSlices";
import { getUsdtRa } from "../features/rateUsdtSlices";
import { getEuroRate } from "../features/rateEuroSlice";
import { getSolde } from "../features/soldesSlices";
import { getDollarRate } from "../features/rateDollarSlices";
import { getOrderList } from "../features/orderSlice";
import { getRate } from "../features/rateSlice";
import { getSoldeHistory } from "../features/dataSoldeSlice";
import { getOrders } from "../features/ordersSlice";
import { getCadRate, updateCad } from "../features/rateCadSlice";
import { getChfRate, updateChf } from "../features/rateChfSlice";
import { getRubRate, updateRub } from "../features/rateRubSlice";

const Servers = () => {
  const { user } = useSelector((state) => state.user);
  // console.log(user);
  const dispatch = useDispatch();
  const { servers } = useSelector((state) => state.servers);
  const { eurorate } = useSelector((state) => state.eurorate);
  const { cadrate } = useSelector((state) => state.cadrate);
  const { chfrate } = useSelector((state) => state.chfrate);
  const { rubrate } = useSelector((state) => state.rubrate);
  const { dollarate } = useSelector((state) => state.dollarate);
  const { usdtra } = useSelector((state) => state.usdtra);
  const { gbprate } = useSelector((state) => state.gbprate);

  const { ideuro } = useSelector((state) => state.eurorate);
  const { idcad } = useSelector((state) => state.cadrate);
  const { idchf } = useSelector((state) => state.chfrate);
  const { idrub } = useSelector((state) => state.rubrate);
  const { iddollar } = useSelector((state) => state.dollarate);
  const { idgbp } = useSelector((state) => state.gbprate);
  const { idusdt } = useSelector((state) => state.usdtra);

  const [editServerId, setEditServerId] = useState(null);

  const [getMonthBenefit, setGetMonthBenefit] = useState([]);

  const [getBenefitToConv, setGetBenefitToConv] = useState([]);

  // console.log(servers);

  const [editToggleEuro, setEditToggleEuro] = useState(false);
  const [editToggleUsdt, setEditToggleUsdt] = useState(false);
  const [editToggleDollar, setEditToggleDollar] = useState(false);
  const [editToggleGbp, setEditToggleGbp] = useState(false);
  const [editToggleCad, setEditToggleCad] = useState(false);
  const [editToggleChf, setEditToggleChf] = useState(false);
  const [editToggleRub, setEditToggleRub] = useState(false);
  const [euro, setEuro] = useState(eurorate);
  const [usdt, setUsdt] = useState(usdtra);
  const [dollar, setDollar] = useState(dollarate);
  const [gbp, setgbp] = useState(gbprate);
  const [cad, setCad] = useState(cadrate);
  const [rub, setRub] = useState(rubrate);
  const [chf, setChf] = useState(chfrate);

  const [serverName, setServerName] = useState();
  const [serverCategory, setServerCategory] = useState();
  const [serverStatus, setServerStatus] = useState();
  const [serverMinQty, setServerMinQty] = useState();
  const [serverPrice, setServerPrice] = useState();

  // console.log(
  //   "serverName: " +
  //     serverName +
  //     " serverCategory: " +
  //     serverCategory +
  //     " serverStatus: " +
  //     serverStatus +
  //     " serverMinQty: " +
  //     serverMinQty +
  //     " serverPrice " +
  //     serverPrice
  // );

  const notifySuccessToAddServer = (name) =>
    toast.success("Serveur " + name + " mis à jour avec succès");

  const notifySuccessCurrency = () =>
    toast.success("Devise mis à jour avec succès");

  useEffect(() => {
    const getServers = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/server`)
        .then((res) => dispatch(addServers(res.data)));
    };
    getServers();
  }, [dispatch]);

  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/users`)
        .then((res) => dispatch(getAllUsers(res.data)));
    };
    getUsers();
  }, [dispatch]);

  useEffect(() => {
    const getUsdt = async () => {
      await axios.get(`${process.env.REACT_APP_CLIENT_URL}/usdt`).then((res) =>
        dispatch(
          getUsdtRa({
            usdt: res?.data[0]?.usdt,
            idusdt: res?.data[0]?._id,
          })
        )
      );
    };
    getUsdt();
  }, [dispatch]);

  useEffect(() => {
    const getEuro = async () => {
      await axios.get(`${process.env.REACT_APP_CLIENT_URL}/euro`).then((res) =>
        dispatch(
          getEuroRate({
            euro: res?.data[0]?.euro,
            ideuro: res?.data[0]?._id,
          })
        )
      );
    };
    getEuro();
  }, [dispatch]);

  useEffect(() => {
    const getCad = async () => {
      await axios.get(`${process.env.REACT_APP_CLIENT_URL}/cad`).then((res) =>
        dispatch(
          getCadRate({
            cad: res?.data[0]?.cad,
            idcad: res?.data[0]?._id,
          })
        )
      );
    };
    getCad();
  }, [dispatch]);

  useEffect(() => {
    const getChf = async () => {
      await axios.get(`${process.env.REACT_APP_CLIENT_URL}/chf`).then((res) =>
        dispatch(
          getChfRate({
            chf: res?.data[0]?.chf,
            idchf: res?.data[0]?._id,
          })
        )
      );
    };
    getChf();
  }, [dispatch]);

  useEffect(() => {
    const getRub = async () => {
      await axios.get(`${process.env.REACT_APP_CLIENT_URL}/rub`).then((res) =>
        dispatch(
          getRubRate({
            rub: res?.data[0]?.rub,
            idrub: res?.data[0]?._id,
          })
        )
      );
    };
    getRub();
  }, [dispatch]);

  useEffect(() => {
    const getIncome = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/order/income`)
        .then((res) => setGetMonthBenefit(res?.data));
    };
    getIncome();
  }, [dispatch]);

  // useEffect(() => {
  //   let myTab = [];
  //   let netArrToConv = getMonthBenefit?.map((benef) => {
  //     if (benef._id === 1) {
  //       benef._id === "Janvier";
  //     } else if (benef._id === 2) {
  //       benef._id === "Fevrier";
  //     } else if (benef._id === 3) {
  //       benef._id === "Mars";
  //     } else if (benef._id === 4) {
  //       benef._id === "Avril";
  //     } else if (benef._id === 5) {
  //       benef._id === "Mai";
  //     } else if (benef._id === 6) {
  //       benef._id === "Juin";
  //     } else if (benef._id === 7) {
  //       benef._id === "Juillet";
  //     } else if (benef._id === 8) {
  //       benef._id === "Aout";
  //     } else if (benef._id === 9) {
  //       benef._id === "Septembre";
  //     } else if (benef._id === 10) {
  //       benef._id === "Octobre";
  //     } else if (benef._id === 11) {
  //       benef._id === "Novembre";
  //     } else if (benef._id === 12) {
  //       benef._id === "Decembre";
  //       myTab.push(benef);
  //     } else {
  //       benef._id === "Pas de mois";
  //     }
  //   });

  //   console.log(myTab);

  //   setGetBenefitToConv(netArrToConv);
  // }, [getMonthBenefit]);

  useEffect(() => {
    const getDollar = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/dollar`)
        .then((res) =>
          dispatch(
            getDollarRate({
              dollar: res?.data[0]?.dollar,
              iddollar: res?.data[0]?._id,
            })
          )
        );
    };
    getDollar();
  }, [dispatch]);

  useEffect(() => {
    const getGbp = async () => {
      await axios.get(`${process.env.REACT_APP_CLIENT_URL}/gbp`).then((res) =>
        dispatch(
          getGbpRate({
            gbp: res?.data[0]?.gbp,
            idgbp: res?.data[0]?._id,
          })
        )
      );
    };
    getGbp();
  }, [dispatch]);

  useEffect(() => {
    const getOrdersList = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/order`)
        .then((res) => dispatch(getOrderList(res.data)));
    };
    getOrdersList();
  }, [dispatch]);

  // useEffect(() => {
  //   const getRater = async () => {
  //     await axios
  //       .get(`${process.env.REACT_APP_CLIENT_URL}/order/rate`)
  //       .then((res) =>
  //         dispatch(
  //           getRate({
  //             rate: res?.data[0]?.rate,
  //             idRate: res?.data[0]?._id,
  //           })
  //         )
  //       );
  //   };
  //   getRater();
  // }, [dispatch]);

  // useEffect(() => {
  //   const getSoldes = async () => {
  //     await axios
  //       .get(`${process.env.REACT_APP_CLIENT_URL}/solde`)
  //       .then((res) => {
  //         console.log(res?.data);
  //         dispatch(getSoldeHistory(res?.data));
  //       });
  //   };
  //   getSoldes();
  // }, [dispatch]);

  // useEffect(() => {
  //   const getAllOrders = async () => {
  //     await axios.get(`${process.env.REACT_APP_CLIENT_URL}/buy`).then((res) => {
  //       dispatch(getOrders(res?.data));
  //     });
  //   };
  //   getAllOrders();
  // }, [dispatch]);

  const handleDelete = (idToDelete) => {
    try {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_CLIENT_URL}/server/${idToDelete}`,
      }).then((res) => {
        dispatch(deleteServer({ id: res?.data._id }));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (editId) => {
    setEditServerId(editId);
    let serverData = servers.filter((server) => server._id === editId);
    setServerName(serverData[0].serverName);
    setServerStatus(serverData[0].serverStatus);
    setServerPrice(serverData[0].serverPrice);
    setServerMinQty(serverData[0].serverMinQty);
    setServerCategory(serverData[0].serverCategory);
  };

  const handleCancleModif = () => {
    setEditServerId(null);
  };

  const handleEditServer = (idToEdit) => {
    try {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_CLIENT_URL}/server/${idToEdit}`,
        data: {
          serverName,
          serverStatus,
          serverPrice,
          serverCategory,
          serverMinQty,
        },
      }).then((res) => {
        dispatch(editServer(res?.data));
        notifySuccessToAddServer(res?.data?.serverName);
        setEditServerId(null);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditEuro = () => {
    setEditToggleEuro(true);
  };

  const handleEditUsdt = () => {
    setEditToggleUsdt(true);
  };

  const handleEditDollar = () => {
    setEditToggleDollar(true);
  };

  const handleEditGbp = () => {
    setEditToggleGbp(true);
  };

  const handleEditCad = () => {
    setEditToggleCad(true);
  };

  const handleEditChf = () => {
    setEditToggleChf(true);
  };

  const handleEditRub = () => {
    setEditToggleRub(true);
  };

  const handleCancelEditEuro = () => {
    setEditToggleEuro(false);
  };

  const handleCancelEditCad = () => {
    setEditToggleCad(false);
  };

  const handleCancelEditChf = () => {
    setEditToggleChf(false);
  };

  const handleCancelEditRub = () => {
    setEditToggleRub(false);
  };

  const handleCancelEditUsdt = () => {
    setEditToggleUsdt(false);
  };

  const handleCancelEditDollar = () => {
    setEditToggleDollar(false);
  };

  const handleCancelEditGbp = () => {
    setEditToggleGbp(false);
  };

  const handleUpdateEuro = () => {
    try {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_CLIENT_URL}/euro/${ideuro}`,
        data: {
          euro,
        },
      }).then((res) => {
        dispatch(updateEuro({ euro: res?.data[0]?.euro }));
        notifySuccessCurrency();
        setEditToggleEuro(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCad = () => {
    try {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_CLIENT_URL}/cad/${idcad}`,
        data: {
          cad,
        },
      }).then((res) => {
        dispatch(updateCad({ cad: res?.data[0]?.cad }));
        notifySuccessCurrency();
        setEditToggleCad(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateChf = () => {
    try {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_CLIENT_URL}/chf/${idchf}`,
        data: {
          chf,
        },
      }).then((res) => {
        dispatch(updateChf({ chf: res?.data[0]?.chf }));
        notifySuccessCurrency();
        setEditToggleChf(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateRub = () => {
    try {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_CLIENT_URL}/rub/${idrub}`,
        data: {
          rub,
        },
      }).then((res) => {
        dispatch(updateRub({ rub: res?.data[0]?.rub }));
        notifySuccessCurrency();
        setEditToggleRub(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateDollar = () => {
    try {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_CLIENT_URL}/dollar/${iddollar}`,
        data: {
          dollar,
        },
      }).then((res) => {
        dispatch(updateDollar({ dollar: res?.data[0]?.dollar }));
        notifySuccessCurrency();
        setEditToggleDollar(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateGbp = () => {
    try {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_CLIENT_URL}/gbp/${idgbp}`,
        data: {
          gbp,
        },
      }).then((res) => {
        dispatch(updateGbp({ gbp: res?.data?.gbp }));
        notifySuccessCurrency();
        setEditToggleGbp(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUsdt = () => {
    try {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_CLIENT_URL}/usdt/${idusdt}`,
        data: {
          usdt,
        },
      }).then((res) => {
        dispatch(updateUsdt({ usdt: res?.data[0]?.usdt }));
        notifySuccessCurrency();
        setEditToggleUsdt(false);
      });
    } catch (error) {
      console.log(error);
    }

    // console.log(idUsdt);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl servers">
      <div className="flex items-center justify-between">
        <div className="mb-2">
          <Header category="Page" title="Serveurs" />
          <Link to="/addnewserver">
            <div className="servers-next-add">
              <span className="servers-add">
                {" "}
                <BiAddToQueue />
              </span>
              <span className="servers-add-text">Ajouter un serveur</span>
            </div>
          </Link>
        </div>

        <div className="mb-2 flex flex-col items-center gap-10 mr-10 ml-10">
          <h2 className="font-bold text-gray-400">Devise</h2>
          <div className="flex items-center justify-between server-currency flex-wrap gap-4">
            <div className="mr-8 ml-2 shadow-2xl dark:text-gray-200 flex items-center gap-6">
              <div className="flex flex-col items-center gap-5">
                <span className="server-euro-text">Euro</span>
                {editToggleEuro ? (
                  <input
                    type="number"
                    value={euro}
                    onChange={(e) => setEuro(e.target.value)}
                    className="currency-input"
                  />
                ) : (
                  <span className="server-euro-text">{euro}</span>
                )}
              </div>
              {editToggleEuro ? (
                <div>
                  <span
                    className="servers-update-rate"
                    onClick={handleUpdateEuro}
                  >
                    <BsCheckLg />
                  </span>
                  <span
                    className="servers-cancel-rate"
                    onClick={handleCancelEditEuro}
                  >
                    <MdCancel />
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    display: "none",
                  }}
                >
                  {/* <span className="servers-delete">
                      <RiDeleteBin6Line />
                    </span> */}
                  {!user?.person?.moderator && (
                    <span className="servers-edit" onClick={handleEditEuro}>
                      <RiFileEditLine />
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="mr-8 ml-2 shadow-2xl dark:text-gray-200 flex items-center gap-6">
              <div className="flex flex-col items-center gap-5">
                <span className="server-usdt-text">Usdt</span>
                {editToggleUsdt ? (
                  <input
                    type="number"
                    value={usdt}
                    onChange={(e) => setUsdt(e.target.value)}
                    className="currency-input"
                  />
                ) : (
                  <span className="server-usdt-text">{usdt}</span>
                )}
              </div>
              {editToggleUsdt ? (
                <div>
                  <span
                    className="servers-update-rate"
                    onClick={handleUpdateUsdt}
                  >
                    <BsCheckLg />
                  </span>
                  <span
                    className="servers-cancel-rate"
                    onClick={handleCancelEditUsdt}
                  >
                    <MdCancel />
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    display: "none",
                  }}
                >
                  {/* <span className="servers-delete">
                      <RiDeleteBin6Line />
                    </span> */}
                  {!user?.person?.moderator && (
                    <span className="servers-edit" onClick={handleEditUsdt}>
                      <RiFileEditLine />
                    </span>
                  )}
                </div>
              )}
              {/* <input type="number" /> */}
            </div>
            <div className="mr-8 ml-2 shadow-2xl dark:text-gray-200 flex items-center gap-6">
              <div className="flex flex-col items-center gap-5">
                <span className="server-dollar-text">Dollar</span>
                {editToggleDollar ? (
                  <input
                    type="number"
                    value={dollar}
                    onChange={(e) => setDollar(e.target.value)}
                    className="currency-input"
                    placeholder={dollar}
                  />
                ) : (
                  <span className="server-dollar-text">{dollar}</span>
                )}
              </div>
              {editToggleDollar ? (
                <div>
                  <span
                    className="servers-update-rate"
                    onClick={handleUpdateDollar}
                  >
                    <BsCheckLg />
                  </span>
                  <span
                    className="servers-cancel-rate"
                    onClick={handleCancelEditDollar}
                  >
                    <MdCancel />
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    display: "none",
                  }}
                >
                  {/* <span className="servers-delete">
                      <RiDeleteBin6Line />
                    </span> */}
                  {!user?.person?.moderator && (
                    <span className="servers-edit" onClick={handleEditDollar}>
                      <RiFileEditLine />
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="mr-8 ml-2 shadow-2xl dark:text-gray-200 flex items-center gap-6">
              <div className="flex flex-col items-center gap-5">
                <span className="server-dollar-text">GBP</span>
                {editToggleGbp ? (
                  <input
                    type="number"
                    value={gbp}
                    onChange={(e) => setgbp(e.target.value)}
                    className="currency-input"
                    placeholder={gbp}
                  />
                ) : (
                  <span className="server-dollar-text">{gbp}</span>
                )}
              </div>
              {editToggleGbp ? (
                <div>
                  <span
                    className="servers-update-rate"
                    onClick={handleUpdateGbp}
                  >
                    <BsCheckLg />
                  </span>
                  <span
                    className="servers-cancel-rate"
                    onClick={handleCancelEditGbp}
                  >
                    <MdCancel />
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    display: "none",
                  }}
                >
                  {/* <span className="servers-delete">
                      <RiDeleteBin6Line />
                    </span> */}
                  {!user?.person?.moderator && (
                    <span className="servers-edit" onClick={handleEditGbp}>
                      <RiFileEditLine />
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="mr-8 ml-2 shadow-2xl dark:text-gray-200 flex items-center gap-6">
              <div className="flex flex-col items-center gap-5">
                <span className="server-dollar-text">CAD</span>
                {editToggleCad ? (
                  <input
                    type="number"
                    value={cad}
                    onChange={(e) => setCad(e.target.value)}
                    className="currency-input"
                    placeholder={cad}
                  />
                ) : (
                  <span className="server-dollar-text">{cad}</span>
                )}
              </div>
              {editToggleCad ? (
                <div>
                  <span
                    className="servers-update-rate"
                    onClick={handleUpdateCad}
                  >
                    <BsCheckLg />
                  </span>
                  <span
                    className="servers-cancel-rate"
                    onClick={handleCancelEditCad}
                  >
                    <MdCancel />
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    display: "none",
                  }}
                >
                  {/* <span className="servers-delete">
                      <RiDeleteBin6Line />
                    </span> */}
                  {!user?.person?.moderator && (
                    <span className="servers-edit" onClick={handleEditCad}>
                      <RiFileEditLine />
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="mr-8 ml-2 shadow-2xl dark:text-gray-200 flex items-center gap-6">
              <div className="flex flex-col items-center gap-5">
                <span className="server-dollar-text">CHF</span>
                {editToggleChf ? (
                  <input
                    type="number"
                    value={chf}
                    onChange={(e) => setChf(e.target.value)}
                    className="currency-input"
                    placeholder={chf}
                  />
                ) : (
                  <span className="server-dollar-text">{chf}</span>
                )}
              </div>
              {editToggleChf ? (
                <div>
                  <span
                    className="servers-update-rate"
                    onClick={handleUpdateChf}
                  >
                    <BsCheckLg />
                  </span>
                  <span
                    className="servers-cancel-rate"
                    onClick={handleCancelEditChf}
                  >
                    <MdCancel />
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    display: "none",
                  }}
                >
                  {/* <span className="servers-delete">
                      <RiDeleteBin6Line />
                    </span> */}
                  {!user?.person?.moderator && (
                    <span className="servers-edit" onClick={handleEditChf}>
                      <RiFileEditLine />
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="mr-8 ml-2 shadow-2xl dark:text-gray-200 flex items-center gap-6">
              <div className="flex flex-col items-center gap-5">
                <span className="server-dollar-text">RUB</span>
                {editToggleRub ? (
                  <input
                    type="number"
                    value={rub}
                    onChange={(e) => setRub(e.target.value)}
                    className="currency-input"
                    placeholder={rub}
                  />
                ) : (
                  <span className="server-dollar-text">{rub}</span>
                )}
              </div>
              {editToggleRub ? (
                <div>
                  <span
                    className="servers-update-rate"
                    onClick={handleUpdateRub}
                  >
                    <BsCheckLg />
                  </span>
                  <span
                    className="servers-cancel-rate"
                    onClick={handleCancelEditRub}
                  >
                    <MdCancel />
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    display: "none",
                  }}
                >
                  {/* <span className="servers-delete">
                      <RiDeleteBin6Line />
                    </span> */}
                  {!user?.person?.moderator && (
                    <span className="servers-edit" onClick={handleEditRub}>
                      <RiFileEditLine />
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="table_responsive" id="server">
        <table>
          <thead>
            <tr>
              <th>Num</th>
              <th>server</th>
              <th>Categorie</th>
              <th>Prix(MAD)</th>
              <th>Status</th>
              {/* <th>Min QTY</th> */}
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {servers?.map((server, i) => (
              <tr key={server._id}>
                <td>
                  {i >= 9 ? "" : "0"}
                  {i + 1}
                </td>
                <td>
                  {editServerId === server?._id ? (
                    <input
                      type="text"
                      value={serverName}
                      onChange={(e) => setServerName(e.target.value)}
                    />
                  ) : (
                    <span className="servers-name">{server?.serverName}</span>
                  )}
                </td>
                <td>
                  {editServerId === server?._id ? (
                    // <input type="text" defaultValue={server?.serverCategory} />
                    <select
                      value={serverCategory}
                      onChange={(e) => setServerCategory(e.target.value)}
                    >
                      <option value="dofus-kamas">Dofus Kamas</option>
                      <option value="dofus-touch">Dofus Touch</option>
                      <option value="dofus-retro">Dofus Retro</option>
                    </select>
                  ) : (
                    <span className="servers-cat">
                      {server?.serverCategory}
                    </span>
                  )}
                </td>
                <td>
                  {editServerId === server?._id ? (
                    <input
                      type="number"
                      value={serverPrice}
                      onChange={(e) => setServerPrice(e.target.value)}
                    />
                  ) : (
                    <span className="servers-price">{server?.serverPrice}</span>
                  )}
                </td>
                <td>
                  {editServerId === server?._id ? (
                    <select
                      className="servers_selec"
                      value={serverStatus}
                      onChange={(e) => setServerStatus(e.target.value)}
                    >
                      <option value="Vendre rapidement">
                        Vendre rapidement
                      </option>
                      <option value="Disponible">
                        Cliquer ici pour vendre
                      </option>
                      <option value="Stock complet">Stock complet</option>
                    </select>
                  ) : (
                    <span
                      className={
                        server.serverStatus === "disponible"
                          ? "success"
                          : server.serverStatus === "Stock complet"
                          ? "no-success"
                          : "quickly"
                      }
                    >
                      {server.serverStatus === "disponible"
                        ? "Cliquer pour vendre"
                        : server.serverStatus}
                    </span>
                  )}
                </td>
                {/* <td>
                  {editServerId === server?._id ? (
                    <input
                      type="number"
                      value={serverMinQty}
                      onChange={(e) => setServerMinQty(e.target.value)}
                    />
                  ) : (
                    <span className="servers-price">
                      {server?.serverMinQty}
                    </span>
                  )}
                </td> */}
                {editServerId === server?._id ? (
                  <td>
                    <div className="action_btn">
                      <button
                        className="servers-valid"
                        onClick={() => handleEditServer(server?._id)}
                      >
                        Valider
                      </button>
                      <button
                        className="servers-cancel"
                        onClick={handleCancleModif}
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
                        onClick={() => handleDelete(server?._id)}
                      >
                        <RiDeleteBin6Line />
                      </span>
                      <span
                        className="servers-edit"
                        onClick={() => handleEdit(server?._id)}
                      >
                        <RiFileEditLine />
                      </span>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
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

export default Servers;
