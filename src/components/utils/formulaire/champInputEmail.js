import React from "react";

function ChampInputEmail(props) {

    return(
        <div className="form-group">
            <label htmlFor="email">{props.label}</label>
            <input
                type="email"
                className="form-control"
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
            <small className="form-text text-mute text-danger">{props.invalide}</small>
        </div>

    );

}

export default ChampInputEmail;