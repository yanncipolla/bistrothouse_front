import React, {useState} from "react";
import {postUtilisateurs} from "../../services/apiService";
import Spinner from "../utils/Spinner";
import ChampInputEmail from "../utils/formulaire/champInputEmail";
import ChampInputPassword from "../utils/formulaire/champInputPassword";
import SlidePrincipal from "../utils/SlidePrincipal";
import Alert from "../utils/Alert";
import ChampInputText from "../utils/formulaire/champInputText";
import {controleValiditeeChampForm} from "../../services/formulaireService";
// import {controleValiditeeForm} from "../../services/formulaireService";

function PageInscription() {

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
        "email" : {'regexValue' : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'msg' : "Email putain d'invalide", 'requis' : true},
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

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setDonneesForm((donneesForm) => (
                {...donneesForm, [name]: {...donneesForm[name], 'value' : value}}
            )
        )
    }

    function controleRegex(){

        //*/*************************VERSION AVEC FONCTION PAR CHAMP
        setFormValide(true)
        for (const champ in donneesForm){
            let champControle = controleValiditeeChampForm(donneesForm[champ], regex[champ])
            setDonneesForm((donnesForm)=>(
                {...donnesForm, [champ] : champControle[0]}
            ))
            if (!champControle[1]){setFormValide(false)}
        }

        // //*/*************************VERSION AVEC FONCTION POUR TOUT LE FORMULAIRE
        // setDonneesForm(controleValiditeeForm(donneesForm, regex))

        // //*/*************************VERSION SANS FONCTION
        // // debugger
        // setFormValide(true)
        // for (const champ in donneesForm){
        //     console.log("**************** Champ : ", champ, " /// Sa valeur : ", donneesForm[champ].value ," ****************")
        //     //Est ce que le champs est requis ?
        //     if (regex[champ].requis){
        //         console.log("  Le champ ne peut etre vide")
        //         if (donneesForm[champ].value === ""){
        //             setDonneesForm((donneesForm) => (
        //                     {...donneesForm, [champ] : {...donneesForm[champ], 'msgErreur' : "Champ requis"}}
        //                 )
        //             )
        //             setFormValide(false)
        //             console.log("    Le champ est vide, PROBLEME, j'indique le message de champ requis et passe a false FormValide", donneesForm[champ], formValide)
        //         } else {
        //             setDonneesForm((donneesForm) => (
        //                     {...donneesForm, [champ] : {...donneesForm[champ], 'msgErreur' : ""}}
        //                 )
        //             )
        //             console.log("    Le champ n'est pas vide, TOUT VA BIEN, j efface le message et je ne touche pas au FormValide", donneesForm[champ], formValide)
        //         }
        //     }
        //     //Si il n'y a pas eu de blocage a cause du champ requis et que qu'il y a une reggex à valider
        //     console.log("Les test de requis ou non sont terminés, nous allons passer aux tests de regex. La valeur du message du champ est : ", donneesForm[champ].msgErreur)
        //     if (donneesForm[champ].msgErreur === "" && regex[champ].hasOwnProperty('regexValue')){
        //         console.log("  Le champ n'a pas eu de probleme de type requis ou non et il contient bien une regex a vérifier")
        //         //Est ce que le champ repond a la regex ?
        //         if (regex[champ].regexValue.test(donneesForm[champ].value)){
        //             setDonneesForm((donneesForm) => (
        //                     {...donneesForm, [champ] : {...donneesForm[champ], 'msgErreur' : ""}}
        //                 )
        //             )
        //             console.log("    le test de la regex a renvoyer true, TOUT VA BIEN, j efface le message et je ne touche pas au FormValide", donneesForm[champ], formValide)
        //         } else {
        //             setFormValide(false)
        //             setDonneesForm((donneesForm) => (
        //                     {...donneesForm, [champ] : {...donneesForm[champ], 'msgErreur' : regex[champ].msg}}
        //                 )
        //             )
        //             console.log("    le test de la regex a renvoyer false, PROBLEME, j'indique le message d erreur  et passe a false FormValide", donneesForm[champ], formValide)
        //         }
        //     }
        //     console.log("AU FINAL LE CHAMP : ", donneesForm[champ])
        // }
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

    if (!isLoaded) {
        return (
            <>
                <Spinner/>
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
                                <ChampInputText name="numero" label="Numéro" value={donneesForm.numero.value} invalide={donneesForm.numero.msgErreur} onChange={handleChange} />
                                <ChampInputText name="rue" label="Rue" value={donneesForm.rue.value} invalide={donneesForm.rue.msgErreur} onChange={handleChange} />
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