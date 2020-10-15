import React from "react";
import BoutonUtilisateurConnecte from "../utilisateur/BoutonUtilisateurConnecte";
import BoutonSeConnecter from "../utilisateur/BoutonSeConnecter";
import NavBar from "./NavBar";

function Header(props) {

    return (
        <div className="container">
            <div className="row">
                <div className="col float-md-left">
                    <NavBar loginState={props.loginState} handleLoginState={props.handleLoginState}/>
                </div>

                {/*Bouton se connecter/déconnexion*/}
                <div className="col-auto d-flex">
                    {/*explication de la ligne ci-dessous :*/}
                    {/*props.loginState && <BoutonUtilisateurConnecte loginState={props.loginState}/>*/}
                    {/*Si auth.loginState est vrai, alors envoie ce qu'il y a apres le &&, si non renvoie false*/}
                    <div className="row my-3">
                        <div className="col d-flex align-items-center">
                            <div className="row my-3">
                                {props.loginState ?
                                    <BoutonUtilisateurConnecte loginState={props.loginState}
                                                               handleLoginState={props.handleLoginState}/> :
                                    <BoutonSeConnecter/>}
                            </div>
                        </div>
                    </div>
                </div>
                {/*FIN bouton se connecter/déconnexion*/}
            </div>
        </div>
    )
};

export default Header;