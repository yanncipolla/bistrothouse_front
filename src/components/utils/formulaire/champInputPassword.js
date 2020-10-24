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
        </div>

    );

}

export default ChampInputPassword;