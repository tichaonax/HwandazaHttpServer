import { fromJS } from "immutable";

export const getDefaultState = () => {
  const defaultState = {
    automation: {},
    navigation: { navpage: '', shownavpage: false }
  };

  return fromJS(defaultState);
};