import React from "react";
import {supprimerProduitDuPanier} from "../../services/panierService";

function LignePanier(props) {
    return (
        <div className="row">
            <div className="col-auto py-3 d-flex flex-wrap align-content-center justify-content-center border-bottom">
                <img className="miniproduit" src={`${process.env.REACT_APP_SYMFONY_APP_URL}/images/produits/${props.photo}`} alt={props.nom} />
            </div>
            <div className="col-auto py-3 d-flex flex-wrap align-content-center justify-content-center border-bottom">
                X {props.qte}
            </div>
            <div className="col py-3 d-flex flex-wrap align-content-center justify-content-center border-bottom">
                {props.nom}
            </div>
            <div className="col-auto py-3 d-flex flex-wrap align-content-center justify-content-center border-bottom">
                {props.prix} €{" "}
            </div>
            <div className="col-auto py-3 d-flex flex-wrap align-content-center justify-content-center border-bottom">
                <div className="row">
                    <div className="col d-flex align-items-center btn btn-outline-dark">
                        <img src="/images/panier/supprimer.png" alt="Supprimer"
                             onClick={()=>{
                                 supprimerProduitDuPanier(props.ligne)
                                 props.rechargerPanier()
                             }}
                        />
                    </div>
                </div>
            </div>
       </div>
    );
}

export default LignePanier;
