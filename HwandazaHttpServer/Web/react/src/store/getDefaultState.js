import { fromJS } from "immutable";

export const getDefaultState = () => {
  const defaultState = {
    hwandazaStatus: {}
  };

  return fromJS(defaultState);
};
