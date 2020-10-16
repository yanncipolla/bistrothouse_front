import React from 'react';
import Alert from "./Alert";

const Erreur = ({ error }) => (
    error && <Alert type="danger" message={error.message} />
);

export default Erreur;