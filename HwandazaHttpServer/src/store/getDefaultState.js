import {
  fromJS
} from "immutable";

export const getDefaultState = () => {
  const defaultState = {
    automation: {},
    navigation: {
      navpage: '',
      shownavpage: false
    },
    apiErrors: {},
    mediaLibrary: {
      songList:[{
        path: 'path/to/mp3',
        Name: 'Metallica',
        DisplayName: 'Fuel'
      },
      {
        Path: 'path/to/your/mp3',
        Name: 'X Japan',
        DisplayName: 'Art of Life',
      }],
      pictureList:[],
      videoList:[],
    },
  };

  return fromJS(defaultState);
};