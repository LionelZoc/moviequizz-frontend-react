import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

import rootReducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();
export default function configureStore(preloadedState) {
  //const middlewares = [apiCallsMiddleware, loggerMiddleware, thunkMiddleware.withExtraArgument(getFirestore), routerMiddleware(history)];
  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  let enhancers;
  //
  enhancers = [middlewareEnhancer];

  const composedEnhancers = composeWithDevTools(...enhancers);
  //const composedEnhancers = compose(...enhancers);
  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  // then run the saga
  sagaMiddleware.run(rootSaga);

  return store;
}
