import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import institutions from '../common/ui/institutionAndGroupScheduleSelector/institutions';
import groups from '../common/ui/institutionAndGroupScheduleSelector/groups';
import teachers from '../common/ui/institutionAndGroupScheduleSelector/teachers';
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
