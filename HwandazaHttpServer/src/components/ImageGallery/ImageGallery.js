import React from 'react';
import { connect } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { galleryImagesSelector } from "../../selectors";

import "../../styles/styles.css";
import './ImageGallery.css';

const renderImages = images =>{

    return images.map(image => {
        return (
            <div>
                <img src={image} />
            </div>
        )
    });
}
const gallery = props => {
    
    const { images } = props;
    console.log('images', images);
    return (
    <div className="hwandaza-automation image-gallery">
        <h1>Gallery</h1>
        <Carousel dynamicHeight="true">
            {renderImages(images)}
        </Carousel>
    
    </div>
);
}

const mapStateToProps = (state) => {
    const images = galleryImagesSelector(state);
    return {
        images: images.imageList,
    }
};

export default connect(mapStateToProps)(gallery);