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
    SET_FAVORITE_TRACK,
    setFavoriteTrack,
} from "./favoriteTrackActions";