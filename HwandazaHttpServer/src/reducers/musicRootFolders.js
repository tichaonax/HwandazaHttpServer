import { createReducer } from '../utility';
import { SET_MUSIC_ROOT_FOLDERS } from '../actions';

export const musicRootFolders = createReducer({}, {
  [SET_MUSIC_ROOT_FOLDERS](state, action) {
    return Object.assign({}, state, { folders: action.rootFolders });
  },
});

export default musicRootFolders;