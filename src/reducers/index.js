import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import institutions from '../common/ui/institutionAndGroupScheduleSelector/institutions';
import groups from '../common/ui/institutionAndGroupScheduleSelector/groups';
import loginData from '../pages/loginPage/loginReducer';
import registrationSubmit from '../pages/registrationPage/registrationPageReducers';
import schedule from '../pages/managerWorkflow/scheduleSection/scheduleReducer';

export const rootReducer = combineReducers({
    routing: routerReducer,
    institutions,
    groups,
    loginData,
    registrationSubmit,
    schedule
});
