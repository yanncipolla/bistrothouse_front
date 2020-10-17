import React from "react";
import {Link} from "react-router-dom";

const PageIntrouvable = () => (
    <div className="jumbotron bg-white">
        <h1 className="display-4">Page non trouvée !</h1>
        <p className="lead">
            Désolé, cette page n'existe pas.
        </p>
        <Link className='btn btn-warning btn-lg' to="/">
            Retour à l'accueil
        </Link>
    </div>
);

export default PageIntrouvable;