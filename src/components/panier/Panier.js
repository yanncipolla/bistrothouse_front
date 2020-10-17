import React, {useState, useEffect} from "react";
import TotalPanier from "./TotalPanier";
import LignePanier from "./LignePanier";

function Panier() {

    if (window.localStorage.getItem('panier') === null || window.localStorage.getItem('panier') === "{}"){
        return (
            <>
                <h2 className="text-center mt-5">Votre panier est vide</h2>
            </>
        )
    }
    return(
        <>
            {JSON.parse(window.localStorage.getItem('panier')).liste.map((panierLigne, index) => (

                <LignePanier key={index}
                             ligne={panierLigne.ligne}
                             id={panierLigne.id}
                             nom={panierLigne.nom}
                             prix={panierLigne.prix}
                             photo={panierLigne.photo}
                             qte={panierLigne.qte}
                />
                )
            )}
            <TotalPanier total={JSON.parse(window.localStorage.getItem('panier')).total}/>
        </>
    )
}

export default Panier;