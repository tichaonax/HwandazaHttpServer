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
    } from '../../actions';

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
}

  handleInputChange = (searchText) => {
      if (searchText && searchText.length > 1) {
        this.props.onSearch({
          Command: "namedsongs", 
          Module: searchText,
      })
    } 
  }

  onChange = (e)=>{
    if(e.value){
      this.props.setSongs([e.value]);
    }

    this.searchInput.current.blur();
  }

  render() {
    return (
      <div>
        <Select
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
  })
  
const mapStateToProps = (state) => {
    const songs = searchSelectorProjector(state).songList;
    songs.sort((a,b) => (a.label.toLowerCase() > b.label.toLowerCase()) 
    ? 1 : ((b.label.toLowerCase() > a.label.toLowerCase()) ? -1 : 0));
    return {
        songs,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);