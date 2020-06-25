import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { CatInterface, Breed } from '../../redux/reducers/cat.reducer';
import Loading from '../../components/loading';

interface Props {
  history: any;
  match: any;
  getCatAsync: (id: string) => void;
  cat: CatInterface;
  loading: boolean;
}

const Cat: React.FC<Props> = ({
  history,
  match,
  getCatAsync,
  cat,
  loading,
}) => {
  useEffect(() => {
    getCatAsync(match.params.id);
  }, []);

  const breed: Breed = cat.breeds.length
    ? cat.breeds[0]
    : {
        id: '',
        name: '',
        origin: '',
        temperament: '',
        description: '',
      };

  const backHandler = () => history.goBack();

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="my-5">
          <Button variant="primary" onClick={backHandler}>
            Go Back
          </Button>
          <Card className="my-3">
            <Card.Img variant="top" src={cat.url} />
            <Card.Body>
              <Card.Title>{breed.name}</Card.Title>
              <Card.Text>
                <strong>Origin:</strong> {breed.origin}
              </Card.Text>
              <Card.Text>
                <em>{breed.temperament}</em>
              </Card.Text>
              <Card.Text>{breed.description}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  cat: state.cat.cat,
  loading: state.cat.loading.page,
});

const mapDispatchToProps = (dispatch: any) => ({
  getCatAsync: (payload: string) =>
    dispatch({ type: 'GET_CAT_ASYNC', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cat);
