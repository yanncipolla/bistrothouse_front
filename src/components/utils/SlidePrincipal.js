import React from "react";

function SlidePrincipal(props) {

    return(
        <div className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={"/images/" + props.image} className="d-block w-100" alt="..."/>
                </div>
            </div>
        </div>
    );

}

export default SlidePrincipal;