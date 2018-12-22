export function loadMusicFiles(songList) {
    console.log('loadMusicFiles', songList);
    const songs = songList.result.map(song => {
        //localstorage data may be corrupt wrap inside a try catch
        try {
            let name = unescape(song.Url.split('/')[0]);
            return ({
                cover: `picture/${song.Cover}`,
                url: `song/${song.Url}`,
                title: song.Name.length <= 35 ? song.Name : `${song.Name.substring(0, 35)} ...`,
                artist: [
                    name.length <= 20 ? name : `${name.substring(0, 20)} ...`,
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