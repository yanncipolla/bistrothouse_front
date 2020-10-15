import React from "react";

const Contact = () => {
    return (
        <>
            {/* <!-- Carousel  --> */}
            <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
            >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src="/HomePage/slidepagecontact.jpg"
                            className="d-block w-100"
                            alt="..."
                        />
                    </div>
                </div>
            </div>
            {/* <!-- Fin carousel --> */}
            {/* <!-- Adresse + carte --> */}

            <div className="container">
                <div className="row mt-5 ">
                    <div className="col-md mt-1">
                        <h2 className="mb-4">Bistrot House</h2>
                        <h5>Adresse</h5>
                        <hr className="my-2" />
                        <p>26 Boulevard Jules Favre, 69006 Lyon </p>
                        <h5>Contact</h5>
                        <hr className="my-2" />
                        <p>06 06 06 06 06</p>
                        <p>Contact@Bistrot-House.com</p>
                        <h5>Horaires</h5>
                        <hr className="my-2" />
                        <p>Bistrot House vous accueille 7j/7 de 8h à 1h.</p>
                    </div>
                    {/*(en dessous d'un ecran à 1200px passe l'iframe passe a 400px et en dessous de 1050px elle disparait )*/}
                    {window.innerWidth > 430 ?
                        <div className="col text-center">
                            <iframe
                                title="Retrouvez-nous en ville"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.3565308084662!2d4.855894916201728!3d45.76404462140539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea89c07c6663%3A0x33ac6f782adc9be3!2s26%20Boulevard%20Jules%20Favre%2C%2069006%20Lyon!5e0!3m2!1sfr!2sfr!4v1598272714388!5m2!1sfr!2sfr"
                                width={window.innerWidth <= 1200 ? 400 : 520}
                                height={window.innerHeight <= 1200 ? 380 : 450}
                                frameBorder="0"
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                            ></iframe>
                        </div>
                        : ""}
                </div>
            </div>
            {/* <!-- Fin Adresse + carte --> */}
        </>
    );
};

export default Contact;