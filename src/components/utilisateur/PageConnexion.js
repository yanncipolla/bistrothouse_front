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
    const [valeursForm, setValeursForm] = useState({
        'email': "",
        'password': ""
    });

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setValeursForm((valeursForm) => (
                {...valeursForm, [name]: value}
            )
        )
    }

    function onSubmit() {
        setIsLoaded(false)
        postLogin(valeursForm.email, valeursForm.password)
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
            .finally(() => setIsLoaded(true))
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

                            <div className="col-md mt-1">
                                <ChampInputEmail name="email" label="Email" value={valeursForm.email}
                                                 onChange={handleChange}/>
                                <ChampInputPassword name="password" label="Mot de passe" value={valeursForm.password}
                                                    onChange={handleChange}/>
                                <button type="submit" className="btn btn-warning">Envoyer</button>
                                {/*TODO YC : Gérer la perte de mot de passe*/}
                            </div>

                            <div className="col-md mt-4">
                                <img src="/images/utilisateur/connexion-burger.jpg" className="d-block w-100"
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