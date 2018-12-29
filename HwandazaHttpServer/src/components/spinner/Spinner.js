import React from 'react';
import { connect } from "react-redux";
import { css } from 'react-emotion';
import { HashLoader } from 'react-spinners';

import { loadingSelector } from '../../selectors';

const override = css`
    display: block;
    border-color: red;
    position: absolute;
    top: 250px;
    z-index: 1;
    margin: center;
`;

export class Spinner extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div className='sweet-loading hwandaza-spinner'>
          <HashLoader
            className={override}
            sizeUnit={"px"}
            size={40}
            color={'#ea0bd4'}
            loading={this.props.loading}
          />
        </div> 
      )
    }
  }

  
const mapStateToProps = (state) => {
    const loading = loadingSelector(state);
    return {
        loading,
    }
};

export default connect(mapStateToProps)(Spinner);