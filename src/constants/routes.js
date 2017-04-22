import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../pages/app';
import MainPage from '../pages/mainPage/mainPage';

export const routes = (
    <Route path="/" component={ App }>
        <IndexRoute component={ MainPage } />
    </Route>
);