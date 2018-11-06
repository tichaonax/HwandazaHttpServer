import {
    createSelector
} from 'reselect';

export const songSelector = createSelector(
    state => state.get(`mediaLibrary`),
    mediaLibrary => {
        const songs = mediaLibrary.songList;
        console.log('songSelector', songs);
        return (songs) ? {
            songList: songs
        } : {
            songList: [
                {
                    Name: "Mutoro Warema",
                    Url: "Killer%20T/Bvunza%20Tinzwe/Mutoro%20Warema.m4a",
                },
                {
                    Name: "Kugara Newe",
                    Url: "Killer%20T/Bvunza%20Tinzwe/Kugara%20Newe.m4a",
                },
            ]
        };
    }
);