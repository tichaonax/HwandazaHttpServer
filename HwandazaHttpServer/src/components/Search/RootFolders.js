import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
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
        //do nothing
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

  render() {
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
    return {
        folders,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RootFolders);