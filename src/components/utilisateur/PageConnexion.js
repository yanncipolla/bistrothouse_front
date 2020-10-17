import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom"
import {postLogin} from "../../services/apiService";
import Spinner from "../utils/Spinner";
import Erreur from "../utils/Erreur";

function PageConnexion(props) {
    const {handleSubmit, register, errors} = useForm();
    const [isLoaded, setIsLoaded] = useState(true);
    const [error, setError] = useState(null);

    const history = useHistory();

    const onSubmit = values => {
        setIsLoaded(false)
        postLogin(values.email, values.password)
            .then(() => {
                props.handleLoginState(true)
                history.push("/"); //redirection homepage
            })
            .catch((e) => setError(e))
            .finally(()=>setIsLoaded(true))
    }

    if (error){
        if (error.toString() === 'Error: Request failed with status code 401'){
            alert('Email ou mot de passe incorrect')
            setError(null)
        }
        return (
            <>
                <div>Une erreur est survenue</div>
                <Erreur error={error} />
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
                {/* <!-- Carousel  --> */}
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="/images/utilisateur/slideconnexion.jpg" className="d-block w-100" alt="..."/>
                        </div>
                    </div>
                </div>
                {/* <!-- Fin carousel --> */}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container">
                        <div className="row mt-4">
                            <div className="col-md mt-1">
                                <div className="form-group mt-5">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        ref={register({
                                            required: "Champs obligatoire",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: "Email invalide"
                                            }
                                        })}/>
                                    <small
                                        className="form-text text-muted text-warning">{errors.email && errors.email.message}</small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Mot de passe</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        defaultValue=""
                                        name="password"
                                        ref={register({
                                            required: "Champs obligatoire",
                                            pattern: {
                                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
                                                message: "Mot de passe invalide"
                                            }
                                        })}/>
                                    <small className="form-text text-mute">8 caractères minimum dont un chiffre et une
                                        lettre</small>
                                    <small
                                        className="form-text text-muted ">{errors.password && errors.password.message}</small>
                                </div>

                                <button type="submit" className="btn btn-warning">Envoyer</button>

                                {/*TODO YC : Gérer la perte de mot de passe*/}
                            </div>

                            <div className="col-md mt-4">
                                <img src="/images/utilisateur/connexion-burger.jpg" className="d-block w-100" alt="..."/>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}

export default PageConnexion