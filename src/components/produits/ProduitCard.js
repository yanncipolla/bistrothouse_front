import React from "react";
// import {ajouterProduitAuPanier} from "../../services/PanierService";
import ModalProduit from "./ModalProduit";

const ProduitCard = (props) => {

    return (
        <>
            <div className="col-4 cusmtomCard px-2">
                <div className="card my-3 cusmtomCard">
                    <img className="card-img-top" src={`${process.env.REACT_APP_SYMFONY_APP_URL}/Images/Produits/${props.photo}`} alt="Card cap"/>
                    <div className="card-body">
                        <div className="shadow p-3 mb-5 bg-white rounded">
                            <h5 className="card-title">{props.nom}</h5>
                            <p className="card-text" style={{minHeight : 120}}>{props.description}</p>
                            <p className="text-muted">{props.prix} €</p>
                        </div>
                        {/*<button type="button" className="btn btn-warning  btn-block" data-toggle="modal" data-target="#modal" onClick={()=>(ajouterProduitAuPanier(props.id))}>Ajouter au panier*/}
                        <button type="button" className="btn btn-warning  btn-block" data-toggle="modal" data-target="#modal">Ajouter au panier
                        </button>
                    </div>
                </div>
            </div>
            <ModalProduit/>
        </>
    );
};

export default ProduitCard;