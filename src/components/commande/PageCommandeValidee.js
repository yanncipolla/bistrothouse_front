import React from "react";
import SlidePrincipal from "../utils/SlidePrincipal";
import Alert from "../utils/Alert";

function PageCommandeValidee() {

    return (
        <>
            <SlidePrincipal image="panier/slidevotrepanier.jpg"/>
            <Alert type="primary" message="Votre commande a bien été validée. Vous allez recevoir un mail de confirmation avec son détail." />
        </>
    );

}

export default PageCommandeValidee;