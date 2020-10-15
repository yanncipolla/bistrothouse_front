import React from "react";

function CarteAdresse() {

    return(
        <>
            <iframe
                title="Retrouvez-nous en ville"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.3565308084662!2d4.855894916201728!3d45.76404462140539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea89c07c6663%3A0x33ac6f782adc9be3!2s26%20Boulevard%20Jules%20Favre%2C%2069006%20Lyon!5e0!3m2!1sfr!2sfr!4v1598272714388!5m2!1sfr!2sfr"
                width={window.innerWidth <= 1200 ? 400 : 620}
                height={window.innerHeight <= 1200 ? 380 : 450}
                frameBorder="0"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
            ></iframe>
        </>
    );

}

export default CarteAdresse;