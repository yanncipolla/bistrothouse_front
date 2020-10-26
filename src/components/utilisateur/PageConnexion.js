import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import {postLogin} from "../../services/apiService";
import Spinner from "../utils/Spinner";
import ChampInputEmail from "../utils/formulaire/champInputEmail";
import ChampInputPassword from "../utils/formulaire/champInputPassword";
import SlidePrincipal from "../utils/SlidePrincipal";
import Alert from "../utils/Alert";

function PageConnexion(props) {

    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(true);
    const [erreurMsg, setErreurMsg] = useState(null);
    const [typeErreurMsg, setTypeErreurMsg] = useState(null);
    const [formValide, setFormValide] = useState(false)
    const [valeursForm, setValeursForm] = useState({
        'email': {
            'value' : "",
            'msgErreur' : ""
        },
        'password': {
            'value' : "",
            'msgErreur' : ""
        },
    });

    const regex = {
        "email" : {
            'regexValue' : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            'msg' : "Email invalide"
        },
        "password" : {
            'regexValue' : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
            'msg' : "Password invalide"
        }
    }

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setValeursForm((valeursForm) => (
                {...valeursForm, [name]: {...valeursForm.email, 'value' : value}}
            )
        )
    }

    function controleRegex(){
        for (const champ in valeursForm){
            console.log("valeur de champ : ", champ)
            if (regex[champ].regexValue.test(valeursForm[champ].value)){
                console.log("le test de la regex dans controleRegex() a renvoyer true")
                setFormValide(true)
                setValeursForm((valeursForm) => (
                        {...valeursForm, [champ] : {...valeursForm[champ], 'msgErreur' : ""}}
                    )
                )
            } else {
                console.log("le test de la regex dans controleRegex() a renvoyer false")
                setFormValide(false)
                setValeursForm((valeursForm) => (
                        {...valeursForm, [champ] : {...valeursForm[champ], 'msgErreur' : regex[champ].msg}}
                    )
                )
            }
        }
    }

    function onSubmit(e) {
        console.log("valeursForm.password.value avant controle regex : ", valeursForm.password.value)
        console.log("formValide avant controle regex: ", formValide)
        controleRegex()
        console.log("valeursForm.password.value APRES controle regex: ", valeursForm.password.value)
        console.log("formValide APRES controle regex : ", formValide)
        if (formValide){
            setIsLoaded(false)
            postLogin(valeursForm.email.value, valeursForm.password.value)
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
                <SlidePrincipal image="utilisateur/slideconnexion.jpg"/>

                {erreurMsg ? <Alert type={typeErreurMsg} message={erreurMsg}/> : "" }

                <form onSubmit={onSubmit}>
                    <div className="container">
                        <div className="row mt-4">

                            <div className="col-md mt-5">
                                <ChampInputEmail name="email" label="Email" value={valeursForm.email.value} invalide={valeursForm.email.msgErreur}
                                                 onChange={handleChange}/>
                                <ChampInputPassword name="password" label="Mot de passe" value={valeursForm.password.value} invalide={valeursForm.password.msgErreur}
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