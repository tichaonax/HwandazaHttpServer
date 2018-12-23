import { getStore } from "../store/getStore";
import { mediaLibrarySelector } from './mediaLibrarySelector';

export const selectTrackByUrlSelector = url => {
    const library = mediaLibrarySelector(getStore().getState());
    if(library && library.songList) return library.songList.result.find(track => track.Url === url);
    return null;
} 