import React, {useEffect, useState} from "react";
import {controleValiditeeChampForm} from "../../services/formulaireService";
import {getUtilisateur, postLogin, postUtilisateurs} from "../../services/apiService";
import Spinner from "../utils/Spinner";
import SlidePrincipal from "../utils/SlidePrincipal";
import Alert from "../utils/Alert";
import ChampInputEmail from "../utils/formulaire/champInputEmail";
import ChampInputPassword from "../utils/formulaire/champInputPassword";
import ChampInputText from "../utils/formulaire/champInputText";
import BadgeTitre from "../utils/BadgeTitre";
import Axios from "axios";
import {API_DONNEES_UTILISATEUR} from "../../constantes";
import {deconnexion} from "../../services/authentificationService";

function PageModiferDonnees(props) {


    // TODO empecher l acces à cette page si un uitilistaeur est connecté

    const [isLoaded, setIsLoaded] = useState(true);
    const [erreurMsg, setErreurMsg] = useState(null);
    const [infoMsg, setInfoMsg] = useState(null);
    const [typeErreurMsg, setTypeErreurMsg] = useState(null);
    const [formValide, setFormValide] = useState(false)
    const [donneesForm, setDonneesForm] = useState({
        'email': {'value' : "", 'msgErreur' : ""},
        'password': {'value' : "", 'msgErreur' : ""},
        'prenom': {'value' : "", 'msgErreur' : ""},
        'nom': {'value' : "", 'msgErreur' : ""},
        'telephone': {'value' : "", 'msgErreur' : ""},
        'complement': {'value' : "", 'msgErreur' : ""},
        'numero': {'value' : "", 'msgErreur' : ""},
        'rue': {'value' : "", 'msgErreur' : ""},
        'ville': {'value' : "", 'msgErreur' : ""},
        'cp': {'value' : "", 'msgErreur' : ""},
    });

    const regex = {
        "email" : {'regexValue' : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'msg' : "Email invalide", 'requis' : true},
        "password" : {'regexValue' : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i, 'msg' : "Password invalide", 'requis' : true},
        "prenom" : {'regexValue' : /^[a-z ,.'-]+$/i, 'msg' : "Prenom invalide", 'requis' : true},
        "nom" : {'regexValue' : /^[a-z ,.'-]+$/i, 'msg' : "Nom invalide", 'requis' : true},
        "telephone" : {'regexValue' : /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/i, 'msg' : "Telephone invalide", 'requis' : true},
        "complement" : {'requis' : false},
        "numero" : {'regexValue' : /^[1-9]\d{0,3}(?:[a-zA-Z]{1,2}\d{0,3})?$/i, 'msg' : "Numero invalide", 'requis' : true},
        "rue" : {'regexValue' : /[A-Za-z0-9'.-\s,]/i, 'msg' : "Rue invalide", 'requis' : true},
        "ville" : {'regexValue' : /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/i, 'msg' : "Ville invalide", 'requis' : true},
        "cp" : {'regexValue' : /^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/i, 'msg' : "Code postal invalide", 'requis' : true},
    }

    useEffect(() => {
        setIsLoaded(false)
        getUtilisateur()
            .then((result) => {
                console.log("result", result.data)
                for (let champ in result.data){
                    if (champ == 'adresse'){
                        console.log("jysuis")
                        for (let sousChamp in result.data[champ]){
                            console.log("souschamp", sousChamp)
                            setDonneesForm((donneesForm)=>(
                                {...donneesForm, [sousChamp] : { 'value' : result.data[champ][sousChamp], 'msgErreur' : ""}}
                            ))
                        }
                    }
                    setDonneesForm((donneesForm)=>(
                        {...donneesForm, [champ] : { 'value' : result.data[champ], 'msgErreur' : ""}}
                    ))
                }
            })
            .catch((err)=>{
                if (err.response.status == '401' && (err.response.data.message === 'JWT Token not found' || err.response.data.message === 'Invalid JWT Token')) {
                    setErreurMsg("Session expirée, veuillez vous reconnecter")
                    setTypeErreurMsg("warning")
                    deconnexion()
                    //TODO TOTO
                    //TODO apres la deconnexion il faudrait rafraichir le bouton se connecter de la navbar
                } else {
                    setErreurMsg(err.message)
                    setTypeErreurMsg("danger")
                }
            })
            .finally(()=>{
                console.log("alafin",donneesForm)
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

    function controleRegex(){
        setFormValide(true)
        for (const champ in donneesForm){
            let champControle = controleValiditeeChampForm(donneesForm[champ], regex[champ])
            setDonneesForm((donnesForm)=>(
                {...donnesForm, [champ] : champControle[0]}
            ))
            if (!champControle[1]){setFormValide(false)}
        }
    }

    function onSubmit(e) {
        controleRegex()
        if (formValide){
            setIsLoaded(false)
            let data = {
                'email': donneesForm.email.value,
                'password': donneesForm.password.value,
                'prenom': donneesForm.prenom.value,
                'nom': donneesForm.nom.value,
                'telephone': donneesForm.telephone.value,
                'complement': donneesForm.complement.value,
                'adresse' : {
                    'numero': donneesForm.numero.value,
                    'rue': donneesForm.rue.value,
                    'ville': donneesForm.ville.value,
                    'cp': donneesForm.cp.value
                }
            }
            postUtilisateurs(data)
                .then(() => {
                    setInfoMsg("Inscription réalisée avec succès. Vous pouvez maintenant vous connecter.")
                    setErreurMsg(null)
                })
                .catch((err) => {
                    if (typeof err.response !=="undefined" && err.response.data.hasOwnProperty('message')) {
                        if (err.response.data.message === "Inscription impossible : L'adresse email existe déjà.") {
                            setErreurMsg(err.response.data.message)
                            setTypeErreurMsg("warning")
                        }
                    } else if (typeof err.response !=="undefined" && err.response.data.hasOwnProperty('detail')) {
                        setErreurMsg(err.response.status + " : " + err.response.data.detail)
                        setTypeErreurMsg("danger")
                    } else {
                        setErreurMsg(err.message)
                        setTypeErreurMsg("danger")
                    }
                })
                .finally(() => {
                    setIsLoaded(true)
                    setFormValide(false)
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
                                <ChampInputEmail name="email" label="Email" value={donneesForm.email.value} invalide={donneesForm.email.msgErreur} onChange={handleChange}/>
                                <ChampInputPassword name="password" label="Mot de passe" value={donneesForm.password.value} invalide={donneesForm.password.msgErreur} onChange={handleChange}/>
                                <ChampInputText name="prenom" label="Prénom" value={donneesForm.prenom.value} invalide={donneesForm.prenom.msgErreur} onChange={handleChange} />
                                <ChampInputText name="nom" label="Nom" value={donneesForm.nom.value} invalide={donneesForm.nom.msgErreur} onChange={handleChange} />
                                <ChampInputText name="numero" label="Numéro" value={donneesForm.numero.value} invalide={donneesForm.numero.msgErreur} onChange={handleChange} />
                                <ChampInputText name="rue" label="Rue" value={donneesForm.rue.value} invalide={donneesForm.rue.msgErreur} onChange={handleChange} />
                                <ChampInputText name="cp" label="Code postal" value={donneesForm.cp.value} invalide={donneesForm.cp.msgErreur} onChange={handleChange} />
                                <ChampInputText name="ville" label="Ville" value={donneesForm.ville.value} invalide={donneesForm.ville.msgErreur} onChange={handleChange} />
                                <ChampInputText name="complement" label="Complement d'information pour l'adresse" value={donneesForm.complement.value} invalide={donneesForm.complement.msgErreur} onChange={handleChange} />
                                <ChampInputText name="telephone" label="Numéro de tépléphone" value={donneesForm.telephone.value} invalide={donneesForm.telephone.msgErreur} onChange={handleChange} />
                                {/*todo pb faut cliquer deux fois sur valider pour valider !*/}
                                <button type="submit" className="btn btn-warning">Modifier mes données</button>
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