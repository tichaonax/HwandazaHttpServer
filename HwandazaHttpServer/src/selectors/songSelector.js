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
            songList: [{
                path: 'path/to/mp3',
                Name: 'Metallica',
                DisplayName: 'Madzimai Mabika Here'
              },
              {
                Path: 'path/to/your/mp3',
                Name: 'X Japan',
                DisplayName: 'Art of Life',
              }]
        };
    }
);