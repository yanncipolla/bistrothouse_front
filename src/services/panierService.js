
export const ajouterProduitAuPanier =  (id, description, photo, prix, qte) => {

    let panier = JSON.parse(window.localStorage.getItem('panier'));

    if (panier === null){
        panier = [{id,description, photo, prix, qte}]
    } else {
        panier.push({id,description, photo, prix, qte})
    }

    window.localStorage.setItem('panier', JSON.stringify(panier));
};

export function supprimerPanier(){
    window.localStorage.setItem('panier', "[]")
}