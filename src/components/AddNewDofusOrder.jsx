/* @ts-nocheck */
/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { addNewOrder } from "../features/ordersSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const AddNewDofusOrder = () => {
  const dispatch = useDispatch();

  const { servers } = useSelector((state) => state.servers);

  const [userInfo, setUserInfo] = useState(null);

  const [userId, setUserId] = useState("");
  const [numBuy, setNumBuy] = useState("");
  const [jeu, setJeu] = useState("");
  const [server, setServer] = useState("");
  const [pu, setPu] = useState(1);
  const [qte, setQte] = useState(1);
  const [totalPrice, setTotalPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [status, setStatus] = useState("");
  const [serverFiltered, setServerFiltered] = useState(servers);

  const notifyErrorToAddSoldeUser = () =>
    toast.error(
      "Veuiller remplir tous les champs avant de confirmer la commande"
    );

  const notifySuccessToAddOrder = (name) =>
    toast.success("Commande N° " + name + " à été ajouté avec succés");

  let params = useParams();
  let orderId = params.dofusId;
  console.log(userInfo);

  useEffect(() => {
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_CLIENT_URL}/users/${orderId}`,
      }).then((res) => {
        setUserInfo(res?.data);
        setUserId(res?.data?._id);
      });
    } catch (error) {
      console.log(error);
    }
  }, [orderId]);

  const handleModifyServer = (e) => {
    setServer(e.target.value);
    let priceServer = servers.filter(
      (server) => server.serverName === e.target.value
    )[0].serverPriceDh;
    setPu(priceServer);
  };

  useEffect(() => {
    setTotalPrice((qte * pu).toFixed(2));
  }, [qte, pu]);

  const codeGenerated = () => {
    const generateRandomCode =
      "0123456789abcdefghijklmnopkrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let myCode = "";
    for (let i = 0; i < 7; i++) {
      let code = Math.floor(Math.random() * generateRandomCode.length);
      myCode += generateRandomCode[code];
    }
    return myCode;
  };

  useEffect(() => {
    setNumBuy(codeGenerated());
  }, []);

  const handleModifJeu = (e) => {
    setJeu(e.target.value);

    setServerFiltered(
      servers.filter((server) => server?.serverCategory === e.target.value)
    );
  };

  useEffect(() => {
    userInfo?.currency === "dhs"
      ? setPaymentMethod(
          "Banque: " +
            userInfo?.dhsBank +
            " " +
            "Prénom de paie: " +
            userInfo?.dhsBankLastname +
            " " +
            "Nom de paie: " +
            userInfo?.dhsBankFirstname +
            " " +
            "Rib: " +
            userInfo?.dhsRib
        )
      : userInfo?.currency === "euro"
      ? userInfo?.currencymethod === "skrill" ||
        userInfo?.currencymethod === "paypal"
        ? setPaymentMethod(
            userInfo?.currencymethod +
              " " +
              "Email de paie : " +
              userInfo?.emailCurrencyEuro
          )
        : userInfo?.currencymethod === "payeer"
        ? setPaymentMethod("Compte Payeer: " + userInfo?.payeeraccount)
        : userInfo?.currencymethod === "paylib"
        ? setPaymentMethod(
            "Prénom de paie paylib: " +
              userInfo?.paylibcurencyLastname +
              " " +
              "Nom de paie paylib: " +
              userInfo?.paylibcurencyFirstname +
              " " +
              "Tél de paie paylib: " +
              userInfo?.paylibcurencyTel
          )
        : userInfo?.currencymethod === "sepa"
        ? setPaymentMethod("IBAN " + userInfo?.ibanCurrency)
        : ""
      : userInfo?.currency === "usdt"
      ? userInfo?.currencymethod === "binance pay"
        ? setPaymentMethod("Email binance pay: " + userInfo?.emailCurrencyEuro)
        : userInfo?.currencymethod === "trc20"
        ? setPaymentMethod("Adresse TRX trc20: " + userInfo?.usdtAdressTrx)
        : ""
      : "";
  }, [userInfo]);

  const handleAddOrder = (e) => {
    e.preventDefault();
    if (
      !userId ||
      !jeu ||
      !qte ||
      !pu ||
      !paymentMethod ||
      !numBuy ||
      !numBuy ||
      !totalPrice
    ) {
      notifyErrorToAddSoldeUser();
    } else {
      try {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_CLIENT_URL}/buy`,
          data: {
            userId,
            numBuy,
            jeu,
            server,
            pu,
            qte,
            totalPrice,
            paymentMethod,
            status,
          },
        }).then((res) => {
          console.log(res?.data);
          dispatch(addNewOrder(res?.data));
          notifySuccessToAddOrder(res?.data?.numBuy);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="addnewdofusorder">
      <form onSubmit={handleAddOrder} className="form_addnewsolde">
        <div>
          <div>
            <label htmlFor="">userId</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="User ID"
            />
          </div>
          <div>
            <label htmlFor="">N° de commande</label>
            <input
              type="text"
              value={numBuy}
              onChange={(e) => setNumBuy(e.target.value)}
              placeholder="N° de commande"
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="">Jeu</label>
            <select value={jeu} onChange={handleModifJeu}>
              <option value="">Choisissez le catégorie dofus</option>
              <option value="dofus-kamas">Dofus Kamas</option>
              <option value="dofus-retro">Dofus Retro</option>
              <option value="dofus-touch">Dofus Touch</option>
            </select>
          </div>

          <div>
            <label htmlFor="">Serveur</label>
            <select value={server} onChange={handleModifyServer}>
              <option value="">Choisir le serveur</option>
              {serverFiltered?.map((server) => (
                <option value={server?.serverName}>{server?.serverName}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="">Quantité</label>
            <input
              type="number"
              value={qte}
              onChange={(e) => setQte(e.target.value)}
              placeholder="Quantité"
            />
          </div>
          <div>
            <label htmlFor="">Prix unitaire</label>
            <input
              type="number"
              value={pu}
              onChange={(e) => setPu(e.target.value)}
              placeholder="Prix unitaire"
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="">Méthode de paie</label>
            <input
              type="text"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              placeholder="Méthode de paie"
            />
          </div>

          <div>
            <label htmlFor="">Total</label>
            <input
              type="number"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              placeholder="Total"
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Choisissez le status</option>
              <option value="En attente">En attente</option>
              <option value="Payée">Payée</option>
              <option value="Annulée">Annulée</option>
            </select>
          </div>
        </div>
        <input
          type="submit"
          value="Confirmer commande"
          className="btn-confirm-solde"
        />
      </form>
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

export default AddNewDofusOrder;
