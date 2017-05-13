import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import institutions from '../pages/mainPage/institutionAndGroupScheduleSelector/institutions';
import groups from '../pages/mainPage/institutionAndGroupScheduleSelector/groups';
import teachers from '../pages/teacherWorkflow/teachers';
import loginData from '../pages/loginPage/loginReducer';
import registrationSubmit from '../pages/registrationPage/registrationPageReducers';

export const rootReducer = combineReducers({
    routing: routerReducer,
    institutions,
    groups,
    teachers,
    loginData,
    registrationSubmit
});
