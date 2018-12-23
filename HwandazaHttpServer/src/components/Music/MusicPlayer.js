import { connect } from "react-redux";
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './MusicPlayer.css'
import Search from '../Search/Search';
import RootFolders from '../Search/RootFolders';

import { 
  songSelectorMusicPlayerProjector, 
  selectTrackByUrlSelector,
  favoritesSelector,
 } from '../../selectors';

import { 
  getSongs, 
  addFavoriteTrack, 
  removeFavoriteTrack, 
  loadFavoriteTracks,
  setNotificationSuccess, 
  setNotificationInfo,
  setNotificationWarn,
  setLoadingStatus,
  setDeselectSearchAsYouType,
  setDeselectAsrtist,
  setLoadSongsOnListFinished,
  getRandomTrackCover,
  setRandomTrackCover,
 } from '../../actions';

class MusicPlayer extends Component {

  static propTypes = {
    autoplay: PropTypes.bool,
    progressColor: PropTypes.string,
    btnColor: PropTypes.string,
    playlist: PropTypes.array.isRequired,
    style: PropTypes.object,
  }

  static defaultProps = {
    autoplay: false,
    progressColor: '#66cccc',
    btnColor: '#4a4a4a',
    playlist: [],
    style: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      activeMusicIndex: 0,
      leftTime: 0,
      play: this.props.autoplay || false,
      playMode: 'loop',
      progress: 0,
      volume: 1,
      isFavorite: false,
    }
    this.modeList = ['loop', 'random', 'repeat']
  }

  componentDidMount() {
    const audioContainer = this.audioContainer
    audioContainer.addEventListener('timeupdate', this.updateProgress.bind(this))
    audioContainer.addEventListener('ended', this.end.bind(this));
    audioContainer.addEventListener('play', this.play.bind(this));
    this.setState({playerMounted:true});
  }

  componentWillUnmount() {
    const audioContainer = this.audioContainer
    audioContainer.removeEventListener('timeupdate', this.updateProgress.bind(this))
    audioContainer.removeEventListener('ended', this.end.bind(this))
    audioContainer.removeEventListener('play', this.play.bind(this));
  }

  updateProgress() {

    if(this.audioContainer){
      const duration = this.audioContainer.duration
      const currentTime = this.audioContainer.currentTime
      const progress = currentTime / duration
      this.setState({
        progress: progress,
        leftTime: duration - currentTime
      })
    }
  }

  end() {
    this.handleNext()
  }

  play() {
    this._setPlayingSongFavoriteStatus();
    this.props.onResetTrackCover();
  }
  
  handleAdjustProgress(e) {
    const progressContainer = this.progressContainer
    const progress = (e.clientX - progressContainer.getBoundingClientRect().left) / progressContainer.clientWidth
    const currentTime = this.audioContainer.duration * progress
    this.audioContainer.currentTime = currentTime
    this.setState({
      play: true,
      progress: progress
    }, () => {
      this.audioContainer.play();
    })
  }

  handleImageClick(e) {
    this.props.onGetRandomTrackCover();
  }

  handleAdjustVolume(e) {
    const volumeContainer = this.volumeContainer
    let volume = (e.clientX - volumeContainer.getBoundingClientRect().left) / volumeContainer.clientWidth
    volume = volume < 0 ? 0 : volume
    this.audioContainer.volume = volume
    this.setState({
      volume: volume
    })
  }

  handleToggle() {
    this.state.play ? this.audioContainer.pause() : this.audioContainer.play();
    this.setState({ play: !this.state.play });
  }

  handlePrev() {
    const { playMode, activeMusicIndex } = this.state
    if (playMode === 'repeat') {
      this._playMusic(activeMusicIndex)
    } else if (playMode === 'loop') {
      const total = this.props.playlist.length
      const index = activeMusicIndex > 0 ? activeMusicIndex - 1 : total - 1
      this._playMusic(index)
    } else if (playMode === 'random') {
      let randomIndex = Math.floor(Math.random() * this.props.playlist.length)
      while (randomIndex === activeMusicIndex) {
        randomIndex = Math.floor(Math.random() * this.props.playlist.length)
      }
      this._playMusic(randomIndex)
    } else {
      this.setState({ play: false })
    }
  }

  handleNext() {
    const { playMode, activeMusicIndex } = this.state
    if (playMode === 'repeat') {
      this._playMusic(activeMusicIndex)
    } else if (playMode === 'loop') {
      const total = this.props.playlist.length;
        const index = activeMusicIndex < total - 1 ? activeMusicIndex + 1 : 0
        if (activeMusicIndex === (total - 1) && index === 0 && this.props.player && this.props.player.loadSongsOnListFinished){
          this.props.onLoadSongs();
          this.props.onSetDeselectSearchAsYouType(true);
          this.props.onSetDeselectAsrtist(true);
        }else{
        this._playMusic(index);
      }
    } else if (playMode === 'random') {
      let randomIndex = Math.floor(Math.random() * this.props.playlist.length)
      while (randomIndex === activeMusicIndex) {
        randomIndex = Math.floor(Math.random() * this.props.playlist.length)
      }
      this._playMusic(randomIndex)
    } else {
      this.setState({ play: false })
    }
  }

  handleChangePlayMode() {
    let index = this.modeList.indexOf(this.state.playMode)
    index = (index + 1) % this.modeList.length
    this.setState({ playMode: this.modeList[index] })
  }

  handleLoadSongs() {
    this.props.setLoadingStatus(true);
    this.props.onLoadSongs();
    this.props.onNotifyLoadSongs();
    this.props.onSetDeselectSearchAsYouType(true);
    this.props.onSetDeselectAsrtist(true);
    this.props.onSetLoadSongsOnListFinished(true);
  }

  handleLoadFavorites(){
    this.props.loadFavoriteTracks();
    this.props.onNotifyLoadFavoriteTracks();
    this.props.onSetDeselectSearchAsYouType(true);
    this.props.onSetDeselectAsrtist(true);
    this.props.onSetLoadSongsOnListFinished(false);
  }

  handleAddFavoriteTrack() {
    const activeMusic = this._getActiveTrack();
    if(activeMusic){
      const track = this._selectTrackByUrl(activeMusic);
      this.props.addFavoriteTrack(track);
      this.props.onNotifyAddFavorite(activeMusic.title);
      this.setState({isFavorite: true });
    }
  }

  handleRemoveFavoriteTrack() {
    const activeMusic = this._getActiveTrack();
    if(activeMusic){
      const track = this._selectTrackByUrl(activeMusic);
      this.props.removeFavoriteTrack(track);
      this.props.onNotifyFavoriteDeleted(activeMusic.title);
    }
    this.setState({isFavorite: false });
  }

  _selectTrackByUrl(activeMusic){
    return selectTrackByUrlSelector(activeMusic.url.split("song/")[1]);
  }

  _getActiveTrack(){
    const { playlist } = this.props
    const { activeMusicIndex } = this.state
    return playlist[activeMusicIndex]; 
  }

  _playMusic(index) {
    this.setState({
      activeMusicIndex: index,
      leftTime: 0,
      play: true,
      progress: 0
    }, () => {
      this.audioContainer.currentTime = 0
      this.audioContainer.play();
    })
  }

  _formatTime(time) {
    if (isNaN(time) || time === 0) {
      return
    }
    const mins = Math.floor(time / 60)
    const secs = (time % 60).toFixed()
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  _processArtistName(artistList) {
    if(artistList)
    return artistList.join(' / ')
    return null;
  }

  _setPlayingSongFavoriteStatus(){
    const track = this._selectTrackByUrl(this._getActiveTrack());
    const match = this.props.favorites.songList.find(t=> (t.Url == track.Url));
    this.setState({isFavorite: (match) ? true : false})
  }

  render() {
    const { progressColor, btnColor, playlist, player, recordCount, totalAvailable } = this.props;
    const { activeMusicIndex, playMode } = this.state
  
    const activeMusic = playlist[activeMusicIndex]
    if (!activeMusic){
      this.handleNext();
    }
    const { cover } = player;
    let coverImage = `url(${activeMusic ? activeMusic.cover : null})`;
    if(cover && cover.Url){
      console.log('cover.Ulr', cover.Url);
      coverImage = `url(picture/${cover.Url})`;
    }
    const playModeClass = playMode === 'loop' ? 'refresh' : playMode === 'random' ? 'random' : 'repeat'
    const btnStyle = { color: btnColor }
    const btnStyleFavorite = { color : 'green'};
    const progressStyle = { width: `${this.state.progress * 100}%`, backgroundColor: progressColor }

    return (
      <div style={{display: this.props.display}}>        
        <div className="player-container" style={this.props.style}>
          <audio
            autoPlay={this.state.play}
            preload="auto"
            ref={ref => { this.audioContainer = ref }}
            src={activeMusic ? activeMusic.url : null}
          />
          <div className="info-and-control">
            <div className="music-info">
              <h2 className="title">{activeMusic ? activeMusic.title : "loading..."}</h2>
              <h3 className="artist">{this._processArtistName(activeMusic ? activeMusic.artist : null)}</h3>
            </div>
            <div className="time-and-volume">
              <div className="left-time">-{this._formatTime(this.state.leftTime)}</div>
              <div className="volume-container">
                <div className="volume-icon">
                  <i className="icon fa fa-volume-up"></i>
                </div>
                <div className="volume-wrapper">
                  <div
                    className="progress-container"
                    onClick={this.handleAdjustVolume.bind(this)}
                    ref={ref => { this.volumeContainer = ref }}
                  >
                    <div className="progress" style={{ width: `${this.state.volume * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="progress-container"
              onClick={this.handleAdjustProgress.bind(this)}
              ref={(ref) => { this.progressContainer = ref }}
            >
              <div className="progress" style={progressStyle}></div>
            </div>
            <div className="control-container">
              <div className="mode-control">
              <div>
              <i className="icon fa fa-heart" aria-hidden="true" style={this.state.isFavorite ? btnStyleFavorite : btnStyle} title="Load favorites" onClick={this.handleLoadFavorites.bind(this)}></i>
              </div>
               </div>
              <div className="controls">
                <div>
                  <i className="icon fa fa-times" aria-hidden="true" style={btnStyle} title="Remove from favorites" onClick={this.handleRemoveFavoriteTrack.bind(this)}></i>
                </div>
                <div>
                  <i className="icon fa fa-check"  aria-hidden="true" style={btnStyle} title="Add to favorites" onClick={this.handleAddFavoriteTrack.bind(this)}></i>
               </div>
               <div>
                  <i className="icon fa fa-download"  aria-hidden="true" style={btnStyle} title="Load songs" onClick={this.handleLoadSongs.bind(this)}></i>
               </div>
              </div>
            </div>
            <div className="control-container">
              <div className="mode-control">
                <i className={`icon fa fa-${playModeClass}`} title="Shuffle / Reapeat/ Loop" style={btnStyle} onClick={this.handleChangePlayMode.bind(this)}></i>
              </div>
              <div className="controls controls-padding">
                <i className="icon fa fa-step-backward" style={btnStyle} title="Previous" onClick={this.handlePrev.bind(this)}></i>
                <i className={`icon fa fa-${this.state.play ? 'pause' : 'play'}`} title="Play / Pause" style={btnStyle} onClick={this.handleToggle.bind(this)}></i>
                <i className="icon fa fa-step-forward" style={btnStyle} title="Next" onClick={this.handleNext.bind(this)}></i>
              </div>
            </div>
          </div>
          
          <div className="cover-container">
            <div 
            onClick={this.handleImageClick.bind(this)}
            className="cover" style={{ backgroundImage: coverImage }}></div>
          </div>
        </div>
        <div className="search-as-you-type-container">
          <div className="search-as-you-type"><Search /></div>
          <div className="search-as-you-type"><RootFolders/></div>
        </div>
      </div>
    )
  }
}

  MusicPlayer.propTypes = {
    playlist: PropTypes.array.isRequired,
    onLoadSongs: PropTypes.func.isRequired,
  };

  const mapDispatchToProps = dispatch => ({
    onLoadSongs: () => dispatch(getSongs()), 
    addFavoriteTrack: url => dispatch(addFavoriteTrack(url)),
    removeFavoriteTrack: url => dispatch(removeFavoriteTrack(url)),
    loadFavoriteTracks: () => dispatch(loadFavoriteTracks()),
    setLoadingStatus: loading => dispatch(setLoadingStatus(loading)),
    onNotifyAddFavorite: title => dispatch(setNotificationSuccess({
      title, message:'Saved to favorites',
    })),
    onNotifyLoadSongs: () => dispatch(setNotificationInfo('Loading songs')),
    onNotifyFavoriteDeleted: title => dispatch(setNotificationWarn({
      title, message:'Removed from favorites',
    })),
    onNotifyLoadFavoriteTracks: () => dispatch(setNotificationInfo('Loading favorite songs')),
    onSetDeselectAsrtist: status => dispatch(setDeselectAsrtist(status)),
    onSetDeselectSearchAsYouType: status => dispatch(setDeselectSearchAsYouType(status)),
    onSetLoadSongsOnListFinished: loadMore => dispatch(setLoadSongsOnListFinished(loadMore)),
    onGetRandomTrackCover: () => dispatch(getRandomTrackCover()),
    onResetTrackCover: () => dispatch(setRandomTrackCover({cover : null})),
  });

const mapStateToProps = (state, {autoplay}) => {
  const songs = songSelectorMusicPlayerProjector(state);
  const favorites = favoritesSelector(state);
  const player = state.player;
  return {
    playlist : songs.songList.result,
    autoplay,
    player,
    favorites,
    statusDate: songs.songList,
    recordCount: songs.songList.recordCount,
    totalAvailable: songs.songList.totalAvailable,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
