import { combineReducers } from 'redux';
import cat from './cat.reducer';

interface Reducer {
  cat: any;
}

const reducers: Reducer = { cat };

export default combineReducers(reducers);
