import {TOKEN_TTL} from "../constantes";

export function checkTokenValidity(){
    const dateToken = parseInt(window.localStorage.getItem('dateToken'))
    const actualDate = Math.round(new Date().getTime() / 1000)
    if ((actualDate - dateToken) < TOKEN_TTL && window.localStorage.getItem('useremail')){
        return true
    } else {
        return false
    }
}

export function deconnexion(){
    localStorage.removeItem('dateToken');
    localStorage.removeItem('token');
    localStorage.removeItem('useremail');
}