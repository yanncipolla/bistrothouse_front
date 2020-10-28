import React from "react";
import './badgeTitre.css';

function BadgeTitre(props) {

    return(
        <div className="badgeTitre">
            {props.children}
        </div>
    );

}

export default BadgeTitre;