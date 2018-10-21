import React from 'react';
import { connect } from "react-redux";
import AudioPlayer from 'react-cl-audio-player';
import { songSelector } from './../../selectors';
import "../../styles/css/styles.css";

class Music extends React.Component {

    getMusicFiles = songs =>{
        return songs.map(song => {
            return ({
                url: `song/${song.Path}`,
                artist: {
                  name: '',
                  song: song.DisplayName,
                }
                })
        });
    }

    render() {
        const { songs } = this.props;
        console.log('Music-songs',songs);
        return (<div className="hwandaza-automation">
        <AudioPlayer songs={ this.getMusicFiles(songs) } autoplay={true} />
    </div>);
    }
}

const mapStateToProps = (state, {autoplay}) => {
    const songs = songSelector(state);
    return {
        songs: songs.songList,
        autoplay,
    }
};

export default connect(mapStateToProps)(Music);