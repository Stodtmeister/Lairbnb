import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import logger from "redux-logger";


const rootReducer = combineReducers({
  // add reducer functions here
});

// let enhancer;

// if (process.env.NODE_ENV === "production") {
//   enhancer = applyMiddleware(thunk);
// } else {
//   const logger = require("redux-logger").default;
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// }
const preloadedState = {}
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState
})

// const configureStore = (preloadedState) => {
//   return createStore(rootReducer, preloadedState, enhancer);
// };

export default store;
