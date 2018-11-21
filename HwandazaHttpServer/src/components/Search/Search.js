import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';

import {
    searchSelector,
} from '../../selectors';

import {
  search,
  setSongs,
    } from '../../actions';

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchAsYouType: '',
    }
}

  handleInputChange = (searchText) => {
   const searchAsYouType = searchText.replace(/\W/g, '');
    this.setState({
      searchAsYouType
    }, () => {
      if (searchAsYouType) {
        if (searchAsYouType.length > 1) {
          this.props.onSearch({
            Command: "namedsongs",
            Module: searchAsYouType,
        })}
      } 
    });
    
   return searchAsYouType;
  }

  onChange = (e)=>{
    if(e.value){
      this.props.setSongs([e.value]);
    }
  }

  loadTracks = (searchAsYouType, callback) => {
    let  options = []; 

    if(this.props.songs){
      options = this.props.songs.map(r => (
        { 
          value: {
            Name: r.Name,
            Url: r.Url,
            Cover:r.Cover,
          }, 
          label: r.Name,
        }
    ))}

    return Promise.resolve(options);
  }

  render() {
    return (
      <div>
        <pre>search: "{this.state.searchAsYouType}"</pre>
        <AsyncSelect
          cacheOptions
          loadOptions={this.loadTracks}
          defaultOptions
          onInputChange={this.handleInputChange}
          onChange={this.onChange}
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
    const songs = searchSelector(state).songList;
    songs.sort((a,b) => (a.Name.toLowerCase() > b.Name.toLowerCase()) 
    ? 1 : ((b.Name.toLowerCase() > a.Name.toLowerCase()) ? -1 : 0));
    return {
        songs,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);