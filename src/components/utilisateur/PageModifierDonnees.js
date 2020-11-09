import React, {useEffect, useState} from "react";
import {controleValiditeeChampForm} from "../../services/formulaireService";
import {getUtilisateur, putUtilisateur} from "../../services/apiService";
import Spinner from "../utils/Spinner";
import SlidePrincipal from "../utils/SlidePrincipal";
import Alert from "../utils/Alert";
import ChampInputEmail from "../utils/formulaire/champInputEmail";
import ChampInputPassword from "../utils/formulaire/champInputPassword";
import ChampInputText from "../utils/formulaire/champInputText";
import BadgeTitre from "../utils/BadgeTitre";
import {deconnexion} from "../../services/authentificationService";
import {Link} from "react-router-dom";

function PageModiferDonnees(props) {

    const [isLoaded, setIsLoaded] = useState(true);
    const [erreurMsg, setErreurMsg] = useState(null);
    const [infoMsg, setInfoMsg] = useState(null);
    const [typeErreurMsg, setTypeErreurMsg] = useState(null);
    const [donneesForm, setDonneesForm] = useState({
        'email': {'value' : "", 'msgErreur' : ""},
        'password': {'value' : "", 'msgErreur' : ""},
        'prenom': {'value' : "", 'msgErreur' : ""},
        'nom': {'value' : "", 'msgErreur' : ""},
        'telephone': {'value' : "", 'msgErreur' : ""},
        'complement': {'value' : "", 'msgErreur' : ""},
        'numEtRue': {'value' : "", 'msgErreur' : ""},
        'ville': {'value' : "", 'msgErreur' : ""},
        'cp': {'value' : "", 'msgErreur' : ""},
    });

    const regex = {
        "email" : {'regexValue' : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'msg' : "Email invalide", 'requis' : false},
        "password" : {'regexValue' : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i, 'msg' : "Password invalide", 'requis' : false},
        "prenom" : {'regexValue' : /^\S[a-z ,.'àçèéêë-]+$/i, 'msg' : "Prenom invalide", 'requis' : false},
        "nom" : {'regexValue' : /^\S[a-z ,.'àçèéêë-]+$/i, 'msg' : "Nom invalide", 'requis' : false},
        "telephone" : {'regexValue' : /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/i, 'msg' : "Telephone invalide", 'requis' : false},
        "complement" : {'requis' : false},
        "numEtRue" : {'regexValue' : /[A-Za-z0-9'.-\s,]/i, 'msg' : "Rue invalide", 'requis' : false},
        "ville" : {'regexValue' : /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/i, 'msg' : "Ville invalide", 'requis' : false},
        "cp" : {'regexValue' : /^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/i, 'msg' : "Code postal invalide", 'requis' : false},
    }

    useEffect(() => {
        setIsLoaded(false)
        getUtilisateur()
            .then((result) => {
                for (let champ in result.data){
                    setDonneesForm((donneesForm)=>(
                        {...donneesForm, [champ] : { 'value' : result.data[champ], 'msgErreur' : ""}}
                    ))
                }
            })
            .catch((err)=>{
                if (
                    typeof err.response !=="undefined"
                    && err.response.status == '401'
                    && (err.response.data.message === 'JWT Token not found' || err.response.data.message === 'Invalid JWT Token') || err.response.data.message === 'Expired JWT Token')
                {
                    setErreurMsg("Session expirée, veuillez vous reconnecter")
                    setTypeErreurMsg("warning")
                    setInfoMsg(null)
                    deconnexion()
                    props.handleLoginState(false)
                } else {
                    setErreurMsg(err.message)
                    setTypeErreurMsg("danger")
                    setInfoMsg(null)
                }
            })
            .finally(()=>{
                setIsLoaded(true)
            })

    }, []);

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setDonneesForm((donneesForm) => (
                {...donneesForm, [name]: {...donneesForm[name], 'value' : value}}
            )
        )
    }

    function controlerFormulaire(){
        //TODO Peut sans doute etre factorisé en service
        let formValide = true
        for (const champ in donneesForm){
            let champControle = controleValiditeeChampForm(donneesForm[champ], regex[champ])
            setDonneesForm((donnesForm)=>(
                {...donnesForm, [champ] : champControle[0]}
            ))
            if (!champControle[1]){formValide = false}
        }
        return formValide
    }

    function onSubmit(e) {
        if (controlerFormulaire()){
            setIsLoaded(false)
            putUtilisateur(donneesForm)
                .then(() => {
                    setInfoMsg("Vos données ont bien été modifées")
                    setDonneesForm((donneesForm)=>(
                        {...donneesForm, 'password' : { 'value' : "", 'msgErreur' : ""}}
                    ))
                    setErreurMsg(null)
                })
                .catch((err) => {
                    if (
                        //TODO factoriser el controle de validité du token
                        typeof err.response !== "undefined"
                        && err.response.status === '401'
                        && (err.response.data.message === 'JWT Token not found' || err.response.data.message === 'Invalid JWT Token') || err.response.data.message === 'Expired JWT Token')
                    {
                        setErreurMsg("Session expirée, veuillez vous reconnecter")
                        setTypeErreurMsg("warning")
                        setInfoMsg(null)
                        deconnexion()
                        props.handleLoginState(false)
                    } else if (typeof err.response !=="undefined" && err.response.data.hasOwnProperty('message')) {
                        if (err.response.data.message === "Modification impossible : L'adresse email existe déjà.") {
                            setErreurMsg(err.response.data.message)
                            setTypeErreurMsg("warning")
                            setInfoMsg(null)
                        } else {
                            setErreurMsg(err.response.status + " : " + err.response.data.message)
                            setTypeErreurMsg("warning")
                            setInfoMsg(null)
                        }
                    } else if (typeof err.response !=="undefined" && err.response.data.hasOwnProperty('detail')) {
                        setErreurMsg(err.response.status + " : " + err.response.data.detail)
                        setTypeErreurMsg("danger")
                        setInfoMsg(null)
                    } else {
                        setErreurMsg(err.message)
                        setTypeErreurMsg("danger")
                        setInfoMsg(null)
                    }
                })
                .finally(() => {
                    setIsLoaded(true)
                })
        } else {
            e.preventDefault();
        }
    }

    // ************************************
    // ********* Rendu de la page *********
    // ************************************

    if (!props.loginState) {
        return (
            <>
                <SlidePrincipal image="utilisateur/slidepagemoncompte.jpg"/>
                <Alert type="warning" message="Vous devez etre connecté pour accéder à cette page." />
            </>
        )
    } else if (!isLoaded) {
        return (
            <>
                <Spinner/>
            </>
        )
    } else {
        return (
            <>
                <SlidePrincipal image="utilisateur/slidepagemoncompte.jpg"/>

                {erreurMsg ? <Alert type={typeErreurMsg} message={erreurMsg}/> : "" }
                {infoMsg ? <Alert type="primary" message={infoMsg}/> : "" }

                <div className="row">
                        <BadgeTitre>Modification de mes données personnelles</BadgeTitre>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="container">
                        <div className="row mt-4">

                            <div className="col-md mt-5">
                                {/*TODO tester la modification d'email et gérer la déconnexion apres le changement afin de renouveler le token*/}
                                <ChampInputEmail name="email" label="Email" value={donneesForm.email.value} invalide={donneesForm.email.msgErreur} onChange={handleChange}/>
                                {/*TODO Ajouter un premier champ pour checker le password actuel et deux champs nouveaux passwords */}
                                <ChampInputPassword name="password" label="Mot de passe" value={donneesForm.password.value} invalide={donneesForm.password.msgErreur} onChange={handleChange}/>
                                <ChampInputText name="prenom" label="Prénom" value={donneesForm.prenom.value} invalide={donneesForm.prenom.msgErreur} onChange={handleChange} />
                                <ChampInputText name="nom" label="Nom" value={donneesForm.nom.value} invalide={donneesForm.nom.msgErreur} onChange={handleChange} />
                                <ChampInputText name="numEtRue" label="Numéro et rue" value={donneesForm.numEtRue.value} invalide={donneesForm.numEtRue.msgErreur} onChange={handleChange} />
                                <ChampInputText name="cp" label="Code postal" value={donneesForm.cp.value} invalide={donneesForm.cp.msgErreur} onChange={handleChange} />
                                <ChampInputText name="ville" label="Ville" value={donneesForm.ville.value} invalide={donneesForm.ville.msgErreur} onChange={handleChange} />
                                <ChampInputText name="complement" label="Complement d'information pour l'adresse" value={donneesForm.complement.value} invalide={donneesForm.complement.msgErreur} onChange={handleChange} />
                                <ChampInputText name="telephone" label="Numéro de tépléphone" value={donneesForm.telephone.value} invalide={donneesForm.telephone.msgErreur} onChange={handleChange} />
                                <div className="row my-2">
                                    <div className="col text-center">
                                        <button type="submit" className="btn btn-warning">Modifier mes données</button>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col text-center">
                                        <button type="submit" className="btn btn-warning">
                                            <Link className="text-dark" to="/moncompte">Retour</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md d-flex mt-4">
                                <div className="row">
                                    <div className="col d-flex justify-content-center">
                                        <img src="/images/utilisateur/moncompte-img-formulaire.jpg" className="d-block w-100" alt="..."/>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </>
        )
    }

}

export default PageModiferDonnees;