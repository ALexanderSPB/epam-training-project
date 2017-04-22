import React from 'react';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import Header from '../common/parts/header';
import Footer from '../common/parts/footer';
import { routes } from '../constants/routes';

const history = syncHistoryWithStore(browserHistory, store);

const App = () => {
    return (
        <div className="container">
            <Header />
            <Router history={history}>
                {routes}
            </Router>
            <Footer />
        </div>
    );
}

export default App;