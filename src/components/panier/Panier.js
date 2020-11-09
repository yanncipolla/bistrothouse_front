import React from "react";
import TotalPanier from "./TotalPanier";
import LignePanier from "./LignePanier";

function Panier(props) {

    return(
        <>
            <div className="row">
                <div className="col">
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
                </div>
            </div>
            <div className="row mt-5">
                <div className="col">
                    <TotalPanier totalPanier={props.totalPanier} />
                </div>
            </div>
        </>
    )
}

export default Panier;