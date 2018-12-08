import React from 'react';
import { connect } from "react-redux";
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';

import { loadingSelector } from '../../selectors';

const override = css`
    display: block;
    border-color: red;
    position: absolute;
    top: 250px;
    z-index: 1;
    margin: auto;
`;

export class Spinner extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div className='sweet-loading hwandaza-spinner'>
          <ClipLoader
            className={override}
            sizeUnit={"px"}
            size={150}
            color={'#123abc'}
            loading={this.props.loading}
          />
        </div> 
      )
    }
  }

  
const mapStateToProps = (state) => {
    const loading = loadingSelector(state);
    console.log('loading', loading)
    return {
        loading,
    }
};

export default connect(mapStateToProps)(Spinner);