import React from "react";
import {Link} from "react-router-dom";

function BoutonSeConnecter() {
    return (
        <>
            <span className="btn btn-warning px-4 ml-2">
                <Link className="text-dark" to="/connexion">Se Connecter</Link>
            </span>
        </>
    )
}

export default BoutonSeConnecter;