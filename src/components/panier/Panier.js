import React from "react";
import TotalPanier from "./TotalPanier";
import LignePanier from "./LignePanier";

function Panier(props) {

    return(
        <>
            {props.panier.map((panierLigne, index) => (

                <LignePanier key={index}
                             ligne={panierLigne.ligne}
                             id={panierLigne.id}
                             nom={panierLigne.nom}
                             prix={panierLigne.prix}
                             photo={panierLigne.photo}
                             qte={panierLigne.qte}
                             rechargerPanier={props.rechargerPanier}
                />
                )
            )}
            <TotalPanier totalPanier={props.totalPanier} />
        </>
    )
}

export default Panier;