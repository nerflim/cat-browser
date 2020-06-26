import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from '../redux/reducers/root.reducer';
import { rootSaga } from '../redux/sagas/root.saga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

let devToolsExtension = (f: any) => f;

if (
  process.env.NODE_ENV === 'development' &&
  (window as any).devToolsExtension
) {
  devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__();
}
// mount it on the Store
const store = createStore(
  reducer,
  compose(applyMiddleware(sagaMiddleware), devToolsExtension)
);

// then run the saga
sagaMiddleware.run(rootSaga);

export default store;
