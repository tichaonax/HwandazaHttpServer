import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { songSelector } from './../../selectors';
import { MusicPlus } from './MusicPlus';
import Search from '../Search/Search';
import MusicLoader from './MusicLoader';

import "../../styles/css/styles.css";
import './MusicContainer.css';

function loadMusicFiles(songs){
    return songs.map(song => {
        let name = unescape(song.Url.split('/')[0]);
    return ({
            url: `song/${song.Url}`,
            artist: {
                name: name.length <= 20 ? name : `${name.substring(0,20)}...`,
                song: song.Name,
            }
        })
    })
};

const musiccontainer = props => (
    <div className="hwandaza-automation">
        <MusicPlus songs={loadMusicFiles(props.songs)} autoplay={props.autoplay} />
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