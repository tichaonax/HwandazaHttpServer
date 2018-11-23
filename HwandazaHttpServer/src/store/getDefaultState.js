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
        Name: "Mutoro Warema",
        Url: "Killer%20T/Bvunza%20Tinzwe/Mutoro%20Warema.m4a",
      },
      {
        Name: "Kugara Newe",
        Url: "Killer%20T/Bvunza%20Tinzwe/Kugara%20Newe.m4a",
      }],
      pictureList:[],
      videoList:[],
    },
    searchResult: {
      songList: []
    },
    favoriteTracks: {
      songList: [],
    },
    musicRootFolders: {
      folders: [],
    },
  };

  return fromJS(defaultState);
};
