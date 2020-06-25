import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Col, Row, Button, Spinner } from 'react-bootstrap';
import {
  CatState,
  ActiveBreed,
  Paging,
} from '../../redux/reducers/cat.reducer';
import CatItem from './catItem';
import Loading from '../../components/loading';

interface Props {
  getBreedsAsync: () => void;
  getBreedAsync: (e: any) => void;
  setActiveBreed: (e: ActiveBreed) => void;
  cat: CatState;
}

const Home: React.FC<Props> = ({
  getBreedsAsync,
  getBreedAsync,
  setActiveBreed,
  cat,
}) => {
  const { breeds } = cat;

  const onSelectBreed = (e: any) => {
    const breed = breeds.find((item: any) => item.id === e.target.value);
    const activeBreed: ActiveBreed = {
      cat_id: '',
      name: (breed && breed.name) || '',
      origin: (breed && breed.origin) || '',
      temperament: (breed && breed.temperament) || '',
      description: (breed && breed.description) || '',
      data: [],
    };
    const paging: Paging = {
      page: 1,
      limit: 10,
      breed_id: e.target.value,
    };
    if (e.target.value) {
      return getBreedAsync({
        payload: { activeBreed, paging, currentData: [] },
      });
    }
    setActiveBreed({ ...activeBreed, data: [] });
  };

  const loadMore = () => {
    const { activeBreed, paging } = cat;
    return getBreedAsync({
      payload: { activeBreed, paging: { ...paging, page: paging.page + 1 } },
    });
  };

  useEffect(() => {
    getBreedsAsync();
  });

  return (
    <Fragment>
      {cat.loading.page ? (
        <Loading />
      ) : (
        <div className="my-5">
          <h1>Cat Browser</h1>
          <Form noValidate onSubmit={(e: any) => e.preventDefault()}>
            <Form.Row>
              <Form.Group as={Col} md="3">
                <Form.Label>Breed</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  defaultValue=""
                  placeholder="Select Breed"
                  onChange={onSelectBreed}
                >
                  <option value="">Select Breed</option>
                  {breeds.map((breed: any) => (
                    <option key={breed.id} value={breed.id}>
                      {breed.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Form>
          <hr />
          {!cat.activeBreed.data.length ? (
            <p className="text-center">No cats available</p>
          ) : (
            <React.Fragment>
              <Row>
                {cat.activeBreed.data.map((item: any) => (
                  <Col sm={3} key={item.id}>
                    <CatItem cat={item} />
                  </Col>
                ))}
              </Row>
              {cat.activeBreed.data.length >=
              cat.paging.page * cat.paging.limit ? (
                <div className="mt-3">
                  <Button variant="success" block onClick={loadMore}>
                    {cat.loading.breeds ? (
                      <Fragment>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />{' '}
                        <span className="ml-2">Loading...</span>
                      </Fragment>
                    ) : (
                      'Load More...'
                    )}
                  </Button>
                </div>
              ) : (
                <p className="text-center mt-5">All cats have been loaded.</p>
              )}
            </React.Fragment>
          )}
        </div>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state: any) => ({
  cat: state.cat,
});

const mapDispatchToProps = (dispatch: any) => ({
  getBreedsAsync: () => dispatch({ type: 'GET_BREEDS_ASYNC' }),
  getBreedAsync: (payload: any) =>
    dispatch({ type: 'GET_BREED_ASYNC', payload }),
  setActiveBreed: (payload: ActiveBreed) =>
    dispatch({ type: 'SET_ACTIVE_BREED', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
