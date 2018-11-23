import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
//import AsyncSelect from 'react-select/lib/Async';
import Select from 'react-select';

import {
    musicRootFoldersSelectorProjector,
} from '../../selectors';

import {
    loadFolderSongs,
    } from '../../actions';

export class RootFolders extends React.Component {
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
     /*    if (searchAsYouType.length > 1) {
          this.props.onSearch({
            Command: this.props.searchMode, //"namedsongs", //"foldersongs"
            Module: searchAsYouType,
        })} */
      } 
    });
    
   return searchAsYouType;
  }

  onChange = (e)=>{
    if(e.value){
     this.props.loadFolderSongs({
         Command : "foldersongs",
         Module: e.value,
        });
    }
  }

/*   loadRootFolders = () => {
    let  options = []; 
    const searchAsYouType = this.state.searchAsYouType;
    if(this.props.folders){
      options = this.props.folders.map(r => (
        { 
          value: r, 
          label: r,
        }
    ))}

    console.log('loadRootFolders', options);

    if (searchAsYouType) {
        return options.filter(i =>
          i.label.toLowerCase().includes(searchAsYouType.toLowerCase())
        );
      }
    
    return options;
  } */

  render() {
    console.log('this.props.folders', this.props.folders);
    return (
      <div>
        <pre>artist: "{this.state.searchAsYouType}"</pre>
        <Select
          onInputChange={this.handleInputChange}
          onChange={this.onChange}
          options={this.props.folders}
        />
      </div>
    )
  }
}

RootFolders.propTypes = {
    folders: PropTypes.array.isRequired,
};

RootFolders.defaultProps = {
    folders: [],
}

const mapDispatchToProps = dispatch => ({
    loadFolderSongs: folder => dispatch(loadFolderSongs(folder)), 
})
  
const mapStateToProps = (state) => {
    const folders = musicRootFoldersSelectorProjector(state).folders;
    folders.sort((a,b) => (a.label.toLowerCase() > b.label.toLowerCase()) 
    ? 1 : ((b.label.toLowerCase() > a.label.toLowerCase()) ? -1 : 0));
    console.log('sorted musicRootFoldersSelectorProjector', folders);
    return {
        folders,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RootFolders);