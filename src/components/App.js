import React, { useState } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Footer from "./squelette/Footer";
import ContactPage from "./contact/ContactPage";
import Header from "./squelette/Header";
import PageProduit from "./produits/PageProduit";

function App() {

    // const [loginState, setLoginState] = useState(checkTokenValidity());
    const [loginState, setLoginState] = useState(false);

    return (
        <>
            <Router>
                <Header loginState={loginState} handleLoginState={setLoginState} />
                <div>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/contact" component={ContactPage}/>
                        {/*La syntaxe ci-dessous permet de passer une prop a un composant tout en étant dans le router*/}
                        <Route path='/pizza' render={(props) => <PageProduit {...props} categorieProduit={'Pizza'} />} />
                        <Route path='/burger' render={(props) => <PageProduit {...props} categorieProduit={'Burger'} />} />
                        <Route path='/dessert' render={(props) => <PageProduit {...props} categorieProduit={'Dessert'} />} />
                        <Route path='/boisson' render={(props) => <PageProduit {...props} categorieProduit={'Boisson'} />} />
                        <Route path='/tapas' render={(props) => <PageProduit {...props} categorieProduit={'Tapas'} />} />
                    </Switch>
                </div>
                <Footer/>
            </Router>
        </>
    );
}

export default App;
