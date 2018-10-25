import React from 'react';
import { connect } from "react-redux";
import AudioPlayer from 'react-cl-audio-player';
import { songSelector } from './../../selectors';
import "../../styles/css/styles.css";
import { getSongs } from '../../actions';

/* propTypes = {
    songs: PropTypes.array.isRequired,
    autoplay: PropTypes.bool,
    onTimeUpdate: PropTypes.func,
    onEnded: PropTypes.func,
    onError: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
  };
 */

class Music extends React.Component {
    constructor(props){
        super(props);
        this.dispatch = props.dispatch;
        this.state = {
            playCount : 0,
        }
    }

    loadMoreSongs = () =>{
        if (this.state.playCount >= 100){
            this.setState({ playCount : 0 }, this.dispatch(getSongs())); 
        }
    }

    countPlayedSongs = (count, countPlay) => {
        console.log('onEnded', countPlay)
        let playCount = count;
        if(countPlay === true){ playCount = playCount + 1;}
        this.setState({ playCount : playCount }, 
           this.loadMoreSongs());
        }

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
        <AudioPlayer songs={ this.getMusicFiles(songs) } 
        autoplay = {true}  
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

export default connect(mapStateToProps)(Music);