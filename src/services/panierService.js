export function chargerPanier(){
    if (
        window.localStorage.getItem('panier') !== null &&
        JSON.parse(window.localStorage.getItem('panier')).hasOwnProperty('liste') &&
        JSON.parse(window.localStorage.getItem('panier')).liste.length !== 0
    )  {
        return JSON.parse(window.localStorage.getItem('panier')).liste
    } else {
        window.localStorage.setItem('panier', "{}")
    }
}

export function chargerTotalPanier(){
    if (JSON.parse(window.localStorage.getItem('panier')).hasOwnProperty('total')){
        return parseFloat(JSON.parse(window.localStorage.getItem('panier')).total).toFixed(2)
    } else {
        window.localStorage.setItem('panier', "{}")
    }
}

export function ajouterProduitAuPanier (id, nom, photo, prix, qte) {

    let panier =window.localStorage.getItem('panier');

    if (panier === null || panier === "{}"){
        panier = {}
        panier.liste = [{'ligne' : 0 , id, nom, photo, prix, qte}]
        panier.total = prix * qte
    } else {
        panier = JSON.parse(panier);
        let derniereLigneDuPanier = panier.liste[panier.liste.length - 1].ligne
        panier.liste.push({ 'ligne' : derniereLigneDuPanier + 1, id, nom, photo, prix, qte})
        panier.total = panier.total + prix * qte
    }

    window.localStorage.setItem('panier', JSON.stringify(panier));
};

export function supprimerProduitDuPanier(ligne){
    let panier = JSON.parse(window.localStorage.getItem('panier'));
    let produitASupp
    for (let i=0; i < panier.liste.length; i++){
        if (panier.liste[i].ligne == ligne){
            produitASupp = i
            break
        }
    }
    panier.total = panier.total - panier.liste[produitASupp].prix
    panier.liste.splice(produitASupp, 1)
    window.localStorage.setItem('panier', JSON.stringify(panier));
}

export function supprimerPanier(){
    window.localStorage.setItem('panier', "{}")
}