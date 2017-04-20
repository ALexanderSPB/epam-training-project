import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import Header from '../common/pageParts/header';
import Footer from '../common/pageParts/footer';
import MainPage from './pages/mainPage/mainPage';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <div className="container">
            <Header />
            <Router history={history}>
                <Route path='/' component={MainPage}>
                </Route>
            </Router>
            <Footer />
        </div>
    </Provider>,
    document.getElementById('root')
);
