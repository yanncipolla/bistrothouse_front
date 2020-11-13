import React, { useState } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Footer from "./squelette/Footer";
import ContactPage from "./contact/ContactPage";
import Header from "./squelette/Header";
import PageProduit from "./produits/PageProduit";
import PageConnexion from "./utilisateur/PageConnexion";
import {checkTokenValidity} from "../services/authentificationService";
import PageIntrouvable from "./PageIntrouvable";
import PagePanier from "./panier/PagePanier";
import PageInscription from "./utilisateur/PageInscription";
import PageMonCompte from "./utilisateur/PageMonCompte";
import PageModiferDonnees from "./utilisateur/PageModifierDonnees";
import PageValidationCommande from "./commande/PageValidationCommande";

function App() {

    // Permet de vérifier si un utilisateur est connecté avec un token valide
    const [loginState, setLoginState] = useState(checkTokenValidity());

    function handleLoginState(etat) {
        setLoginState(etat)
        // if (loginState && !etat) {
        //     deconnexion()
        //     alert('Session expirée, veuillez vous reconnecter')
        // }
    }

    return (
        <>
            <Router>
                <Header loginState={loginState} handleLoginState={setLoginState} />
                <div>
                    <Switch>
                        {/*Homepage et divers*/}
                        <Route exact path="/" component={Home}/>
                        <Route path="/contact" component={ContactPage}/>

                        {/*Produits, carte*/}
                        <Route path='/pizza' render={(props) => <PageProduit {...props} categorieProduit={'Pizza'} />} />
                        <Route path='/burger' render={(props) => <PageProduit {...props} categorieProduit={'Burger'} />} />
                        <Route path='/dessert' render={(props) => <PageProduit {...props} categorieProduit={'Dessert'} />} />
                        <Route path='/boisson' render={(props) => <PageProduit {...props} categorieProduit={'Boisson'} />} />
                        <Route path='/tapas' render={(props) => <PageProduit {...props} categorieProduit={'Tapas'} />} />

                        {/*Panier et commande*/}
                        <Route path="/panier" render={(props) => <PagePanier {...props} loginState={loginState} />} />
                        <Route path="/validationPanier" render={(props) => <PageValidationCommande {...props} loginState={loginState} handleLoginState={(etat) => handleLoginState(etat)} />} />

                        {/*Utilisateur*/}
                        <Route path="/connexion" render={(props) => <PageConnexion {...props} handleLoginState={(etat) => handleLoginState(etat)} loginState={loginState}/>} />
                        <Route path="/inscription" render={(props) => <PageInscription {...props} loginState={loginState} />} />
                        <Route path="/moncompte" render={(props) => <PageMonCompte {...props} loginState={loginState} />} />
                        <Route path="/modifierdonnees" render={(props) => <PageModiferDonnees {...props} handleLoginState={(etat) => handleLoginState(etat)} loginState={loginState} />} />

                        {/*404*/}
                        <Route component={PageIntrouvable} />

                    </Switch>
                </div>
                <Footer/>
            </Router>
        </>
    );
}

export default App;
