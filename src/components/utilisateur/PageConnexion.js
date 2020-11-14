import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import {postLogin} from "../../services/apiService";
import Spinner from "../utils/Spinner";
import ChampInputEmail from "../utils/formulaire/ChampInputEmail";
import ChampInputPassword from "../utils/formulaire/ChampInputPassword";
import SlidePrincipal from "../utils/SlidePrincipal";
import Alert from "../utils/Alert";
import {controleValiditeeChampForm} from "../../services/formulaireService";

function PageConnexion(props) {

    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(true);
    const [erreurMsg, setErreurMsg] = useState(null);
    const [typeErreurMsg, setTypeErreurMsg] = useState(null);
    const [donneesForm, setDonneesForm] = useState({
        'email': {'value' : "", 'msgErreur' : ""},
        'password': {'value' : "", 'msgErreur' : ""},
    });

    const regex = {
        "email" : {'regexValue' : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'msg' : "Email invalide", 'requis' : true},
        "password" : {'regexValue' : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i, 'msg' : "Password invalide", 'requis' : true},
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
            postLogin(donneesForm.email.value, donneesForm.password.value)
                .then(() => {
                    props.handleLoginState(true)
                    history.push("/"); //redirection homepage
                })
                .catch((err) => {
                    if (typeof err.response !=="undefined" && err.response.data.hasOwnProperty('message')) {
                        if (err.response.data.message === 'Invalid credentials.') {
                            setErreurMsg("Email ou mot de passe incorrect")
                            setTypeErreurMsg("warning")
                        } else {
                            setErreurMsg(err.response.status + " : " + err.response.data.message)
                            setTypeErreurMsg("danger")
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
                <SlidePrincipal image="utilisateur/slideconnexion.jpg"/>

                {erreurMsg ? <Alert type={typeErreurMsg} message={erreurMsg}/> : "" }

                <form onSubmit={onSubmit}>
                    <div className="container">
                        <div className="row mt-4">

                            <div className="col-md mt-5">
                                <ChampInputEmail name="email" label="Email" value={donneesForm.email.value} invalide={donneesForm.email.msgErreur}
                                                 onChange={handleChange}/>
                                <ChampInputPassword name="password" label="Mot de passe" value={donneesForm.password.value} invalide={donneesForm.password.msgErreur}
                                                    onChange={handleChange}/>
                                <button type="submit" className="btn btn-warning">Envoyer</button>
                                {/*TODO : Gérer la perte de mot de passe*/}
                            </div>

                            <div className="col-md mt-4">
                                <img src="/images/utilisateur/connexion-img-formulaire.jpg" className="d-block w-100"
                                     alt="..."/>
                            </div>

                        </div>
                    </div>
                </form>
            </>
        )
    }
}

export default PageConnexion