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
        DisplayName: "Mutoro Warema",
        ContentType: "audio/mp4",
        Path: "Killer%20T/Bvunza%20Tinzwe/Mutoro%20Warema.m4a",
      },
      {
        DisplayName: "Kugara Newe",
        ContentType: "audio/mp4",
        Path: "Killer%20T/Bvunza%20Tinzwe/Kugara%20Newe.m4a",
      }],
      pictureList:[],
      videoList:[],
    },
  };

  return fromJS(defaultState);
};
