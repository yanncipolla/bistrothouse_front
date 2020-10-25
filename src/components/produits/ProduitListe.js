import React from "react";
import ProduitCard from "./ProduitCard";

function ProduitsListe(props) {

        return (
            <>
                <div className="row justify-content-center" id="position-card">
                    {props.produits.map((produit, index) => (
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

export default ProduitsListe;