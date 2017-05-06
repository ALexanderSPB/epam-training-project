import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../pages/app';
import MainPage from '../pages/mainPage/mainPage';
import LoginPage from '../pages/loginPage/loginPage';
import RegistrationPage from '../pages/registrationPage/registrationPage';

export const ROUTE_PATHS = {
    root: '/',
    login: 'login'
};

export const routes = (
    <Route path="/" component={ App }>
        <IndexRoute component={ MainPage } />
        <Route path={ROUTE_PATHS.login} component={ LoginPage } />
        <Route path="registration" component={ RegistrationPage } />
    </Route>
);