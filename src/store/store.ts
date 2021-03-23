import { createStore, applyMiddleware } from 'redux';
import appReducer from './app/app-reducer';

const store = createStore(appReducer, applyMiddleware());

export default store;
