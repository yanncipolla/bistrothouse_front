import React from "react";

const Alert = ({ type, message }) => (
    <div role="alert" className={"m-3 p-2 font-weight-bold alert-" + type}>
        {message}
    </div>
);

export default Alert;
