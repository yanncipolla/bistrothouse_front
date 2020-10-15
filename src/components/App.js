import React, { useState } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Footer from "./squelette/Footer";
import ContactPage from "./contact/ContactPage";
import Header from "./squelette/Header";

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
                    </Switch>
                </div>
                <Footer/>
            </Router>
        </>
    );
}

export default App;
