import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLoggerMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import rootReducer from '../reducers';
import 'babel-polyfill';
import rootSagas from './rootSagas';

const initialState = Immutable.Map();

// ------------------------middleware setting start-------------------------

const saga = createSagaMiddleware();

const logger = createLoggerMiddleware({
  collapsed: true,
  stateTransformer: state => state.toJS(),
});

let middlewares = [
  saga,
  thunk,
];

if (process.env.NODE_ENV !== 'production') {
  middlewares = [...middlewares, logger];
}

// ------------------------middleware setting end-------------------------

// use redux devtool extension in chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers( applyMiddleware(...middlewares) ),
);

store.runSaga = saga.run(rootSagas);

export default store;
