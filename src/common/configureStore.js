/* @flow weak */
import configureReducer from './configureReducer';
import configureMiddleware from './configureMiddleware';
import { applyMiddleware, createStore } from 'redux';

type Options = {
  initialState: Object,
  platformDeps: Object,
  platformMiddleware: Array<Function>,
};

const configureStore = (options: Options) => {
  const {
    initialState,
    platformDeps = {},
    platformMiddleware = [],
  } = options;

  const reducer = configureReducer(initialState);

  const middleware = configureMiddleware(
    initialState,
    platformDeps,
    platformMiddleware
  );

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
  );

  // Enable hot reloading for reducers.
  if (module.hot) {
    const replaceReducer = configureReducer =>
      store.replaceReducer(configureReducer(initialState));

    if (initialState.device.isReactNative) {
      // TODO: Should be the same as non React Native.
      module.hot.accept(() => {
        replaceReducer(require('./configureReducer').default);
      });
    } else {
      module.hot.accept('./configureReducer', () => {
        replaceReducer(require('./configureReducer'));
      });
    }
  }

  return store;
};

export default configureStore;
