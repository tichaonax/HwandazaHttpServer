export {
    GET_STATUS,
    getStatus,
    SET_STATUS,
    setStatus,
    SET_RANDOM_LIGHT_STATUS,
    setRandomLightStatus,
    RANDOM_TOGGLE_STATUS,
    randomToggleStatus,
    SET_MODULE_STATUS,
    setModuleStatus,
    SET_SYSTEM_DATE_TIME,
    setSyatemDateTime,
}
from "./statusActions";

export {
    setNavPage,
    SET_NAV_PAGE,
    showNavPage,
    SHOW_NAV_PAGE
}
from "./navActions";

export {
    setApiCallFailed,
    API_CALL_FAILED
}
from "./apiErrorActions";

export {
    getPictures,
    GET_PICTURES,
    setPictures,
    SET_PICTURES,

    getVideos,
    GET_VIDEOS,
    setVideos,
    SET_VIDEOS,

    getSongs,
    GET_SONGS,
    setSongs,
    SET_SONGS,
}
from "./mediaActions";

export {
    SEARCH_AS_YOU_TYPE,
    search,
    SET_SEARCH_RESULT,
    setSearchResult,
}
from "./searchActions";

export {
    LOAD_FAVORITE_TRACKS,
    loadFavoriteTracks,
    ADD_FAVORITE_TRACK,
    addFavoriteTrack,
    REMOVE_FAVORITE_TRACK,
    removeFavoriteTrack,
}
from "./favoriteActions";

export {
    LOAD_MUSIC_ROOT_FOLDERS,
    loadMusicRootFolders,
    SET_MUSIC_ROOT_FOLDERS,
    setMusicRootFolders,
    LOAD_FOLDER_SONGS,
    loadFolderSongs,
    SET_DESELECT_SEARCH_AS_YOU_TYPE,
    setDeselectSearchAsYouType,
    SET_DESELECT_ARTIST,
    setDeselectAsrtist,
    SET_LOAD_SONGS_ON_LIST_FINISHED,
    setLoadSongsOnListFinished,
    GET_RANDOM_TRACK_COVER,
    getRandomTrackCover,
    SET_RANDOM_TRACK_COVER,
    setRandomTrackCover,
} from "./playerActions";

export {
    SET_LOADING_STATUS,
    setLoadingStatus,
} from "./spinnerActions";

export {
    SET_NOTIFICATION_INFO,
    setNotificationInfo,
    SET_NOTIFICATION_ERROR,
    setNotificationError,
    SET_NOTIFICATION_WARN,
    setNotificationWarn,
    SET_NOTIFICATION_SUCCESS,
    setNotificationSuccess,
    RESET_NOTIFICATIONS,
    resetNotifications,
} from "./notificationActions";

export {
    GET_RANDOM_BACKGROUND_IMAGE,
    getRandomBackGroundImage,
    SET_RANDOM_BACKGROUND_IMAGE,
    setRandomBackGroundImage,
} from "./backGroundImageActions";

