import Axios from "axios";
import {API_CATEGORIE_PRODUIT, API_INSCRIPTION, API_LOGIN} from "../constantes";
import jwt_decode from "jwt-decode";

export function getCategorieProduit (nomCategorie) {
    return Axios.get(API_CATEGORIE_PRODUIT, {headers : {'Accept' : 'application/json'}, params : {'nom' : nomCategorie}})
};

export async function postLogin(email, password) {
    const jsonBody = {
        "username": email,
        "password": password
    }
    const token = (await Axios.post(API_LOGIN, jsonBody)).data.token
    window.localStorage.setItem('token', token)
    const decodedToken = jwt_decode(token);
    window.localStorage.setItem('useremail', decodedToken.username)
    window.localStorage.setItem('dateToken', String(Math.round(new Date().getTime() / 1000)))
}

export function postUtilisateurs(data){
    return Axios.post(API_INSCRIPTION, data)
}