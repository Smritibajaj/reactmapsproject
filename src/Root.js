import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './configureStore';
import App from './App';
const store= configureStore();

function Root() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </div>
  );
}

export default Root;
