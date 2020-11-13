import React, {useState} from "react";
import {postUtilisateurs} from "../../services/apiService";
import Spinner from "../utils/Spinner";
import ChampInputEmail from "../utils/formulaire/champInputEmail";
import ChampInputPassword from "../utils/formulaire/champInputPassword";
import SlidePrincipal from "../utils/SlidePrincipal";
import Alert from "../utils/Alert";
import ChampInputText from "../utils/formulaire/champInputText";
import {controleValiditeeChampForm} from "../../services/formulaireService";

function PageInscription(props) {

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
        "email" : {'regexValue' : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'msg' : "Email invalide", 'requis' : true},
        "password" : {'regexValue' : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i, 'msg' : "Password invalide", 'requis' : true},
        "prenom" : {'regexValue' : /^\S[a-z ,.'àçèéêë-]+$/i, 'msg' : "Prenom invalide", 'requis' : true},
        "nom" : {'regexValue' : /^\S[a-z ,.'àçèéêë-]+$/i, 'msg' : "Nom invalide", 'requis' : true},
        "telephone" : {'regexValue' : /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/i, 'msg' : "Telephone invalide", 'requis' : true},
        "complement" : {'requis' : false},
        "numEtRue" : {'regexValue' : /[A-Za-z0-9'.-\s,]/i, 'msg' : "Rue invalide", 'requis' : true},
        "ville" : {'regexValue' : /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/i, 'msg' : "Ville invalide", 'requis' : true},
        "cp" : {'regexValue' : /^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/i, 'msg' : "Code postal invalide", 'requis' : true},
    }

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setDonneesForm((donneesForm) => (
                {...donneesForm, [name]: {...donneesForm[name], 'value' : value}}
            )
        )
    }

    function controleRegex(){
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
        if (controleRegex()){
            setIsLoaded(false)
            postUtilisateurs(donneesForm)
                .then(() => {
                    setInfoMsg("Inscription réalisée avec succès. Vous pouvez maintenant vous connecter.")
                    setDonneesForm({'email': {'value' : "", 'msgErreur' : ""}, 'password': {'value' : "", 'msgErreur' : ""}, 'prenom': {'value' : "", 'msgErreur' : ""},
                        'nom': {'value' : "", 'msgErreur' : ""}, 'telephone': {'value' : "", 'msgErreur' : ""}, 'complement': {'value' : "", 'msgErreur' : ""},
                        'numEtRue': {'value' : "", 'msgErreur' : ""}, 'ville': {'value' : "", 'msgErreur' : ""}, 'cp': {'value' : "", 'msgErreur' : ""}})
                    setErreurMsg(null)
                })
                .catch((err) => {
                    //TODO Changer ce controle d erreur car API platform le fait plus de la meme facon depuis que j ai utilisé la contrainte de validation
                    if (typeof err.response !== "undefined" && err.response.data.hasOwnProperty('violations')) {
                        let errEmailExistant = false
                        for (let i=0; i < err.response.data.violations.length; i++){
                            if (err.response.data.violations[i].message === "Inscription impossible : L'adresse email existe déjà.") {
                                setErreurMsg(err.response.data.violations[i].message)
                                setTypeErreurMsg("warning")
                                setInfoMsg(null)
                                errEmailExistant = true
                            }
                        }
                        if (!errEmailExistant) {
                            setErreurMsg(err.response.status + " : ConstraintViolationList")
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

    if (!isLoaded) {
        return (
            <>
                <Spinner/>
            </>
        )
    } else if (props.loginState) {
        return (
            <>
                <SlidePrincipal image="utilisateur/slidepagemoncompte.jpg"/>
                <Alert type="warning" message="Vous devez etre déconnecté pour accéder à cette page." />
            </>
        )
    } else {
        return (
            <>
                <SlidePrincipal image="utilisateur/slidepageinscription.jpg"/>

                {erreurMsg ? <Alert type={typeErreurMsg} message={erreurMsg}/> : "" }
                {infoMsg ? <Alert type="primary" message={infoMsg}/> : "" }

                <form onSubmit={onSubmit}>
                    <div className="container">
                        <div className="row mt-4">

                            <div className="col-md mt-5">
                                <ChampInputEmail name="email" label="Email" value={donneesForm.email.value} invalide={donneesForm.email.msgErreur} onChange={handleChange}/>
                                {/*TODO : Gérer la vérif du mdp par un double champ*/}
                                <ChampInputPassword name="password" label="Mot de passe" value={donneesForm.password.value} invalide={donneesForm.password.msgErreur} onChange={handleChange}/>
                                <ChampInputText name="prenom" label="Prénom" value={donneesForm.prenom.value} invalide={donneesForm.prenom.msgErreur} onChange={handleChange} />
                                <ChampInputText name="nom" label="Nom" value={donneesForm.nom.value} invalide={donneesForm.nom.msgErreur} onChange={handleChange} />
                                <ChampInputText name="numEtRue" label="Numéro et rue" value={donneesForm.numEtRue.value} invalide={donneesForm.numEtRue.msgErreur} onChange={handleChange} />
                                <ChampInputText name="cp" label="Code postal" value={donneesForm.cp.value} invalide={donneesForm.cp.msgErreur} onChange={handleChange} />
                                <ChampInputText name="ville" label="Ville" value={donneesForm.ville.value} invalide={donneesForm.ville.msgErreur} onChange={handleChange} />
                                <ChampInputText name="complement" label="Complement d'information pour l'adresse" value={donneesForm.complement.value} invalide={donneesForm.complement.msgErreur} onChange={handleChange} />
                                <ChampInputText name="telephone" label="Numéro de tépléphone" value={donneesForm.telephone.value} invalide={donneesForm.telephone.msgErreur} onChange={handleChange} />
                                {/*todo pb faut cliquer deux fois sur valider pour valider !*/}
                                <button type="submit" className="btn btn-warning">Envoyer</button>
                            </div>

                            <div className="col-md d-flex mt-4">
                                <div className="row">
                                    <div className="col d-flex justify-content-center">
                                        <img src="/images/utilisateur/inscription-img-formulaire.jpg" className="d-block w-100" alt="..."/>
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

export default PageInscription