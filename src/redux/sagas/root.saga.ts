import { takeEvery } from 'redux-saga/effects';
import { getBreedsAsync, getBreedAsync, getCatAsync } from './cat.saga';

export function* rootSaga() {
  yield takeEvery('GET_BREEDS_ASYNC', getBreedsAsync);
  yield takeEvery('GET_BREED_ASYNC', getBreedAsync);
  yield takeEvery('GET_CAT_ASYNC', getCatAsync);
}
