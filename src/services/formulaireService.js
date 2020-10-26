export function controleValiditeeChampForm(champForm, regex){
    // debugger
    let champValide  = true

    console.log("**************** Champ : ", champForm, " /// Sa valeur : ", champForm.value ," ****************")
    //Est ce que le champs est requis ?
    if (regex.requis){
        console.log("  Le champ ne peut etre vide")
        if (champForm.value === ""){
            champForm.msgErreur = "Champ requis"
            champValide = false
            console.log("    Le champ est vide, PROBLEME, j'indique le message de champ requis et passe a false champValide", champForm, champValide)
        } else {
            champForm.msgErreur = ""
            console.log("    Le champ n'est pas vide, TOUT VA BIEN, j efface le message et je ne touche pas au champValide", champForm, champValide)
        }
    }
    //Si il n'y a pas eu de blocage a cause du champ requis et que qu'il y a une reggex à valider
    console.log("Les test de requis ou non sont terminés, nous allons passer aux tests de regex. La valeur du message du champ est : ", champForm.msgErreur)
    if (champForm.msgErreur === "" && regex.hasOwnProperty('regexValue')){
        console.log("  Le champ n'a pas eu de probleme de type requis ou non et il contient bien une regex a vérifier")
        //Est ce que le champ repond a la regex ?
        if (regex.regexValue.test(champForm.value)){
            champForm.msgErreur = ""
            console.log("    le test de la regex a renvoyer true, TOUT VA BIEN, j efface le message et je ne touche pas au champValide", champForm, champValide)
        } else {
            champValide = false
            champForm.msgErreur = regex.msg
            console.log("    le test de la regex a renvoyer false, PROBLEME, j'indique le message d erreur  et passe a false champValide", champForm, champValide)
        }
    }
    console.log("AU FINAL LE CHAMP : ", champForm)


    return [champForm, champValide]

}

export function controleValiditeeForm(donneesForm, regexForm){
    // debugger
    let formValide  = true
    for (const champ in donneesForm){
        console.log("**************** Champ : ", champ, " /// Sa valeur : ", donneesForm[champ].value ," ****************")
        //Est ce que le champs est requis ?
        if (regexForm[champ].requis){
            console.log("  Le champ ne peut etre vide")
            if (donneesForm[champ].value === ""){
                donneesForm[champ].msgErreur = "Champ requis"
                // setChampsForm((champsForm) => (
                //         {...champsForm, [champ] : {...champsForm[champ], 'msgErreur' : "Champ requis"}}
                //     )
                // )
                formValide = false
                console.log("    Le champ est vide, PROBLEME, j'indique le message de champ requis et passe a false FormValide", donneesForm[champ], formValide)
            } else {
                donneesForm[champ].msgErreur = ""
                // setChampsForm((champsForm) => (
                //         {...champsForm, [champ] : {...champsForm[champ], 'msgErreur' : ""}}
                //     )
                // )
                console.log("    Le champ n'est pas vide, TOUT VA BIEN, j efface le message et je ne touche pas au FormValide", donneesForm[champ], formValide)
            }
        }
        //Si il n'y a pas eu de blocage a cause du champ requis et que qu'il y a une reggex à valider
        console.log("Les test de requis ou non sont terminés, nous allons passer aux tests de regex. La valeur du message du champ est : ", donneesForm[champ].msgErreur)
        if (donneesForm[champ].msgErreur === "" && regexForm[champ].hasOwnProperty('regexValue')){
            console.log("  Le champ n'a pas eu de probleme de type requis ou non et il contient bien une regex a vérifier")
            //Est ce que le champ repond a la regex ?
            if (regexForm[champ].regexValue.test(donneesForm[champ].value)){
                donneesForm[champ].msgErreur = ""
                // setChampsForm((champsForm) => (
                //         {...champsForm, [champ] : {...champsForm[champ], 'msgErreur' : ""}}
                //     )
                // )
                console.log("    le test de la regex a renvoyer true, TOUT VA BIEN, j efface le message et je ne touche pas au FormValide", donneesForm[champ], formValide)
            } else {
                formValide = false
                donneesForm[champ].msgErreur = regexForm[champ].msg
                // setChampsForm((champsForm) => (
                //         {...champsForm, [champ] : {...champsForm[champ], 'msgErreur' : regex[champ].msg}}
                //     )
                // )
                console.log("    le test de la regex a renvoyer false, PROBLEME, j'indique le message d erreur  et passe a false FormValide", donneesForm[champ], formValide)
            }
        }
        console.log("AU FINAL LE CHAMP : ", donneesForm[champ])
    }

    return donneesForm

}