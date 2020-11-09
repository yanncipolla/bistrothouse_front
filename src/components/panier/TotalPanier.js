import React from "react";
import './totalPanier.css';

function TotalPanier(props) {

    return (
        <div className="totalPanier">
            Total : {props.totalPanier} €
        </div>
    )

}

export default TotalPanier;