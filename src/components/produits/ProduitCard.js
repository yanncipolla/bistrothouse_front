import React from "react";
import ModalProduit from "./ModalProduit";
import {ajouterProduitAuPanier} from "../../services/panierService";

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

                        {/*Bouton Ajouter + input number*/}
                        <div className="row">
                            <div className="col px-0 ml-0 mr-1">
                                <button type="button" className="btn btn-warning btn-block" data-toggle="modal" data-target="#modal"
                                        onClick={()=> {
                                            let qte = parseInt(document.getElementById('qteId' + props.id).value)
                                            ajouterProduitAuPanier(props.id, props.description, props.photo, props.prix, qte)
                                        }
                                    }
                                >
                                    Ajouter au panier
                                </button>
                            </div>
                            <div className="col-auto px-0 mx-0">
                                <input type="number" className="form-control input-number" defaultValue="1" id={"qteId" + props.id} />
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <ModalProduit/>
        </>
    );
};

export default ProduitCard;