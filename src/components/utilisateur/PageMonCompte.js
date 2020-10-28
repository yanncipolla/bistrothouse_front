import React, {useState} from "react";
import SlidePrincipal from "../utils/SlidePrincipal";
import Alert from "../utils/Alert";
import {Link} from "react-router-dom";

function PageMonCompte(props) {

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
    } else {
        return (
            <>
                <SlidePrincipal image="utilisateur/slidepagemoncompte.jpg"/>
                <div className="row mt-5">
                    <div className="col mx-5 px-5 my-2 py-2">
                        <button type="button" className="btn btn-warning btn-lg btn-block">
                            <Link className='nav-link text-dark font-weight-bold' to="/historiquecommmande">Accéder à mon historique de commande</Link>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col mx-5 px-5 my-2 py-2">
                        <button type="button" className="btn btn-warning btn-lg btn-block">
                            <Link className='nav-link text-dark font-weight-bold' to="/modifierdonnees">Modifer mes données personnelles</Link>
                        </button>
                    </div>
                </div>
            </>
        )
    }
}

export default PageMonCompte;