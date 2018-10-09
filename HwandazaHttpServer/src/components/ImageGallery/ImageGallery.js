import React from 'react';
import { connect } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import "../../styles/styles.css";
import './ImageGallery.css';

const gallery = props => (
    <div className="hwandaza-automation">
        <h1>Gallery</h1>
        <Carousel>
                <div>
                    <img src="gallery/chbby/wasup/WhatsApp%20Image%202018-08-15%20at%2010.56.08%20AM.jpeg" />
                </div>
                <div>
                    <img src="gallery/chbby/wasup/WhatsApp%20Image%202018-08-07%20at%209.43.56%20AM.jpeg" />
                </div>
                <div>
                    <img src="gallery/chbby/wasup/WhatsApp%20Image%2018-08-29%20at%207.48.42%20PM.jpeg" />
                </div>
            </Carousel>
    
    </div>
);

export default connect()(gallery);