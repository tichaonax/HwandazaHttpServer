import {
    createSelector
} from 'reselect';

export const searchSelectorProjector = createSelector(
    state => state.searchResult,
    searchResult => (searchResult && searchResult.songList ? {
            songList : searchResult.songList.map(s => (
                { 
                  value: {
                    Name: s.Name,
                    Url: s.Url,
                    Cover: s.Cover,
                  }, 
                  label: s.Name,
                }
            ))
        } : {
            songList: [
                { 
                    value: {
                      Name: "Tshidi S'khelekhele",
                      Url:  "Freddie%20Gwala/Golden%20Hits%20Collection/Tshidi%20S'khelekhele.m4a",
                      Cover: "Album/martha/FB_IMG_1454187992191.jpg"
                    }, 
                    label:"Tshidi S'khelekhele",
                },
                { 
                    value: {
                      Name: "kudzosera mbiri",
                      Url:  "Mark%20Ngwazi/Gudo%20Muriwo/kudzosera%20mbiri.mp3",
                      Cover: "Album/droneview/2018-05-21-12-03-27.jpg"
                    }, 
                    label: "kudzosera mbiri",
                },
                { 
                    value: {
                      Name: "The Bhundu Boys - Hupenyu Hwangu",
                      Url: "The%20Bhundu%20Boys/The%20Shed%20Sessions-%201982-1986%20(1%20of%202)/The%20Bhundu%20Boys%20-%20Hupenyu%20Hwangu.mp3",
                      Cover: "Album/images/IMG-20170118-WA0022.jpg",
                    }, 
                    label: "The Bhundu Boys - Hupenyu Hwangu",
                }
            ]
        }
    )
);