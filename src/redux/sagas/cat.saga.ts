import { call, put } from 'redux-saga/effects';
import { getBreeds, getBreed, getCat } from '../../services/cat.service'; // app specific
import { SagaIterator } from 'redux-saga';
import { Breed } from '../reducers/cat.reducer';

interface Payload {
  type: string;
  payload: any;
}

export function* getBreedsAsync(): SagaIterator<void> {
  yield put({ type: 'SET_LOADING', payload: { type: 'page', value: true } });

  const data = yield call(getBreeds);
  yield put({ type: 'SET_BREEDS', payload: data });

  yield put({ type: 'SET_LOADING', payload: { type: 'page', value: false } });
}

export function* getBreedAsync({ payload }: Payload) {
  const { paging, activeBreed } = payload.payload;
  yield put({ type: 'SET_LOADING', payload: { type: 'breeds', value: true } });

  const data = yield call(getBreed, {
    ...paging,
    size: 'small',
  });

  const breeds = data.filter(
    (item: any) =>
      !activeBreed.data
        .map((breedItem: Breed) => breedItem.id)
        .includes(item.id)
  );

  // set paging
  yield put({
    type: 'SET_PAGING',
    payload: paging,
  });

  // set active breed
  yield put({
    type: 'SET_ACTIVE_BREED',
    payload: { ...activeBreed, data: [...activeBreed.data, ...breeds] },
  });

  yield put({ type: 'SET_LOADING', payload: { type: 'breeds', value: false } });
}

export function* getCatAsync({ payload }: Payload) {
  yield put({ type: 'SET_LOADING', payload: { type: 'page', value: true } });

  const data = yield call(getCat, payload);
  yield put({ type: 'SET_CAT', payload: data });

  yield put({ type: 'SET_LOADING', payload: { type: 'page', value: false } });
}
