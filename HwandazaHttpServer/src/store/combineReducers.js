export const combineReducers = config => {
  return (state, action) => {
    return Object.keys(config).reduce((state, key) => {
      const reducer = config[key];
      //console.log('redux-key',key);
      const previousState = state.get(key);
      //console.log("redux store previousState", previousState);
      const newValue = reducer(previousState, action);

      if (!newValue) {
        throw new Error(`A reducer returned "undefined" for key::"${key}"`);
      }
      //console.log("redux store new newstate", newValue);
      return state.set(key, newValue);
    }, state);
  };
};
