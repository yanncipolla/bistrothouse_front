import React from "react";
import CarteAdresse from "./CarteAdresse";
import InfosContact from "./InfosContact";
import SlidePrincipal from "../utils/SlidePrincipal";

const ContactPage = () => {
    return (
        <>

            <SlidePrincipal image="contact/slidepagecontact.jpg" />

            {/* <!-- Adresse + carte --> */}
            <div className="container">
                <div className="row mt-4">

                    <div className="col mt-1 mb-2">
                        <InfosContact />
                    </div>

                    {/*En dessous d'un ecran à 1200px passe l'iframe à 400px et en dessous de 1050px elle disparait*/}
                    {window.innerWidth > 430 ?
                        <div className="col text-center">
                            <CarteAdresse />
                        </div>
                        : ""}
                </div>
            </div>
            {/* <!-- Fin Adresse + carte --> */}
        </>
    );
};

export default ContactPage;