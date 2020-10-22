import React from "react";

function TotalPanier(props) {

    return (
        <>
            <button type="button" className="btn btn-secondary btn-lg btn-block mt-5">
                Total : {props.totalPanier} €
            </button>
        </>
    )

}

export default TotalPanier;