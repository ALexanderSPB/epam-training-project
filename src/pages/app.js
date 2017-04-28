import React from 'react';
import { Router } from 'react-router';
import Header from '../common/parts/header';
import Footer from '../common/parts/footer';
import { routes } from '../constants/routes';
import { history } from '../index';


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
};

export default App;