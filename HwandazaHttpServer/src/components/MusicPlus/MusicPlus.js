import React from 'react';
import PropTypes from 'prop-types';
import "../../styles/css/styles.css";
import 'font-awesome/css/font-awesome.min.css';
import CLAudioPlayer from 'react-cl-audio-player';';'
 
export class MusicPlus extends React.Component {
    constructor(props){
        super(props);
        this.dispatch = props.dispatch;
        this.state = {
           songs: [
            {
                Name: "Kugara Newe",
                Url: "Killer%20T/Bvunza%20Tinzwe/Kugara%20Newe.m4a",
            },
            {
                Name: "Mutoro Warema",
                Url: "Killer%20T/Bvunza%20Tinzwe/Mutoro%20Warema.m4a",
             },
           ],
        }
    }

       /*   componentWillReceiveProps(newProps){
            if(newProps.songs && newProps.songs[0] && newProps.songs[0].Path != this.props.songs[0].Path){
                console.log('new props');
                this.setState({
                    songs: newProps.songs,
                });
            }
        }  */

        onTimeUpdate = () => {
            console.log('onTimeUpdate');
        }

        onEnded = () => {
            console.log('onEnded');
        }

        onError = () => {
            console.log('onError');
/*             this.dispatch(getSongs()); */
        }

        onPlay = () => {
            console.log('onPlay');
        }

        onPause = () => {
            console.log('onPause');
        }

        onPrevious = () => {
            console.log('onPrevious');
           /*  const count = this.state.playCount;
            console.log('onPrevious:', count);
            if (count > 0)
            this.setState({
                playCount : count - 1,
            }); */
        }

        onNext =() => {
            console.log('onNext');
            /* const count = this.state.playCount;
            console.log('onNext:', count);
            this.setState({
                playCount : count + 1,
            });
            if (count > this.state.songsTotal){
                console.log('loading more songs');
                this.dispatch(getSongs());
            } */
        }

      getMusicFiles = songs => songs.map(song => {
        return ({
            url: `song/${song.Url}`,
            artist: {
            name: `${song.Name.substring(0,15)}...`,
            song: song.Name,
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

export default MusicPlus;