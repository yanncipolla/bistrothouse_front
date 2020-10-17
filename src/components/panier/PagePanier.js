import React from "react";
// import {checkTokenValidity} from "../../services/authentificationService";
import {useHistory} from "react-router-dom";
import Panier from "./Panier";
import {supprimerPanier} from "../../services/panierService";

function PagePanier(props) {

    const history = useHistory();

    if (window.localStorage.getItem('panier') === null || window.localStorage.getItem('panier') === "{}"){
        return (
            <>
                {/* <!-- Carousel  --> */}
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="/images/panier/slidevotrepanier.jpg" className="d-block w-100" alt="..."/>
                        </div>
                    </div>
                </div>
                {/* <!-- Fin carousel --> */}

                <h2 className="text-center mt-5">Votre panier est vide</h2>
            </>
        )
    } else {
        return (
            <>

                {/* <!-- Carousel  --> */}
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="/images/panier/slidevotrepanier.jpg" className="d-block w-100" alt="..."/>
                        </div>
                    </div>
                </div>
                {/* <!-- Fin carousel --> */}
                <div className="container">

                    <Panier/>

                    {/*****Bouton vider le panier*/}
                    <div className="row">
                        <div className="col-md text-center ml-5">
                            <button type="button" className="btn btn-warning mt-5" onClick={() => {
                                supprimerPanier()
                                // TODO : Rafraichir juste le composant panier une fois celui-ci supprimer
                                window.location.reload(false);
                            }}>
                                Vider mon panier

                            </button>
                            {/*****FIN Bouton vider le panier*/}
                        </div>
                        <div className="col text-center">
                            {/*****Bouton valider le panier*/}
                            <button type="button" className="btn btn-warning mt-5 ml-5" onClick={() => {
                                let panier = window.localStorage.getItem('panier');
                                if (panier === '[]' || panier === null) {
                                    alert("Panier vide, impossible de valider la commande")
                                } else if (!props.loginState) {
                                    alert("Veuillez vous connecter avant de valider la commande")
                                } else {
                                    history.push("/validationPanier")
                                }
                            }}>
                                Valider commande
                            </button>
                            {/*****FIN Bouton valider le panier*/}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default PagePanier;