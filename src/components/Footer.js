import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer id="sticky-footer" className="py-4 mt-5 bg-dark text-white">
            <div className="container">
                <div className="row">
                    <div className="col-sm mt-3">
                        <small>Copyright &copy; Bristrot House 2020</small>
                    </div>
                    <div className="col-sm d-flex flex-wrap align-content-center justify-content-center">
                        <img src="/images/footer/logo_nav_blanc.png" className="d-block" alt="Logo" />
                    </div>
                    <div className="col-sm text-right">
                        <Link className="nav-link mt-2 text-light" to="/contact">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
