import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Select from 'react-select';

import {
    searchSelectorProjector,
} from '../../selectors';

import {
  search,
  setSongs,
  setLoadingStatus,
  setDeselectAsrtist,
  setDeselectSearchAsYouType,
  setLoadSongsOnListFinished,
  } 
  from '../../actions';

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
    this.state = {
      selectedOption: null,
    };
}

  handleInputChange = (searchText) => {
      if (searchText && searchText.length > 1) {
        this.props.setLoadingStatus(true);
        this.props.onSearch({
          Command: "namedsongs", 
          Module: searchText,
      });
      this.props.onSetLoadSongsOnListFinished(true);
    } 
  }

  onChange = (selectedOption)=>{
    this.setState({selectedOption});
    if(selectedOption.value){
      this.props.setSongs([selectedOption.value]);
      this.props.onSetDeselectSearchAsYouType(false);
      this.props.onSetDeselectAsrtist(true);
    }
    this.searchInput.current.blur();
  }

  render() {
    const { deselector } = this.props;
    const { selectedOption } = this.state;

    if(deselector){
      if(deselector.selectSong){
        this.setState({selectedOption: null});
        this.props.onSetDeselectSearchAsYouType(false);
      };
    }

    return (
      <div>
        <Select
          value={selectedOption}
          ref={this.searchInput} 
          onInputChange={this.handleInputChange}
          onChange={this.onChange}
          options={this.props.songs}
          placeholder={"Search songs..."}
        />
      </div>
    )
  }
}

  Search.propTypes = {
    songs: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
  };

  Search.defaultProps = {
    songs: [],
  }

  const mapDispatchToProps = dispatch => ({
    onSearch: command => dispatch(search(command)),
    setSongs: songList => dispatch(setSongs(songList)), 
    setLoadingStatus: loading => dispatch(setLoadingStatus(loading)),
    onSetDeselectAsrtist: status => dispatch(setDeselectAsrtist(status)),
    onSetDeselectSearchAsYouType: status => dispatch(setDeselectSearchAsYouType(status)),
    onSetLoadSongsOnListFinished: loadMore => dispatch(setLoadSongsOnListFinished(loadMore)),
  })
  
const mapStateToProps = (state) => {
  const deselector = state.player;
  const songs = searchSelectorProjector(state).songList;
  songs.sort((a,b) => (a.label.toLowerCase() > b.label.toLowerCase()) 
  ? 1 : ((b.label.toLowerCase() > a.label.toLowerCase()) ? -1 : 0));
  return {
      songs,
      deselector,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);