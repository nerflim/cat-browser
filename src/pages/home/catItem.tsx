import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Props {
  cat: any;
}

const CatItem: React.FC<Props> = ({ cat }) => {
  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={cat.url} />
      <Card.Body>
        <Link to={`/${cat.id}`}>
          <Button variant="primary" block>
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CatItem;
