import React from "react";
import {useLocation, Link} from "react-router-dom";

function NavBar(props) {

    const location = useLocation()

    function isActive(name) {
        return name === location.pathname ? 'active' : null
    }

    return (
        // Logo de la nav bar apparait selon taille ecran : https://getbootstrap.com/docs/4.0/utilities/display/#hiding-elements

        <nav className="navbar navbar-expand-lg navbar-light bg-white">
            {/*logo*/}
            <Link className='navbar-brand d-none d-lg-block' to="/">
                <img src="/images/header/logo_nav.png" className="d-block w-100" alt="..."/>
            </Link>
            {/*FIN logo*/}

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            {/*logo smallscreen*/}
            <Link className='navbar-brand d-lg-none d-none d-md-block ml-2' to="/">
                <img src="/images/header/logo_nav.png" className="d-block w-100" alt="..."/>
            </Link>
            {/*FIN logo smallscreen*/}

            {/*Div permettant de gérer un taille minimum de la nav sur tous les navigateurs sur les xs écrans*/}
            <div className="d-md-none ajustNav4XsScreen"></div>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">

                    <div className="row">
                        <div className="col d-flex">
                            <div className="row">
                                <div className="col d-flex align-items-center">
                                    <li className={'nav-item ' + isActive('/')}>
                                        <Link className="nav-link" to="/">Accueil <span
                                            className="sr-only">(current)</span></Link>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col d-flex">
                            <div className="row">
                                <div className="col d-flex align-items-center">
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/">
                                            Nos produits</a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <ul className="list-unstyled">
                                                <li className={'nav-item ' + isActive('/pizza')}>
                                                    <Link className='nav-link' to="/pizza">Pizza</Link>
                                                </li>
                                                <li className={'nav-item ' + isActive('/burger')}>
                                                    <Link className='nav-link' to="/burger">Burger</Link>
                                                </li>
                                                <li className={'nav-item ' + isActive('/tapas')}>
                                                    <Link className='nav-link' to="/tapas">Tapas</Link>
                                                </li>
                                                <li className={'nav-item ' + isActive('/boisson')}>
                                                    <Link className='nav-link' to="/boisson">Boisson</Link>
                                                </li>
                                                <li className={'nav-item ' + isActive('/dessert')}>
                                                    <Link className='nav-link' to="/dessert">Dessert</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col d-flex">
                            <div className="row">
                                <div className="col d-flex align-items-center">
                                    <li className={' nav-item ' + isActive('/contact')}>
                                        <Link className='nav-link' to="/contact">Contact</Link>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col d-flex">
                            <div className="row">
                                <div className="col d-flex align-items-center">
                                    {!props.loginState &&
                                    <li className={'nav-item ' + isActive('/inscription')}>
                                        <Link className='nav-link' to="/inscription">Inscription</Link>
                                    </li>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col d-flex">
                            <div className="row">
                                <div className="col d-flex align-items-center">
                                    <li className={'text-center nav-item ' + isActive('/panier')}>
                                        <Link className='nav-link' to="/panier">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16"
                                                 className="bi bi-basket2 mr-2 mb-1"
                                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M1.111 7.186A.5.5 0 0 1 1.5 7h13a.5.5 0 0 1 .489.605l-1.5 7A.5.5 0 0 1 13 15H3a.5.5 0 0 1-.489-.395l-1.5-7a.5.5 0 0 1 .1-.42zM2.118 8l1.286 6h9.192l1.286-6H2.118z"/>
                                                <path fillRule="evenodd"
                                                      d="M11.314 1.036a.5.5 0 0 1 .65.278l2 5a.5.5 0 1 1-.928.372l-2-5a.5.5 0 0 1 .278-.65zm-6.628 0a.5.5 0 0 0-.65.278l-2 5a.5.5 0 1 0 .928.372l2-5a.5.5 0 0 0-.278-.65z"/>
                                                <path
                                                    d="M4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zM0 6.5A.5.5 0 0 1 .5 6h15a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1z"/>
                                            </svg>
                                            Panier
                                        </Link>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col d-flex">
                            <div className="row">
                                <div className="col d-flex align-items-center">
                                    {props.loginState &&
                                    <li className={'text-center nav-item ' + isActive('/moncompte')}>
                                        <Link className='nav-link' to="/moncompte">Mon compte</Link>
                                    </li>}
                                </div>
                            </div>
                        </div>
                    </div>

                </ul>
            </div>
        </nav>
    )
};

export default NavBar;