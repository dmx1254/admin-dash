/* @ts-nocheck */
/* eslint-disable */

import React, { useEffect, useState } from "react";
import { Header } from "../components";

import { useSelector, useDispatch } from "react-redux";

import FileBase from "react-file-base64";

import { addProduct } from "../features/productSlice";

import { Link } from "react-router-dom";

import { deleteProduct } from "../features/productSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getProducts } from "../features/productSlice";
import axios from "axios";

const Products = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [headerDescription, setHeaderDescription] = useState("");

  const [addProductToggle, setAddProductToggle] = useState(false);

  useEffect(() => {
    const getProductsList = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/products`)
        .then((res) => dispatch(getProducts(res.data)));
    };
    getProductsList();
  }, [dispatch]);

  const handleSetAddProduct = () => {
    setAddProductToggle(true);
  };

  const handleCancelAddProduct = () => {
    setAddProductToggle(false);
  };

  const notifySuccessAddNewProduct = () =>
    toast.success("Produit ajouté avec succès");

  const notifySuccessDeletedProduct = () =>
    toast.success("Produit supprimé avec succès");

  const notifyErrorAddNewProduct = () =>
    toast.error("Veuillez remplir tous les champs avant d'ajouter un produit");

  const { productDofus } = useSelector((state) => state.productDofus);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !image || !category || !headerDescription) {
      notifyErrorAddNewProduct();
    } else {
      try {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_CLIENT_URL}/products`,
          data: {
            title,
            description,
            image,
            category,
            headerDescription,
          },
        }).then((res) => {
          dispatch(addProduct(res?.data));
          notifySuccessAddNewProduct();
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteProduct = (idProductToDelete) => {
    try {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_CLIENT_URL}/products/${idProductToDelete}`,
      }).then((res) => {
        dispatch(deleteProduct({ id: res?.data._id }));
        notifySuccessDeletedProduct();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl flex flex-col gap-2 dark:bg-secondary-dark-bg products">
      <div className="flex items-center justify-between cat-wrapper">
        <Header category="products" title="Produits Dofus" />
        {!user?.person.moderator && (
          <button className="btn-add-product" onClick={handleSetAddProduct}>
            Ajouter un produit
          </button>
        )}
      </div>

      <div className="mt-2 flex items-center justify-around flex-wrap products-wrapper">
        {productDofus.map((product) => (
          <div className="flex items-center gap-10 flex-col products-wrapper-dofus">
            <div className="flex items-center flex-col gap-6">
              <span className="text-lg text-gray-400">{product?.title}</span>
              <Link to="/#server">
                <img
                  src={product?.image}
                  alt={product?.title}
                  className="img-product-wrapper"
                />
              </Link>
            </div>
            <div className="flex items-center">
              {!user?.person.moderator && (
                <button
                  className="btn-sup"
                  onClick={() => handleDeleteProduct(product?._id)}
                >
                  Supprimer
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {addProductToggle && (
        <div className="mt-10  producs-addNewProduct">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                id="title"
                placeholder="Titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="choose-filebase">
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => setImage(base64)}
                />
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="desc">Déscription du produit</label>
              <input
                type="text"
                id="desc"
                placeholder="Déscription du produit"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="cat">Catégorie</label>
              <input
                type="text"
                id="cat"
                placeholder="Catégorie"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="headerDes">Description d'entête</label>
              <input
                type="text"
                id="headerDes"
                placeholder="Description d'entête"
                value={headerDescription}
                onChange={(e) => setHeaderDescription(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Ajouter le produit"
              className="input-submit"
            />
          </form>
          <button
            onClick={handleCancelAddProduct}
            className="add-cancel-product"
          >
            Fermer
          </button>
        </div>
      )}
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

export default Products;
