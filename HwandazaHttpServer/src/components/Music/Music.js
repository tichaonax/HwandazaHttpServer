import React from 'react';
import { connect } from "react-redux";
import ReactMusicPlayer from './ReactMusicPlayer';
import { songsSelector } from './../../selectors';

import "../../styles/css/styles.css";
import './Music.css';
import { getMusicFiles } from '../../actions';

class Music extends React.Component {

    getMusicFiles = songs =>{
        console.log('songs', songs);
        return songs.map(song => {
            var res = song.split('/');
            var fname = res[res.lenght-1].split('.');
            return ({
                url: song,
                artist: {
                  name: '',
                  song: fname[0],
                }
                })
        });
    }

    render() {
        const { songs } = this.props;
        return (<div className="hwandaza-automation">
        <ReactMusicPlayer songs={ this.getMusicFiles(songs) } autoplay={false} />
    </div>);
    }
}

const mapStateToProps = (state, {autoplay}) => {
    const songs = songsSelector(state);
    return {
        songs: songs.mp3List,
        autoplay,
    }
};

export default connect(mapStateToProps)(Music);