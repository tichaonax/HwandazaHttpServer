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
    }

    this.searchInput.current.blur();
  }

  selectArtistHandler = (selectArtist) =>{
    console.log('selectArtistHandler', selectArtist);
    if(selectArtist){
        console.log('reset artist');
        this.setState({ selectedOption: null });
        this.props.onSetDeselectAsrtist(false);
    }
  }

  render() {
    const { deselector } = this.props;
    const {selectedOption} = this.state;
    console.log('deselector***', deselector);
    
    if(deselector){
      if(deselector.selectArtist){
        this.selectArtistHandler(deselector.selectArtist);
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
})
  
const mapStateToProps = (state) => {
    const deselector = state.deselector;
    const folders = musicRootFoldersSelectorProjector(state).folders;
    folders.sort((a,b) => (a.label.toLowerCase() > b.label.toLowerCase()) 
    ? 1 : ((b.label.toLowerCase() > a.label.toLowerCase()) ? -1 : 0));
    return {
        folders,
        deselector,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RootFolders);