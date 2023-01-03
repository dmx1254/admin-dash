/* @ts-nocheck */
/* eslint-disable */

import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import { addServer } from "../features/serverSlices";

import { Header } from "../components";

const AddNewServer = () => {
  const dispatch = useDispatch();
  const [serverName, setServerName] = useState("");
  const [serverCategory, setServerCategory] = useState("");
  const [serverStatus, setServerStatus] = useState("");
  const [serverMinQty, setServerMinQty] = useState("");
  const [serverPrice, setServerPrice] = useState("");
  const notifySuccessAddNewServer = () =>
    toast.success("Serveur ajouté avec succès");

  const handleAddServer = (e) => {
    e.preventDefault();

    try {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_CLIENT_URL}/server`,
        data: {
          serverName,
          serverCategory,
          serverStatus,
          serverMinQty,
          serverPrice,
        },
      }).then((res) => {
        dispatch(addServer(res?.data));
        notifySuccessAddNewServer();
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl servers">
      <Header category="Page" title="Ajouter un serveur" />
      <div className="addnewserver">
        <form onSubmit={handleAddServer}>
          <div className="add-server-new">
            <div>
              <label htmlFor="servername">Nom du serveur</label>
              <input
                type="text"
                value={serverName}
                placeholder="Nom du serveur"
                id="servername"
                onChange={(e) => setServerName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="servercategory">Categorie du serveur</label>
              <select
                value={serverCategory}
                onChange={(e) => setServerCategory(e.target.value)}
              >
                <option value="" className="def-opt">
                  Choisissez un catégorie
                </option>
                <option value="dofus-kamas">Dofus Kamas</option>
                <option value="dofus-touch">Dofus Touch</option>
                <option value="dofus-retro">Dofus Retro</option>
              </select>
            </div>
          </div>

          <div className="add-server-new">
            <div>
              <label htmlFor="servername">Qty Min du serveur</label>
              <input
                type="number"
                value={serverMinQty}
                id="servername"
                placeholder="Qty Min du serveur"
                onChange={(e) => setServerMinQty(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="servercategory">Status du serveur</label>
              <select
                value={serverStatus}
                onChange={(e) => setServerStatus(e.target.value)}
              >
                <option value="" className="def-opt">
                  Choisissez le status
                </option>
                <option value="Disponible">Disponible</option>
                <option value="Vendre rapidement">Vendre rapidement</option>
                <option value="Stock complet">Stock complet</option>
              </select>
            </div>
          </div>
          <div className="add-new-server-price">
            <label htmlFor="serverprice">Prix du serveur</label>
            <input
              type="number"
              value={serverPrice}
              id="serverprice"
              placeholder="Prix du serveur"
              onChange={(e) => setServerPrice(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Ajouter un serveur"
            className="confirm-new-server"
          />
        </form>
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

export default AddNewServer;
