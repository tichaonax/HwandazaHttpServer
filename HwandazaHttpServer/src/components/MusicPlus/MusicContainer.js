import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { songSelector } from './../../selectors';
import { MusicPlus } from './MusicPlus';
import { MusicLoader } from './MusicLoader';

import "../../styles/css/styles.css";
import './MusicContainer.css';

const musiccontainer = props => (
    <div>
        <MusicPlus songs={props.songs} autoplay={props.autoplay} />
        <MusicLoader/>
    </div>
);

musiccontainer.propTypes = {
    songs: PropTypes.array.isRequired
  };

const mapStateToProps = (state, {autoplay}) => {
    const songs = songSelector(state);
    return {
        songs: songs.songList,
        autoplay,
    }
};

export default connect(mapStateToProps)(musiccontainer);