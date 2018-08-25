import { fromJS } from "immutable";

export const getDefaultState = () => {
  const defaultState = {
    hwandaStatus: {},
    navigation: { navpage: '', shownavpage: false }
  };

  return fromJS(defaultState);
};
