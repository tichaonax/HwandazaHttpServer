import React from 'react';
import { connect } from "react-redux";
import ImageGallery from 'react-image-gallery';
import { pictureSelector } from "../../selectors";
import { getPictures } from "../../actions";

import '../../styles/css/styles.css';
import '../../styles/css/image-gallery.css';
import './ImageGallery.css';

class Gallery extends React.Component {

    constructor() {
      super();
      this.state = {
        showIndex: false,
        showBullets: false,
        infinite: true,
        showThumbnails: true,
        showFullscreenButton: true,
        showGalleryFullscreenButton: true,
        showPlayButton: true,
        showGalleryPlayButton: true,
        showNav: true,
        isRTL: false,
        slideDuration: 450,
        slideInterval: 5000,
        thumbnailPosition: 'bottom',
        showVideo: {},
      };
    }
  
    componentDidMount() {
      this.props.onGetPictures();
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.slideInterval !== prevState.slideInterval ||
          this.state.slideDuration !== prevState.slideDuration) {
        // refresh setInterval
        this._imageGallery.pause();
        this._imageGallery.play();
      }
    }
  
    _onImageClick(event) {
      //console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
    }
  
    _onImageLoad(event) {
      //console.debug('loaded image', event.target.src);
    }
  
    _onSlide(index) {
      this._resetVideo();
      //console.debug('slid to index', index);
    }
  
    _onPause(index) {
      console.debug('paused on index', index);
    }
  
    _onScreenChange(fullScreenElement) {
      //console.debug('isFullScreen?', !!fullScreenElement);
    }
  
    _onPlay(index) {
      console.debug('playing from index', index);
    }
  
    _handleInputChange(state, event) {
      this.setState({[state]: event.target.value});
    }
  
    _handleCheckboxChange(state, event) {
      this.setState({[state]: event.target.checked});
    }
  
    _handleThumbnailPositionChange(event) {
      this.setState({thumbnailPosition: event.target.value});
    }
  
    _getStaticImages = pictures =>{
      return pictures.result.map(picture => {
          return ({
                  original: `picture/${picture.Url}`,
                  thumbnail: `picture/${picture.Url}`,
              })
      });
  }

    _resetVideo() {
      this.setState({showVideo: {}});
  
      if (this.state.showPlayButton) {
        this.setState({showGalleryPlayButton: true});
      }
  
      if (this.state.showFullscreenButton) {
        this.setState({showGalleryFullscreenButton: true});
      }
    }
  
    _toggleShowVideo(url) {
      this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
      this.setState({
        showVideo: this.state.showVideo
      });
  
      if (this.state.showVideo[url]) {
        if (this.state.showPlayButton) {
          this.setState({showGalleryPlayButton: false});
        }
  
        if (this.state.showFullscreenButton) {
          this.setState({showGalleryFullscreenButton: false});
        }
      }
    }
  
    _renderVideo(item) {
      return (
        <div className='image-gallery-image' >
          {
            this.state.showVideo[item.embedUrl] ?
              <div className='video-wrapper'>
                  <a
                    className='close-video'
                    onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
                  >
                  </a>
                  <iframe
                    width='560'
                    height='315'
                    src={item.embedUrl}
                    frameBorder='0'
                    allowFullScreen
                  >
                  </iframe>
              </div>
            :
              <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
                <div className='play-button'></div>
                <img src={item.original}/>
                {
                  item.description &&
                    <span
                      className='image-gallery-description'
                      style={{right: '0', left: 'initial'}}
                    >
                      {item.description}
                    </span>
                }
              </a>
          }
        </div>
      );
    }
  
    render() {
        const { pictures, browserNavigation } = this.props;
        browserNavigation('gallery');
        return (
        <div style={{display: this.props.display}}>  
          <section className='app'>
            <ImageGallery
              ref={i => this._imageGallery = i}
              items={this._getStaticImages(pictures)}
              lazyLoad={false}
              onClick={this._onImageClick.bind(this)}
              onImageLoad={this._onImageLoad}
              onSlide={this._onSlide.bind(this)}
              onPause={this._onPause.bind(this)}
              onScreenChange={this._onScreenChange.bind(this)}
              onPlay={this._onPlay.bind(this)}
              infinite={this.state.infinite}
              showBullets={this.state.showBullets}
              showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
              showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
              showThumbnails={this.state.showThumbnails}
              showIndex={this.state.showIndex}
              showNav={this.state.showNav}
              isRTL={this.state.isRTL}
              thumbnailPosition={this.state.thumbnailPosition}
              slideDuration={parseInt(this.state.slideDuration)}
              slideInterval={parseInt(this.state.slideInterval)}
              additionalClass="app-image-gallery"
            />
    
            <div className='app-sandbox'>
    
              <div className='app-sandbox-content'>
                <h2 className='app-header'>Settings</h2>
    
                <ul className='app-buttons'>
                  <li>
                    <div className='app-interval-input-group'>
                      <span className='app-interval-label'>Play Interval</span>
                      <input
                        className='app-interval-input'
                        type='text'
                        onChange={this._handleInputChange.bind(this, 'slideInterval')}
                        value={this.state.slideInterval}/>
                    </div>
                  </li>
    
                  <li>
                    <div className='app-interval-input-group'>
                      <span className='app-interval-label'>Slide Duration</span>
                      <input
                        className='app-interval-input'
                        type='text'
                        onChange={this._handleInputChange.bind(this, 'slideDuration')}
                        value={this.state.slideDuration}/>
                    </div>
                  </li>
    
                  <li>
                    <div className='app-interval-input-group'>
                      <span className='app-interval-label'>Thumbnail Bar Position</span>
                      <select
                        className='app-interval-input'
                        value={this.state.thumbnailPosition}
                        onChange={this._handleThumbnailPositionChange.bind(this)}
                      >
                        <option value='bottom'>Bottom</option>
                        <option value='top'>Top</option>
                        <option value='left'>Left</option>
                        <option value='right'>Right</option>
                      </select>
                    </div>
                  </li>
                </ul>
    
                <ul className='app-checkboxes'>
                  <li>
                    <input
                      id='infinite'
                      type='checkbox'
                      onChange={this._handleCheckboxChange.bind(this, 'infinite')}
                      checked={this.state.infinite}/>
                      <label htmlFor='infinite'>allow infinite sliding</label>
                  </li>
                  <li>
                    <input
                      id='show_fullscreen'
                      type='checkbox'
                      onChange={this._handleCheckboxChange.bind(this, 'showFullscreenButton')}
                      checked={this.state.showFullscreenButton}/>
                      <label htmlFor='show_fullscreen'>show fullscreen button</label>
                  </li>
                  <li>
                    <input
                      id='show_playbutton'
                      type='checkbox'
                      onChange={this._handleCheckboxChange.bind(this, 'showPlayButton')}
                      checked={this.state.showPlayButton}/>
                      <label htmlFor='show_playbutton'>show play button</label>
                  </li>
                  <li>
                    <input
                      id='show_bullets'
                      type='checkbox'
                      onChange={this._handleCheckboxChange.bind(this, 'showBullets')}
                      checked={this.state.showBullets}/>
                      <label htmlFor='show_bullets'>show bullets</label>
                  </li>
                  <li>
                    <input
                      id='show_thumbnails'
                      type='checkbox'
                      onChange={this._handleCheckboxChange.bind(this, 'showThumbnails')}
                      checked={this.state.showThumbnails}/>
                      <label htmlFor='show_thumbnails'>show thumbnails</label>
                  </li>
                  <li>
                    <input
                      id='show_navigation'
                      type='checkbox'
                      onChange={this._handleCheckboxChange.bind(this, 'showNav')}
                      checked={this.state.showNav}/>
                      <label htmlFor='show_navigation'>show navigation</label>
                  </li>
                  <li>
                    <input
                      id='show_index'
                      type='checkbox'
                      onChange={this._handleCheckboxChange.bind(this, 'showIndex')}
                      checked={this.state.showIndex}/>
                      <label htmlFor='show_index'>show index</label>
                  </li>
                  <li>
                    <input
                      id='is_rtl'
                      type='checkbox'
                      onChange={this._handleCheckboxChange.bind(this, 'isRTL')}
                      checked={this.state.isRTL}/>
                      <label htmlFor='is_rtl'>is right to left</label>
                  </li>
                </ul>
              </div>
    
            </div>
          </section>
        </div>
      );
    }
  }

  const mapDispatchToProps = dispatch => ({
    onGetPictures: () => dispatch(getPictures()), 
  });

const mapStateToProps = (state) => {
    const pictures = pictureSelector(state);
    return {
        pictures: pictures.pictureList,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);