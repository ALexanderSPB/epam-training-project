import React from 'react';
import {IndexRoute, Route} from 'react-router';

import App from '../pages/app';
import MainPage from '../pages/mainPage/mainPage';
import LoginPage from '../pages/loginPage/loginPage';
import RegistrationPage from '../pages/registrationPage/registrationPage';
import FaqPage from '../pages/faqPage/faqPage';
import TeacherWorkflow from '../pages/teacherWorkflow/teacherWorkflow';
import ManagerWorkflow from '../pages/managerWorkflow/managerWorkflow';
import LocationSection from '../pages/managerWorkflow/locationsSection/locationsSection';
import NotFound from '../pages/notFound/notFound';
import Sidebar from '../pages/managerWorkflow/sidebar/sidebar';
import Workflow from '../pages/managerWorkflow/workflow';

export const ROUTE_PATHS = {
    root: '/',
    login: 'login',
    registration: 'registration',
    faq: 'faq',
    teacher: 'teacher',
    manager: 'manager',
    managerLocation: 'location',
    managerTeacher: 'teacher',
    managerSchedule: 'schedule',
    notFound: '*'
};

export const routes = (
    <Route path={ROUTE_PATHS.root} component={ App }>
        <IndexRoute component={ MainPage }/>
        <Route path={ROUTE_PATHS.login} component={ LoginPage }/>
        <Route path={ROUTE_PATHS.registration} component={ RegistrationPage }/>
        <Route path={ROUTE_PATHS.faq} component={ FaqPage }/>
        <Route path={ROUTE_PATHS.teacher} component={ TeacherWorkflow }/>
        <Route path={ROUTE_PATHS.manager} component={ ManagerWorkflow }>
            <Route path={ROUTE_PATHS.managerLocation} components={{sidebar: Sidebar, workflow: LocationSection}}/>
            <Route path={ROUTE_PATHS.managerTeacher} components={{sidebar: Sidebar, workflow: Workflow}}/>
            <Route path={ROUTE_PATHS.managerSchedule} components={{sidebar: Sidebar, workflow: Workflow}}/>
        </Route>
        <Route path={ROUTE_PATHS.notFound} component={ NotFound }/>
    </Route>
);
