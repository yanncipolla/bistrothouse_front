import React from "react";
import ProduitsListe from "./ProduitListe";

function PageProduit(props) {

    return (
        <>

            {/* <!-- Carousel  --> */}
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={"/images/produits/slide" + props.categorieProduit + ".jpg"} className="d-block w-100" alt="..."/>
                    </div>
                </div>
            </div>
            {/* <!-- Fin carousel --> */}

            <div className="container">
                <ProduitsListe categorieProduit={props.categorieProduit}/>
            </div>

        </>
    )
}
export default PageProduit;