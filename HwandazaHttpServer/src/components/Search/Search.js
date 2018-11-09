import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Suggestions } from './Suggestions';

import {
    searchSelector,
} from '../../selectors';

import {
  search,
    } from '../../actions';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    }
}

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length > 1) {
          this.props.onSearch({
            Command: "namedsongs",
            Module: this.state.query,
        })}

      } 
    })
  }

  render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <p>{this.state.query}</p>
        <Suggestions results={this.props.songs} />
      </form>
    )
  }
}


Search.propTypes = {
    songs: PropTypes.array.isRequired,
  };

  Search.defaultProps = {
    songs: [],
  }

  const mapDispatchToProps = dispatch => ({
    onSearch: (command) => dispatch(search(command))
  })
  
const mapStateToProps = (state) => {
    const songs = searchSelector(state);
    return {
        songs: songs.songList,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);