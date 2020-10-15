import React from "react";
import {Link} from "react-router-dom";

function BoutonSeConnecter() {
    return (
        <>
            <div className="row">
                <Link className="text-dark" to="/connexion">Se Connecter</Link>
            </div>
        </>
    )
}

export default BoutonSeConnecter;