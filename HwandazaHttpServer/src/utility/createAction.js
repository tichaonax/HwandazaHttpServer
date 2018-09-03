export const createAction = (type, ...argNames) => {
  return (...args) => {
    let action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    //console.log('action=', JSON.stringify(action));
    return action;
  };
};
