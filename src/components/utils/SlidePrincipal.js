import React from "react";

function Carousselle(props) {

    return(
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={"/images/" + props.chemin} className="d-block w-100" alt="..."/>
                </div>
            </div>
        </div>
    );

}

export default Carousselle;