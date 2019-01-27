export function getSongTitleFromUrl(url){
    const parts = url.split('/');
    const artist = unescape(parts[0]).trim();
    let namepart = unescape(parts[parts.length-1]);
    let name = namepart.substring(0, namepart.indexOf("."));
    //remove leading numbers and space
    name = name.replace(/^[^.]+\./, "").trim();
    return { artist, name };
}

export function loadMusicFiles(songList) {
    console.log('loadMusicFiles', songList);
    const songs = songList.result.map(song => {
        //localstorage data may be corrupt wrap inside a try catch
        try {
            const { artist, name } = getSongTitleFromUrl(song.Url);
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
};
