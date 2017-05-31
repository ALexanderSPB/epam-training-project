import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import institutions from '../pages/mainPage/institutionAndGroupScheduleSelector/institutions';
import groups from '../pages/mainPage/institutionAndGroupScheduleSelector/groups';
import teachers from '../pages/teacherWorkflow/teachers';
import skills from '../pages/managerWorkflow/teacherSection/skills';
import loginData from '../pages/loginPage/loginReducer';
import locations from '../pages/managerWorkflow/locationsSection/locations';
import registration from '../pages/registrationPage/registrationPageReducers';
import schedule from '../pages/managerWorkflow/scheduleSection/scheduleReducer';

export const rootReducer = combineReducers({
    routing: routerReducer,
    institutions,
    groups,
    teachers,
    skills,
    loginData,
    registration,
    schedule,
    locations
});
