import React from "react";
import {Link} from "react-router-dom";
import Video from "./utils/Video";
import CarteAdresse from "./contact/CarteAdresse";
import InfosContact from "./contact/InfosContact";

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
                <div className="row mt-4 ">

                    {/* <!-- a propos --> */}
                    <div className="col-lg">
                        <h2>Qui sommes-nous ?</h2>
                        <hr className="hr-Bar"/>
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
                        <div className="col-lg d-flex justify-content-center mt-4">
                            <div className="row">
                                <div className="col d-flex align-items-center">
                                    <Video
                                        width={window.innerWidth <= 1200 ? 400 : 520}
                                        // width="520"
                                        poster="/images/home/video_poster.jpg"
                                        source="/images/home/video_presentation.mp4"
                                        type="video/mp4"
                                    />
                                </div>
                            </div>
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

                    <div className="col-md mt-1 mb-2">
                        <InfosContact />
                    </div>

                    {/*En dessous d'un ecran à 1200px passe l'iframe à 400px et en dessous de 1050px elle disparait*/}
                    {window.innerWidth > 430 ?
                        <div className="col-md text-center">
                            <CarteAdresse />
                        </div>
                        : ""}
                </div>
            </div>
            {/* <!-- Fin Adresse + carte  --> */}

        </>
    );
}

export default Home;