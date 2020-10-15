import React from "react";
import {Link} from "react-router-dom";
import Video from "./Utils/Video";

function Home() {
    return (
        <>
            {/* <!-- Carousel  --> */}
            <div
                id="carouselExampleIndicators"
                className="carousel slide container-fluid"
                data-ride="carousel"
            >
                <ol className="carousel-indicators">
                    <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="0"
                        className="active"
                    ></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src="/images/home/slideburger.jpg"
                            className="d-block w-100"
                            alt="..."
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="/images/home/slidepizza.jpg"
                            className="d-block w-100"
                            alt="..."
                        />
                    </div>
                </div>
                <a
                    className="carousel-control-prev"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="prev"
                >
          <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
          ></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a
                    className="carousel-control-next"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="next"
                >
          <span
              className="carousel-control-next-icon"
              aria-hidden="true"
          ></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            {/* <!-- Fin carousel --> */}

            <div className="container mb-5">
                <div className="row justify-content-md-center mt-4 ">

                    {/* <!-- a propos --> */}
                    <div className="col-md mt-1">
                        <h2>Qui sommes-nous ?</h2>
                        <hr className="my-2"/>
                        <p>
                            Bistrot House vous invite à découvrir son concept de cuisine
                            ouverte et à venir déguster ses burgers et pizzas préparés à la commande,
                            ses frites fraîches maison et ses boissons et desserts maison. Le
                            tout à un prix défiant toute concurrence.
                        </p>
                        <p>Notre équipe sera ravie de vous accueillir à Lyon 6eme !</p>
                        <p>
                            Pas envie de sortir ? Nous réalisons également la livraison de
                            repas à domicile sur Lyon.
                        </p>
                    </div>
                    {/* <!-- FIN a propos --> */}
                    {/* <!-- Zone Video (en dessous d'un ecran à 1200px passe a 400px et en dessous de 1050px disparait )--> */}
                    {window.innerWidth > 430 ?
                        <div className="col-md text-center mt-4">
                            <Video
                                width={window.innerWidth <= 1200 ? 400 : 520}
                                // width="520"
                                poster="/images/home/video_poster.jpg"
                                source="/images/home/video_presentation.mp4"
                                type="video/mp4"
                            />
                        </div>
                        : ""}
                    {/* <!-- FIN zone Video --> */}

                </div>
            </div>


            {/* <!-- picto zone --> */}
            <div className="container-fliud">
                <div id="pictofond">
                    <div className="container mt-5 pb-3">
                        <div className="row text-center" id="picto">
                            <div className="col-sm mb-1 mt-3" id="nomPicto">
                                <img src="/images/home/Pizza.png" alt="..."/>
                                <h3 id="nomPicto">Pizza</h3>
                            </div>
                            <div className="col-sm mb-1 mt-3" id="nomPicto">
                                <img src="/images/home/Burger.png" alt="..."/>
                                <h3 id="nomPicto">Burger</h3>
                            </div>
                            <div className="col-sm mb-1 mt-3" id="nomPicto">
                                <img src="/images/home/Boisson.png" alt="..."/>
                                <h3 id="nomPicto">Boisson</h3>
                            </div>
                            <div className="col-sm mb-1 mt-3" id="nomPicto">
                                <img src="/images/home/dessert.png" alt="..."/>
                                <h3 id="nomPicto">Dessert</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Fin picto zone --> */}

            {/* <!-- Zone banière --> */}
            <div className="container">
                <div className="row mt-4">
                    <div className="col mt-4">
                        <Link to="/pizza">
                            <img
                                src="/images/home/bannièrepizza.jpg"
                                alt="..."
                                className="img-thumbnail"
                            />
                        </Link>
                    </div>
                    <div className="col mt-4">
                        <Link to="/burger">
                            <img
                                src="/images/home/bannièreburger.jpg"
                                alt="..."
                                className="img-thumbnail"
                            />
                        </Link>
                    </div>
                    <div className="w-100"></div>
                    <div className="col mt-4">
                        <Link to="/boisson">
                            <img
                                src="/images/home/bannièreboisson.jpg"
                                alt="..."
                                className="img-thumbnail"
                            />
                        </Link>
                    </div>
                    <div className="col mt-4">
                        <Link to="/dessert">
                            <img
                                src="/images/home/bannièredessert.jpg"
                                alt="..."
                                className="img-thumbnail"
                            />
                        </Link>
                    </div>
                </div>
            </div>
            {/* <!-- Zone banière --> */}

            {/* <!-- Call to Action --> */}
            <div className="jumbotron container-fluid">
                <h1 className="display-4 text-warning">Notre offre du moment</h1>
                <hr className="my-4"/>
                <p className={window.innerWidth <= 1050 ? "lead bg-warning font-weight-bold" : "lead font-weight-bold"}>
                    Réservez dès maintenant pour bénéficier d'une remise de 20% sur le
                    prix du Menu.
                </p>
                <button type="button" className="btn btn-warning btn-lg">
                    <Link className='nav-link text-light' to="/contact">Commander</Link>
                </button>
            </div>
            {/* <!-- Fin Call to Action--> */}

            {/* <!-- Adresse + carte --> */}
            <div className="container">
                <div className="row mt-4">
                    <div className="col-md mt-1">
                        <h2 className="mb-4">Bistrot House</h2>
                        <h5>Adresse</h5>
                        <hr className="my-2"/>
                        <p>4 rue Ravier, 69007 Lyon </p>
                        <h5>Contact</h5>
                        <hr className="my-2"/>
                        <p>06 06 06 06 06</p>
                        <p>bistrot-house@bistrot-house.tk</p>
                        <h5>Horaires</h5>
                        <hr className="my-2"/>
                        <p>Bistrot House vous accueille 7j/7 de 8h à 1h.</p>
                    </div>
                    {/*En dessous d'un ecran à 1200px passe l'iframe à 400px et en dessous de 1050px elle disparait*/}
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
            {/* <!-- Fin Adresse + carte  --> */}

        </>
    );
}

export default Home;