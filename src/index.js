import React from 'react';
import ReactDOM from 'react-dom';
import App from './MainPage/App';
import configureStore from './store/configureStore';
import { Router, Route, browserHistory } from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import { Provider } from 'react-redux';
import './index.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory,store);

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={App}>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('root')
);
