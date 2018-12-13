import {
    createSelector
} from 'reselect';

export const musicRootFoldersSelectorProjector = createSelector(
    state => state.player,
    rootFolders => 
    (rootFolders && rootFolders.folders ? {
            folders: rootFolders.folders.map(f => (
                { 
                  value: f, 
                  label: f,
                }
            ))
        } : {
            folders: [
                { 
                    value: "Killer T",
                    label: "Killer T",
                },
                { 
                    value: "Chimora",
                    label: "Chimora",
                },
                { 
                    value: "Pierrette Adams",
                    label: "Pierrette Adams",
                },
                { 
                    value: "Loketo",
                    label: "Loketo",
                }
            ]
        }
    )
);