import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import store from './services/store.service';

import Home from './pages/home';
import Cat from './pages/cat';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Container>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/:id" component={Cat} />
            </Switch>
          </Container>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
