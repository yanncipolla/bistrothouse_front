import React from "react";

const ModalProduit = () => {

    return (
        <>
            <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">Panier</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Vous avez bien ajouté ce produit a votre panier.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalProduit;