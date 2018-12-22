import moment from "moment";
import {
    createSelector
} from 'reselect';

import { mediaLibrarySelector, } from '../selectors';
import { loadMusicFiles } from "./loadMusicFiles";

export const songSelectorMusicPlayerProjector = createSelector(
    mediaLibrarySelector,
    library => (library && library.songList ? {
        songList: loadMusicFiles(library.songList)
        } : {
            songList:{
                statusDate: moment().format("YYYY-MM-DD HH:mm:ss"),
                recordCount: 2,
                totalAvailable: 2,
                result:[
                    {
                        cover: "http://192.168.0.107:8100/picture/chbby/whatsapp/WhatsApp%20Image%202018-08-29%20at%207.30.21%20AM.jpeg",
                        url: "http://192.168.0.107:8100/song/Killer%20T/Mashoko%20Anopfuura/Rudo%20Ibofu.m4a",
                        title: "Rudo Ibofu",
                        artist: [
                        "Killer T",
                        ]
                    },
                    {
                        cover:"http://192.168.0.107:8100/picture/chbby/whatsapp/WhatsApp%20Image%202018-08-12%20at%208.00.23%20AM.jpeg",
                        url: "http://192.168.0.107:8100/song/Clarence%20Carter/SIng%20Along%20WIth%20Clarence%20Carter/03%20Don't%20Bother%20Me.m4a",
                        title: "Don't Bother Me",
                        artist: ["Clarence Carter"],
                    }
                ],
             }
        }
    )
);

export default songSelectorMusicPlayerProjector;
