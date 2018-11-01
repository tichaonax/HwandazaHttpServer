import React from 'react';
import { connect } from "react-redux";
import { songSelector } from './../../selectors';
import "../../styles/css/styles.css";
import { getSongs } from '../../actions';
import 'font-awesome/css/font-awesome.min.css';
import CLAudioPlayer from 'react-cl-audio-player';';'
 
class MusicPlus extends React.Component {
    constructor(props){
        super(props);
        this.dispatch = props.dispatch;
    }
        onTimeUpdate = () => {
            console.log('onTimeUpdate');
        }
        onEnded = () => {
            console.log('onEnded');
        }
        onError = () => {
            console.log('onError');
        }
        onPlay = () => {
            console.log('onPlay');
        }
        onPause = () => {
            console.log('onPause');
        }
        onPrevious = () => {
            console.log('onPrevious');
        }
        onNext =() => {
            console.log('onNext');
        }

      getMusicFiles = songs => songs.map(song => {
        return ({
            url: `song/${song.Path}`,
            artist: {
            name: `${song.DisplayName.substring(0,15)}...`,
            song: song.DisplayName,
        }
    })
});

      render() {
        const { songs } = this.props;
        console.log('Music-songs',songs);
        return (<div className="hwandaza-automation">
            <CLAudioPlayer 
                songs={ this.getMusicFiles(songs) } 
                autoplay = {false}
                onTimeUpdate={this.onTimeUpdate}
                onEnded={this.onEnded}
                onError={this.onError}
                onPlay={this.onPlay}
                onPause={this.onPause}
                onPrevious={this.onPrevious}
                onNext={this.onNext}
             />
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

export default connect(mapStateToProps)(MusicPlus);