import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../pages/app';
import MainPage from '../pages/mainPage/mainPage';
import LoginPage from '../pages/loginPage/loginPage';

export const routes = (
    <Route path="/" component={ App }>
        <IndexRoute component={ MainPage } />
        <Route path="login" component={ LoginPage } />
    </Route>
);