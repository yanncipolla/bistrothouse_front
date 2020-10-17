
export const ajouterProduitAuPanier =  (id, nom, photo, prix, qte) => {

    let panier =window.localStorage.getItem('panier');

    if (panier === null || panier === "{}"){
        panier = {}
        panier.liste = [{'ligne' : 0 , id, nom, photo, prix, qte}]
        panier.total = prix * qte
    } else {
        panier = JSON.parse(panier);
        panier.liste.push({ 'ligne' : panier.liste.length, id, nom, photo, prix, qte})
        panier.total = panier.total + prix * qte
    }

    window.localStorage.setItem('panier', JSON.stringify(panier));
};

export function supprimerProduitDuPanier(ligne){

    let panier = JSON.parse(window.localStorage.getItem('panier'));
    panier.liste.splice(ligne, 1)
    window.localStorage.setItem('panier', JSON.stringify(panier));




}

export function supprimerPanier(){
    window.localStorage.setItem('panier', "{}")
}