import { applyMiddleware, createStore } from "redux";
import { createLogger } from 'redux-logger';
import thunkMiddleware from "redux-thunk";
import { verifyAuth } from "./actions/";
import rootReducer from "./reducers";

export default function configureStore(persistedState) {
    const store = createStore(
      rootReducer,
      persistedState,
      applyMiddleware(thunkMiddleware,createLogger({collapse: true}))
    );
    store.dispatch(verifyAuth());
    return store;
  }