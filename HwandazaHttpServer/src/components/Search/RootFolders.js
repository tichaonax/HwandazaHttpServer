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
    this.searchInput = React.createRef();
}

  onChange = (e)=>{
    if(e.value){
     this.props.loadFolderSongs({
         Command : "foldersongs",
         Module: e.value,
        });
    }

    this.searchInput.current.blur();
  }

  render() {
    return (
      <div>
        <Select
          ref={this.searchInput} 
          onChange={this.onChange}
          options={this.props.folders}
          placeholder={"Select artist..."}
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