import React from 'react';
import {IndexRoute, Route} from 'react-router';

import App from '../pages/app';
import MainPage from '../pages/mainPage/mainPage';
import LoginPage from '../pages/loginPage/loginPage';
import RegistrationPage from '../pages/registrationPage/registrationPage';
import FaqPage from '../pages/faqPage/faqPage';
import TeacherWorkflow from '../pages/teacherWorkflow/teacherWorkflow';
import NotFound from '../pages/notFound/notFound';

export const ROUTE_PATHS = {
    root: '/',
    login: 'login',
    registration: 'registration',
    faq: 'faq',
    teacher: 'teacher',
    notFound: '*'
};

export const routes = (
    <Route path={ROUTE_PATHS.root} component={ App }>
        <IndexRoute component={ MainPage } />
        <Route path={ROUTE_PATHS.login} component={ LoginPage } />
        <Route path={ROUTE_PATHS.registration} component={ RegistrationPage } />
        <Route path={ROUTE_PATHS.faq} component={ FaqPage } />
        <Route path={ROUTE_PATHS.teacher} component={ TeacherWorkflow } />
        <Route path={ROUTE_PATHS.notFound} component={ NotFound } />
    </Route>
);
