export function loadMusicFiles(songList) {
    console.log('loadMusicFiles', songList);
    const songs = songList.result.map(song => {
        //localstorage data may be corrupt wrap inside a try catch
        try {
            //{ ".m4a", ".mp3", ".wma" }
            const parts = song.Url.split('/');
            const artist = unescape(parts[0]);
            let namepart = unescape(parts[parts.length-1]);
            let mp4Str = namepart.substring(0, namepart.indexOf(".mp4"));
            let mp3Str = mp4Str.substring(0, mp4Str.indexOf(".mp3"));
            let name = mp3Str.substring(0, mp3Str.indexOf(".wma"));
            return ({
                cover: `picture/${song.Cover}`,
                url: `song/${song.Url}`,
                title: name.length <= 35 ? name : `${name.substring(0, 35)} ...`,
                artist: [
                    artist.length <= 20 ? artist : `${artist.substring(0, 20)} ...`,
                ]
            });
        }
        catch (error) {
            return;
        }
    });
    return {
        statusDate: songList.statusDate,
        recordCount: songList.recordCount,
        totalAvailable: songList.totalAvailable,
        result: songs,
    };
}
;