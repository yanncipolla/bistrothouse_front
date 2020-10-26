import React from "react";

function ChampInputText(props) {

    return(
        <div className="form-group">
            <label htmlFor="email">{props.label}</label>
            <input
                type="text"
                className="form-control"
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
            <small className="form-text text-mute text-danger">{props.invalide}</small>
        </div>

    );

}

export default ChampInputText;