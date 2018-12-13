import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Select from 'react-select';

import {
    musicRootFoldersSelectorProjector,
} from '../../selectors';

import {
    loadFolderSongs,
    setDeselectSearchAsYouType,
    setDeselectAsrtist,
    setLoadSongsOnListFinished,
    } from '../../actions';

export class RootFolders extends React.Component {
  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
    this.state = {
        selectedOption: null,
      };
}

  onChange = (selectedOption)=>{
    this.setState({selectedOption});
    if(selectedOption.value){
     this.props.loadFolderSongs({
         Command : "foldersongs",
         Module: selectedOption.value,
        })
        this.props.onSetDeselectAsrtist(false);
        this.props.onSetDeselectSearchAsYouType(true);
        this.props.onSetLoadSongsOnListFinished(false);
    }

    this.searchInput.current.blur();
  }

  render() {
    const { deselector } = this.props;
    const {selectedOption} = this.state;
    
    if(deselector){
      if(deselector.selectArtist){
        this.setState({ selectedOption: null });
        this.props.onSetDeselectAsrtist(false);
      }
    }
    return (
      <div>
        <Select
          value={selectedOption}
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
    onSetDeselectAsrtist: status => dispatch(setDeselectAsrtist(status)),
    onSetDeselectSearchAsYouType: status => dispatch(setDeselectSearchAsYouType(status)),
    onSetLoadSongsOnListFinished: loadMore => dispatch(setLoadSongsOnListFinished(loadMore)),
})
  
const mapStateToProps = (state) => {
    const deselector = state.player;
    const folders = musicRootFoldersSelectorProjector(state).folders;
    folders.sort((a,b) => (a.label.toLowerCase() > b.label.toLowerCase()) 
    ? 1 : ((b.label.toLowerCase() > a.label.toLowerCase()) ? -1 : 0));
    return {
        folders,
        deselector,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RootFolders);