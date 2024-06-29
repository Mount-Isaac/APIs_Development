import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDiscord, faLinkedinIn, faTwitter, faWhatsapp} from '@fortawesome/free-brands-svg-icons'

function Footer() {
    const twitterElement = <FontAwesomeIcon icon={faTwitter} color="white"/>
    const discordElement = <FontAwesomeIcon icon={faDiscord} color="white"/>
    const linkedinElement = <FontAwesomeIcon icon={faLinkedinIn} color="white"/>
    const whatsappElement = <FontAwesomeIcon icon={faWhatsapp} color="white"/>
    return ( 
        <div className="container text-info p-3">
            <div className="row d-flex justify-content-between">
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <p className="text-start mb-3">
                        &copy; 2024 Isaac Kyalo. APIs Development

                    </p>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="d-flex justify-content-around mb-3">
                        <span>{twitterElement}</span>
                        <span>{discordElement}</span>
                        <span>{linkedinElement}</span>
                        <span>{whatsappElement}</span>
                    </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12">
                    <p className="text-end">
                        Let's enjoy & share the power of REST APIs
                    </p>

                </div>

            </div>

        </div>
     );
}

export default Footer;