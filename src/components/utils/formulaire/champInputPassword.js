import React from "react";

function ChampInputPassword(props) {

    return(
        <div className="form-group">
            <label htmlFor="email">{props.label}</label>
            <input
                type="password"
                className="form-control"
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
            <small className="form-text text-mute">8 caractères minimum dont un chiffre et une lettre</small>
            <small className="form-text text-mute text-danger">{props.invalide}</small>
        </div>

    );

}

export default ChampInputPassword;