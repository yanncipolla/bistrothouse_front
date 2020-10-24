import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom"
import {postLogin} from "../../services/apiService";
import Spinner from "../utils/Spinner";
import ChampInputEmail from "../utils/formulaire/champInputEmail";
import ChampInputPassword from "../utils/formulaire/champInputPassword";
import Carousselle from "../utils/Carousselle";
import Alert from "../utils/Alert";

function PageConnexion(props) {

    const history = useHistory();

    const {handleSubmit, register, errors} = useForm();
    const [isLoaded, setIsLoaded] = useState(true);
    const [error, setError] = useState(null);
    const [erreurMsg, setErreurMsg] = useState(null);
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
                // TODO YC : j'aurais bien aimé vérifier que j'ai un objet reponse dans l'objet erreur et non pas le déduire à partir du message de l'erreur,
                //  car dans le cas ou l'API est down, il n'y a pas de réponse.
                //  J'ai testé avec les lignes commentés suivantes mais soit le test ne foncitonne pas, soit ca plante a cause d'un undefined
                // if (err.response !== null){
                // if (err.response !== undefined){
                // if (err.hasOwnProperty('response')){
                if (err.message !== "Network Error" && err.response.data.hasOwnProperty('message')) {
                    setErreurMsg(err.response.status + " : " + err.response.data.message)
                } else {
                    setErreurMsg(err.message)
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
                <Carousselle chemin="utilisateur/slideconnexion.jpg"/>

                {erreurMsg ?
                    erreurMsg === '401 : Invalid credentials.' ?
                        <Alert type="warning" message="Email ou mot de passe incorrect"/>
                        :
                        <Alert type="danger" message={erreurMsg}/>
                    :
                    ""
                }

                <form onSubmit={handleSubmit(onSubmit)}>
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