import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import Panier from "./Panier";
import {chargerPanier, chargerTotalPanier, supprimerPanier} from "../../services/panierService";
import SlidePrincipal from "../utils/SlidePrincipal";
import Alert from "../utils/Alert";

function PagePanier(props) {

    const history = useHistory();

    const [panier, setPanier] = useState(chargerPanier());
    const [totalPanier, setTotalPanier] = useState(chargerTotalPanier());
    const [erreurMsg, setErreurMsg] = useState(null);

    function rechargePanier(){
        setPanier(chargerPanier())
        setTotalPanier(chargerTotalPanier())
        setErreurMsg(null)
    }

    // ************************************
    // ********* Rendu de la page *********
    // ************************************

    if (window.localStorage.getItem('panier') === null || window.localStorage.getItem('panier') === "{}"){
        return (
            <>
                <SlidePrincipal image="panier/slidevotrepanier.jpg" />
                <h2 className="text-center mt-5">Votre panier est vide</h2>
            </>
        )
    } else {
        return (
            <>
                <SlidePrincipal image="panier/slidevotrepanier.jpg" />
                {erreurMsg ? <Alert type="danger" message={erreurMsg}/> : "" }

                <div className="container">

                    <Panier panier={panier} totalPanier={totalPanier} rechargerPanier={rechargePanier}/>

                    <div className="row">

                        {/*****Bouton vider le panier*/}
                        <div className="col-md text-center ml-5">
                            <button type="button" className="btn btn-warning mt-5" onClick={() => {
                                supprimerPanier()
                                setPanier(chargerPanier())
                            }}>
                                Vider mon panier

                            </button>
                        </div>
                        {/*****FIN Bouton vider le panier*/}

                        {/*****Bouton valider le panier*/}
                        <div className="col text-center">
                            <button type="button" className="btn btn-warning mt-5 ml-5" onClick={() => {
                                // TODO : Gérer l expiration de token
                                //  Si le token a expiré au moment ou je clique sur ce bouton, la prop loginState devrait etre en true mais le controlleur de l'API va planter
                                if (!props.loginState) {
                                    setErreurMsg("Veuillez vous connecter avant de valider la commande")
                                } else {
                                    history.push("/validationPanier")
                                }
                            }}>
                                Valider commande
                            </button>
                        </div>
                        {/*****FIN Bouton valider le panier*/}

                    </div>

                </div>
            </>
        )
    }
}

export default PagePanier;