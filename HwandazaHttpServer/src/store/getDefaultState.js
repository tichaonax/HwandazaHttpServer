import moment from "moment";

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
      songList: {
        statusDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        recordCount: 2,
        totalAvailable: 2,
        result: [
          {
            Name: "Mutoro Warema",
            Url: "Killer%20T/Bvunza%20Tinzwe/Mutoro%20Warema.m4a",
          },
          {
            Name: "Kugara Newe",
            Url: "Killer%20T/Bvunza%20Tinzwe/Kugara%20Newe.m4a",
          },
        ]
    },
      pictureList:{},
      videoList:{},
    },
    searchResult: {
      songList: []
    },
    favoriteTracks: {
      songList: [],
    },
    player: {
      songList: [],
      folders: [],
      info: {message: null},
      error: {message: null},
      warn: {message: null, title: null},
      success: {message: null, title: null},
      selectSong: false,
      selectArtist: false,
      loadMore: true,
      cover: null,
    }
  };

  return fromJS(defaultState);
};
