import React from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
  } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-blue.css';
import { Flex, Box } from 'rebass';

import { getSongs } from '../../actions';

import "../../styles/css/styles.css";
//import './Musicloader.css';

export class MusicLoader extends React.Component {
    constructor(props){
        super(props);
        this.dispatch = props.dispatch;
        this.state = {
        }
    }

    loadSongs = (next) => {
        console.log('next', next);
        this.dispatch(getSongs());
    }

    render() {
        return(
            <div>
                <Flex>
                    <Box p={6} width={1}>
                        <AwesomeButtonProgress
                            type="secondary"
                            size="medium"
                            action={(element, next) => this.loadSongs(next)}
                        >
                        Load Songs
                        </AwesomeButtonProgress>
                        <AwesomeButtonProgress
                            type="secondary"
                            size="medium"
                            action={(element, next) => this.loadSongs(next)}
                        >
                        Favorites
                        </AwesomeButtonProgress>
                        <AwesomeButtonProgress
                            type="secondary"
                            size="medium"
                            action={(element, next) => this.loadSongs(next)}
                        >
                        Sokouss
                        </AwesomeButtonProgress>
                        <AwesomeButtonProgress
                            type="secondary"
                            size="medium"
                            action={(element, next) => this.loadSongs(next)}
                        >
                        Rhumba
                        </AwesomeButtonProgress>
                    </Box>
                </Flex>
            </div>
        );
    }
}

export default MusicLoader;