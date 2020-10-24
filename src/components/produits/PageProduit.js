import React, {useEffect, useState} from "react";
import ProduitsListe from "./ProduitListe";
import {getCategorieProduit} from "../../services/apiService";
import Spinner from "../utils/Spinner";
import {useLocation} from "react-router-dom";
import SlidePrincipal from "../utils/SlidePrincipal";
import Alert from "../utils/Alert";

function PageProduit(props) {

    const location = useLocation();

    const [isLoaded, setIsLoaded] = useState(true);
    const [erreurMsg, setErreurMsg] = useState(null);
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        setIsLoaded(false)
        getCategorieProduit(props.categorieProduit)
            .then((result) => {
                setProduits(result.data[0]['produits']);
                setErreurMsg(null)
            })
            .catch((err) => {
                if (err.message !== "Network Error" && err.response.data.hasOwnProperty('detail')) {
                    setErreurMsg(err.response.status + " : " + err.response.data.detail)
                } else {
                    setErreurMsg(err.message)
                }
                setProduits([])
            })
            .finally(() => setIsLoaded(true));
    }, [location, props.categorieProduit]);

    // ************************************
    // ********* Rendu de la page *********
    // ************************************

    if (!isLoaded){
        return (
            <>
                <Spinner />
            </>
        )
    } else {
        return (
            <>

                <SlidePrincipal image={"produits/slide" + props.categorieProduit + ".jpg"} />

                {erreurMsg ? <Alert type="danger" message={erreurMsg}/> : "" }

                <div className="container">
                    <ProduitsListe produits={produits}/>
                </div>

            </>
        )
    }
}
export default PageProduit;