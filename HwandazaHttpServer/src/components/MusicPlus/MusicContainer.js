import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { songSelector } from './../../selectors';
import { MusicPlus } from './MusicPlus';
import { Search } from '../Search/Search';
import { MusicLoader } from './MusicLoader';

import "../../styles/css/styles.css";
import './MusicContainer.css';
// import Search from 'antd/lib/transfer/search';

const musiccontainer = props => (
    <div className="hwandaza-automation">
        <MusicPlus songs={props.songs} autoplay />
        <Search />
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