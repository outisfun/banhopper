import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import BarsProvider from './providers/BarsProvider';
import UserProvider from './providers/UserProvider';

import './index.scss';

import App from './App';
import * as serviceWorker from './serviceWorker';

render(
  <Router>
    <UserProvider>
      <BarsProvider>
        <App />
      </BarsProvider>
    </UserProvider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
