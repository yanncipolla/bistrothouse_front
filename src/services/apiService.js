import Axios from "axios";
import {API_CATEGORIE_PRODUIT} from "../constantes";

export function getCategorieProduit (nomCategorie) {
    return Axios.get(API_CATEGORIE_PRODUIT, {headers : {'Accept' : 'application/json'}, params : {'nom' : nomCategorie}})
        // .catch(async (e) => {
        //     throw e
        // })
};