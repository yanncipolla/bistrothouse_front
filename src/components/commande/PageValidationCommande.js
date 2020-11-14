import React, {useState} from "react";
import SlidePrincipal from "../utils/SlidePrincipal";
import Alert from "../utils/Alert";
import BadgeTitre from "../utils/BadgeTitre";
import {Link, useHistory} from "react-router-dom";
import Spinner from "../utils/Spinner";
import {postCommande} from "../../services/apiService";
import ChampInputText from "../utils/formulaire/ChampInputText";
import {supprimerPanier, transformePanierEnCommande} from "../../services/panierService";
import {deconnexion} from "../../services/authentificationService";

function PageValidationCommande(props) {

    const [livraison, setLivraison] = useState("emporter");
    const [paiement, setPaiement] = useState("reception");
    const [commentaire, setCommentaire] = useState("");
    const [isLoaded, setIsLoaded] = useState(true);
    const [erreurMsg, setErreurMsg] = useState(null);
    const [typeErreurMsg, setTypeErreurMsg] = useState(null);

    const history = useHistory();

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        if (name === 'livraison') {
            setLivraison(value)
        } else if (name === 'paiement'){
            setPaiement(value)
        } else if (name === 'commentaire'){
            setCommentaire(value)
        }
    }

    function onSubmit(e){
        setErreurMsg(null)
        setTypeErreurMsg(null)
        setIsLoaded(false)
        let commande = transformePanierEnCommande(livraison, commentaire)
        postCommande(commande)
            .then(()=>{
                supprimerPanier()
                history.push("/commandevalidee")
            })
            .catch((err)=>{
                if (
                    typeof err.response !=="undefined"
                    && err.response.status == '401'
                    && (err.response.data.message === 'JWT Token not found' || err.response.data.message === 'Invalid JWT Token') || err.response.data.message === 'Expired JWT Token')
                {
                    setErreurMsg("Session expirée, veuillez vous reconnecter")
                    setTypeErreurMsg("warning")
                    deconnexion()
                    props.handleLoginState(false)
                } else {
                    setErreurMsg(err.message)
                    setTypeErreurMsg("danger")
                }
            })
            .finally(()=>{
                setIsLoaded(true)
            })
    }

    // ************************************
    // ********* Rendu de la page *********
    // ************************************

    if (!props.loginState) {
        return (
            <>
                <SlidePrincipal image="panier/slidevotrepanier.jpg"/>
                <Alert type="warning" message="Vous devez etre connecté pour accéder à cette page." />
            </>
        )
    } else if (window.localStorage.getItem('panier') === null || window.localStorage.getItem('panier') === "{}"){
        history.push("/panier")
    } else  if (!isLoaded) {
        return (
            <>
                <Spinner/>
            </>
        )
    } else {
        return (
            <>
                <SlidePrincipal image="panier/slidevotrepanier.jpg"/>

                {erreurMsg ? <Alert type={typeErreurMsg} message={erreurMsg}/> : "" }

                <form onSubmit={onSubmit}>

                    <div className="row mt-5">
                            <BadgeTitre>Comment souhaitez-vous réceptionner votre commande ?</BadgeTitre>
                    </div>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-auto text-center font-weight-bold">
                            <input className="form-check-input" type="radio" name="livraison" id="livraison1"
                                   value="emporter" checked={livraison === 'emporter'} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="livraison1">A emporter</label>
                        </div>
                        <div className="col-auto text-center font-weight-bold">
                            <input className="form-check-input" type="radio" name="livraison" id="livraison2"
                                   value="livraison" checked={livraison === 'livraison'} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="livraison2">En livraison</label>
                        </div>
                        <div className="col"></div>
                    </div>

                    <div className="row mt-5">
                        <BadgeTitre>Quel est votre mode de paiement ?</BadgeTitre>
                    </div>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-auto text-center font-weight-bold">
                            <input className="form-check-input" type="radio" name="paiement" id="paiement1"
                                   value="reception" checked={paiement === 'reception'} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="paiement1">A la réception de la commande</label>
                        </div>
                        <div className="col-auto text-center font-weight-bold">
                            {/*todo ajouter le reglement par stripe*/}
                            <input className="form-check-input" type="radio" name="paiement" id="paiement2"
                                   value="cb" checked={paiement === 'cb'} onChange={handleChange} disabled={true}/>
                            <label className="form-check-label" htmlFor="paiement2">En carte bleue</label>
                        </div>
                        <div className="col"></div>
                    </div>

                    <div className="row mt-5">
                        <BadgeTitre>Commentaires eventuels</BadgeTitre>
                    </div>
                    <div className="row">
                        <div className="col mx-5 px-5">
                            <ChampInputText name="commentaire" value={commentaire} onChange={handleChange}/>
                        </div>
                    </div>

                    <div className="row">
                        {/*****Bouton retour*/}
                        <div className="col-md text-center ml-5">
                            <button type="button" className="btn btn-warning mt-5 font-weight-bold"><Link className="text-dark" to="/panier">Retour</Link></button>
                        </div>
                        {/*****Bouton valider le panier*/}
                        <div className="col text-center">
                            <button type="submit" className="btn btn-warning mt-5 ml-5 font-weight-bold">
                                    Valider commande
                            </button>
                        </div>
                    </div>

                </form>

            </>
        )
    }

}

export default PageValidationCommande;