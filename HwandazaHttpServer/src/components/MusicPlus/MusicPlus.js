import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { songSelector } from './../../selectors';
import "../../styles/css/styles.css";
import { getSongs } from '../../actions';
import 'font-awesome/css/font-awesome.min.css';
import CLAudioPlayer from 'react-cl-audio-player';';'
 
class MusicPlus extends React.Component {
    constructor(props){
        super(props);
        this.dispatch = props.dispatch;
        this.state = {
            playCount: 0,
            songsTotal: 0,
        }
    }

        componentWillReceiveProps(newProps){
            if(newProps.songs[0].Path != this.props.songs[0].Path){
                console.log('new props');
                this.setState({
                    songsTotal: newProps.songs.length,
                    playCount: 0,
                });
            }
        }

        onTimeUpdate = () => {
            console.log('onTimeUpdate');
        }

        onEnded = () => {
            console.log('onEnded');
        }

        onError = () => {
            console.log('onError');
            this.dispatch(getSongs());
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
            const count = this.state.playCount;
            this.setState({
                playCount : count + 1,
            });
            if (count > this.state.songsTotal){
                this.dispatch(getSongs());
            }
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
                autoplay
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

MusicPlus.propTypes = {
    songs: PropTypes.array.isRequired
  };

const mapStateToProps = (state, {autoplay}) => {
    const songs = songSelector(state);
    return {
        songs: songs.songList,
        autoplay,
    }
};

export default connect(mapStateToProps)(MusicPlus);