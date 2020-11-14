export const URL_APP_BACK = process.env.REACT_APP_SYMFONY_APP_URL

export const API_NON_AUTHENTIFIEE = URL_APP_BACK + "/api";
export const API_AUTHENTIFIEE = URL_APP_BACK + "/api/user";

export const API_CATEGORIE_PRODUIT = API_NON_AUTHENTIFIEE + "/categorie_produits"
export const API_LOGIN = API_NON_AUTHENTIFIEE + "/login_check"
export const API_INSCRIPTION = API_NON_AUTHENTIFIEE + "/utilisateurs"

export const API_DONNEES_UTILISATEUR = API_AUTHENTIFIEE + "/utilisateur"
export const API_COMMANDE = API_AUTHENTIFIEE + "/commande"

export const TOKEN_TTL = 3600;


