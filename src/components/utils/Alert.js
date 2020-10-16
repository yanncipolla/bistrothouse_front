import React from "react";

const Alert = ({ type, message }) => (
    <div role="alert" className={"alert-" + type}>
        {message}
    </div>
);

export default Alert;
