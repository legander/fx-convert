const setStatePromise = (setState, state) => new Promise(resolve => setState(state, resolve));

export const createLoadingManager = (setState) => async (stateKey, promise) => {
  try {
    await setStatePromise(setState, { [stateKey]: true });
    const res = await promise;
    return res;
  } finally {
    await setStatePromise(setState, { [stateKey]: false });
  }
};
