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
    getGalleryImages,
    GET_GALLERY_IMAGES,
    setGalleryImages,
    SET_GALLERY_IMAGES
}
from "./galleryImageActions";

export {
    getMusicFiles,
    GET_MUSIC_FILES,
    setMusicFiles,
    SET_MUSIC_FILES
}
from "./musicFileActions";