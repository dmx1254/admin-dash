/* @ts-nocheck */
/* eslint-disable */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Header } from "../components";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RiEyeFill, RiAddBoxFill, RiDeleteBin6Line } from "react-icons/ri";

import { useDispatch } from "react-redux";

import { deleteSingleUser } from "../features/userSlices";

// import defaultUser from "../assets/default-user.png";

import { BiSearch } from "react-icons/bi";

import { Link } from "react-router-dom";

import axios from "axios";

const Clients = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  // console.log(users);

  const [searchTerm, setSearchTerm] = useState("");

  const notifySuccessToDeleteUser = (first, second) =>
    toast.success(
      "l'utilisateur " + first + " " + second + " à été supprimé avec succés"
    );

  // const handleAddNewDofusOrderUser = (idToAddOrder) => {
  //   console.log(idToAddOrder);
  // };

  const convertDate = (date) => {
    const dateConverted = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return dateConverted;
  };

  const handleRemoveUser = (idUserToRemove) => {
    try {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_CLIENT_URL}/users/${idUserToRemove}`,
      }).then((res) => {
        dispatch(deleteSingleUser({ id: res?.data._id }));
        notifySuccessToDeleteUser(res?.data?.lastname, res?.data?.firstname);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg clients">
      <div className="mb-2 flex items-center justify-between mr-6">
        <Header category="Page" title="Clients" />
        <div className="infos-user-search">
          <input
            type="text"
            name="search"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search user..."
          />
          <span className="search_addnewsolde">
            <BiSearch />
          </span>
        </div>
      </div>
      <div className="mt-2 mb-2 table_responsive">
        <table>
          <thead>
            <tr>
              <th>Num</th>
              {/* <th>Profil</th> */}
              <th>Prenom</th>
              <th>Nom</th>
              {/* <th>Address</th> */}
              <th>email</th>
              {/* <th>Pays</th> */}
              {/* <th>Ville</th>
              <th>phone</th> */}
              <th>Devise</th>
              <th>Methode de paiement</th>
              <th>Membre depuis</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users
              ?.filter((user) =>
                user.email.includes(searchTerm.toLocaleLowerCase())
              )
              .filter((user) => !user?.isAdmin)
              .map((singleuser, i) => (
                <tr key={singleuser?._id}>
                  <td>
                    {i >= 9 ? "" : "0"}
                    {i + 1}
                  </td>
                  {/*<td>
                    <img
                      src={
                        singleuser?.profil ? singleuser?.profil : defaultUser
                      }
                      alt="profil"
                    />
                  </td> */}
                  <td>{singleuser?.lastname}</td>
                  <td>{singleuser?.firstname}</td>
                  {/* <td>{singleuser?.address}</td> */}
                  <td>{singleuser?.email}</td>
                  {/* <td>{singleuser?.country}</td> */}
                  {/* <td>{singleuser?.city}</td>
                  <td>{singleuser?.phone}</td> */}
                  <td>{singleuser?.currency}</td>
                  <td>{singleuser?.currencymethod}</td>
                  <td>{convertDate(singleuser?.createdAt)}</td>
                  <td>
                    <div className="action_btn">
                      <Link
                        className="profil-detail-user"
                        to={`/profil/${singleuser?._id}`}
                      >
                        <span className="servers-view">
                          <RiEyeFill />
                        </span>
                      </Link>
                      <span
                        className="servers-delete"
                        onClick={() => handleRemoveUser(singleuser?._id)}
                      >
                        <RiDeleteBin6Line />
                      </span>
                      <Link
                        to={`/profil/${singleuser?._id}`}
                        className="profil-detail-user"
                      >
                        <span className="servers-add">
                          <RiAddBoxFill />
                        </span>
                      </Link>
                    </div>
                  </td>
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

export default Clients;
