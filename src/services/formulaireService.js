export function controleValiditeeChampForm(champForm, regex){
    let champValide  = true
    //Est ce que le champs est requis ?
    if (regex.requis){
        if (champForm.value === ""){
            champForm.msgErreur = "Champ requis"
            champValide = false
        } else {
            champForm.msgErreur = ""
        }
    }
    //Si il n'y a pas eu de blocage a cause du champ requis et qu'il y a une reggex à valider
    if (champForm.msgErreur === "" && regex.hasOwnProperty('regexValue') && champForm.value !== "" ){
        //Est ce que le champ repond a la regex ?
        if (regex.regexValue.test(champForm.value)){
            champForm.msgErreur = ""
        } else {
            champValide = false
            champForm.msgErreur = regex.msg
        }
    }
    return [champForm, champValide]
}