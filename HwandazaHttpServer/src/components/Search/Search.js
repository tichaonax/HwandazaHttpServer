import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
//import AsyncSelect from 'react-select/lib/Async';
import Select from 'react-select';
//import 'react-select/dist/react-select.css';

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
    this.state = {
      searchAsYouType: '',
    }
}

  handleInputChange = (searchAsYouType) => {
   //const searchAsYouType = searchText.replace(/\W/g, '');
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

  render() {
    return (
      <div>
        <pre>search: "{this.state.searchAsYouType}"</pre>
        <Select
          onInputChange={this.handleInputChange}
          onChange={this.onChange}
          options={this.props.songs}
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