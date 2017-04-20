import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import Header from '../common/pageParts/header';
import Footer from '../common/pageParts/footer';
import LoginPage from './pages/loginPage/loginPage';
import configureStore from './store/configureStore';
import './index.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <div className="container">
            <Header />
            <Router history={history}>
                <Route path='login' component={LoginPage} />
            </Router>
            <Footer />
        </div>
    </Provider>,
    document.getElementById('root')
);
