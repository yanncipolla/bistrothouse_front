import React, { useState, useEffect } from "react";
import {getCategorieProduit} from "../../services/apiService";
import Erreur from "../utils/Erreur";
import Spinner from "../utils/Spinner";
import ProduitCard from "./ProduitCard";

function ProduitsListe(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        getCategorieProduit(props.categorieProduit)
            .then((result) => {
                setProduits(result.data[0]['produits']);
            })
            .catch((e) => setError(e))
            .finally(() => setIsLoaded(true));
    }, produits);


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
                <div className="row justify-content-center" id="position-card">
                    {produits.map((produit, index) => (
                        <ProduitCard
                            key={index}
                            id={produit.id}
                            nom={produit.nom}
                            prix={produit.prix}
                            photo={produit.photo}
                            description={produit.description}
                        />
                    ))}
                </div>
            </>
        )
    }
}

export default ProduitsListe;