import {
    createSelector
} from 'reselect';

export const mediaLibrarySelector = createSelector(
    state => state.mediaLibrary,
    mediaLibrary => 

    (mediaLibrary ? {
        mediaLibrary
        } : {
            pictureList:[],
            videoList:[],
            songList: [
                {
                    Name: "Rudo Ibofu",
                    Url: "Killer%20T/Mashoko%20Anopfuura/Rudo%20Ibofu.m4a",
                },
                {
                    Name: "Don't Bother Me",
                    Url: "Clarence%20Carter/SIng%20Along%20WIth%20Clarence%20Carter/03%20Don't%20Bother%20Me.m4a",
                },
            ]
        }
    )
);
