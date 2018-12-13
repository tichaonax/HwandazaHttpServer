import {
    createSelector
} from 'reselect';

export const favoritesSelector = createSelector(
    state => state.player,
    favoriteTracks => 
    (favoriteTracks && favoriteTracks.songList && favoriteTracks.songList.length > 0 ? {
        songList : favoriteTracks.songList
        } : {
            songList: [
                {
                    Cover: "chbby/whatsapp/WhatsApp%20Image%202018-08-29%20at%207.30.21%20AM.jpeg",
                    Name: "Rudo Ibofu",
                    Url: "Killer%20T/Mashoko%20Anopfuura/Rudo%20Ibofu.m4a",
                },
                {
                    Cover: "chbby/whatsapp/WhatsApp%20Image%202018-08-12%20at%208.00.23%20AM.jpeg",
                    Name: "Don't Bother Me",
                    Url: "Clarence%20Carter/SIng%20Along%20WIth%20Clarence%20Carter/03%20Don't%20Bother%20Me.m4a",
                },
            ]
        }
    )
);
