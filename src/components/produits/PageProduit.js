import React, {useEffect, useState} from "react";
import ProduitsListe from "./ProduitListe";
import {getCategorieProduit} from "../../services/apiService";
import Erreur from "../utils/Erreur";
import Spinner from "../utils/Spinner";
import {useLocation} from "react-router-dom";

function PageProduit(props) {

    const location = useLocation();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        setIsLoaded(false)
        getCategorieProduit(props.categorieProduit)
            .then((result) => {
                setProduits(result.data[0]['produits']);
            })
            .catch((e) => setError(e))
            .finally(() => setIsLoaded(true));
    }, [location]);

    // ************************************
    // ********* Rendu de la page *********
    // ************************************
    if (error){
        return (
            <>
                <div>Une erreur est survenue</div>
                <Erreur error={error} />
            </>
        )
    } else if (!isLoaded){
        return (
            <>
                <Spinner />
            </>
        )
    } else {
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
                    <ProduitsListe produits={produits}/>
                </div>
            </>
        )
    }
}
export default PageProduit;