import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading: React.FC = () => {
  return (
    <div className="page-loading-container">
      <div className="page-loading">
        <div>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        </div>
        Loading...
      </div>
    </div>
  );
};

export default Loading;
