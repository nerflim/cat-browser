import { httpClient } from './httpClient';
import { Paging } from '../redux/reducers/cat.reducer';

export const getBreeds = (): Promise<any> =>
  httpClient.get('/breeds').then(({ data }) => data);

export const getBreed = (params: Paging): Promise<any> => {
  console.log(params);
  return httpClient
    .get('/images/search', {
      params,
    })
    .then(({ data }) => data);
};

export const getCat = (id: string): Promise<any> => {
  return httpClient.get(`/images/${id}`).then(({ data }) => data);
};
