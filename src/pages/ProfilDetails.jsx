/* @ts-nocheck */
/* eslint-disable */

import React, { useState } from "react";
import { Header } from "../components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import profilUser from "../assets/default-user.png";

const ProfilDetails = () => {
  let params = useParams();
  const userId = params.profilId;
  const { users } = useSelector((state) => state.user);
  const [userSearched, setUserSearched] = useState(
    users.filter((user) => user?._id === userId)[0]
  );

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl profidetailProfil">
      <Header
        category="Client"
        title={`Profile de ${userSearched.lastname} ${userSearched.firstname}`}
      />
      <div className="my-infos">
        <div className="my-infos-user-profil">
          <img
            src={userSearched?.profil ? userSearched?.profil : profilUser}
            alt="profil user"
          />

          <label htmlFor="">Prénom: {userSearched?.lastname}</label>
          <label htmlFor="">Nom: {userSearched?.firstname}</label>
          <label htmlFor="">Email: {userSearched?.email}</label>
          <label htmlFor="">Adresse: {userSearched?.address}</label>
          <label htmlFor="">Téléphone: {userSearched?.phone}</label>
        </div>
        <div className="my-infos-labels">
          <div className="infos-payment">
            <label htmlFor="">Pays: {userSearched?.country}</label>
            <label htmlFor="">Ville: {userSearched?.city}</label>
            <label htmlFor="">Devise: {userSearched?.currency}</label>
          </div>
          {userSearched?.currency === "dhs" && (
            <div className="infos-payment">
              <div className="infos-payment-fields">
                <label htmlFor="">
                  Methode de paiements: {userSearched?.currencymethod}
                </label>
                <label htmlFor="">Banque: {userSearched?.dhsBank}</label>
                <label htmlFor="">
                  Prénom: {userSearched?.dhsBankLastname}
                </label>
                <label htmlFor="">Nom: {userSearched?.dhsBankFirstname}</label>
                <label htmlFor="">RIB: {userSearched?.dhsRib}</label>
              </div>
            </div>
          )}

          {userSearched?.currency === "euro" && (
            <div className="infos-payment">
              <div className="infos-payment-fields">
                <label htmlFor="">
                  Methode de paiements: {userSearched?.currencymethod}
                </label>
                {userSearched?.currencymethod === "skrill" && (
                  <label htmlFor="">
                    Email de paimement : {userSearched?.emailCurrencyEuro}
                  </label>
                )}

                {userSearched?.currencymethod === "payeer" && (
                  <label htmlFor="">
                    Compte Payeer : {userSearched?.payeeraccount}
                  </label>
                )}

                {userSearched?.currencymethod === "paypal" && (
                  <label htmlFor="">
                    Email de paimement : {userSearched?.emailCurrencyEuro}
                  </label>
                )}
                {userSearched?.currencymethod === "sepa" && (
                  <label htmlFor="">IBAN: {userSearched?.ibanCurrency}</label>
                )}

                {userSearched?.currencymethod === "paylib" && (
                  <div className="modify-profil-sepa">
                    <label htmlFor="">
                      Prénom: {userSearched?.paylibcurencyLastname}
                    </label>
                    <label htmlFor="">
                      Nom: {userSearched?.paylibcurencyFirstname}
                    </label>
                    <label htmlFor="">
                      Téléphone: {userSearched?.paylibcurencyTel}
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}

          {userSearched?.currency === "usdt" && (
            <div className="infos-payment">
              <div className="infos-payment-fields">
                <label htmlFor="">
                  Methode de paiements: {userSearched?.currencymethod}
                </label>
                {userSearched?.currencymethod === "binance pay" && (
                  <label htmlFor="">
                    Email de paimement: {userSearched?.emailCurrencyEuro}
                  </label>
                )}
                {userSearched?.currencymethod === "trc20" && (
                  <label htmlFor="">
                    Adresse TRX: {userSearched?.usdtAdressTrx}
                  </label>
                )}
              </div>
            </div>
          )}

          {userSearched?.currency === "cny" && (
            <div className="infos-payment">
              <div className="infos-payment-fields">
                <label htmlFor="">
                  Methode de paiements: {userSearched?.currencymethod}
                </label>
                {userSearched?.currencymethod === "alipay" && (
                  <label htmlFor="">
                    Compte alipay : {userSearched?.emailCurrencyEuro}
                  </label>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilDetails;
