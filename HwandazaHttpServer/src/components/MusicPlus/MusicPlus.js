import React from 'react';
import PropTypes from 'prop-types';
import "../../styles/css/styles.css";
import 'font-awesome/css/font-awesome.min.css';
import AudioPlayer from './AudioPlayer';
 
export class MusicPlus extends React.Component {
    constructor(props){
        super(props);
        this.dispatch = props.dispatch;
        this.state = {
        }
    }

        componentDidMount() {
       /*      console.log('MusicPLus****** componentDidMount() ');
            this.setState({
                reload: false,
            }); */
        }
        onTimeUpdate = () => {
            //console.log('onTimeUpdate');
        }

        onEnded = () => {
            console.log('onEnded');
        }

        onError = () => {
            //console.log('onError');
/*             this.dispatch(getSongs()); */
        }

        onPlay = (currentSong) => {
            //console.log('onPlay currentSong', JSON.stringify(currentSong));
          //  src = http://localhost:3000/song/Killer%20T/Bvunza%20Tinzwe/Kugara%20Newe.m4a

            // currentSong =  {"url":"song/Killer%20T/Bvunza%20Tinzwe/Mutoro%20Warema.m4a","artist":{"name":"Killer T","song":"Mutoro Warema"}}
        }

        onPause = () => {
            console.log('onPause');
        }

        onPrevious = () => {
            // console.log('onPrevious');
           /*  const count = this.state.playCount;
            console.log('onPrevious:', count);
            if (count > 0)
            this.setState({
                playCount : count - 1,
            }); */
        }

        onNext =() => {
            // console.log('onNext');
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

      render() {
        const { songs, autoplay } = this.props;
        console.log('Music-songs****',songs);
        return (<div className="hwandaza-automation">
            <AudioPlayer 
                songs={songs}
                autoplay={autoplay} 
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