import React from 'react';
import { Router } from 'react-router';
//import Header from '../common/parts/header'; //we don't have this component in repo, do we?
//import Footer from '../common/parts/footer'; //same
import { routes } from '../constants/routes';
import { history } from '../index';
import './style.css';


const App = () => {
    return (
        <div className="container-fluid">
            <div>Header</div>
            <Router history={history}>
                {routes}
            </Router>
            <div>Footer</div>
        </div>
    );
};

export default App;