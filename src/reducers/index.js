import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import institutions from '../pages/mainPage/institutionAndGroupScheduleSelector/institutions';
import groups from '../pages/mainPage/institutionAndGroupScheduleSelector/groups';
import teachers from '../pages/teacherWorkflow/teachers';
import loginData from '../pages/loginPage/loginReducer';
import locationsSection from '../pages/managerWorkflow/locationsSection/locationsReducer';
import registrationSubmit from '../pages/registrationPage/registrationPageReducers';
import schedule from '../pages/managerWorkflow/scheduleSection/scheduleReducer';

export const rootReducer = combineReducers({
    routing: routerReducer,
    institutions,
    groups,
    teachers,
    loginData,
    registrationSubmit,
    schedule,
    locationsSection
});
