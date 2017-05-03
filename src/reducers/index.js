import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import institutions from '../common/ui/institutionAndGroupScheduleSelector/institutions';
import groups from '../common/ui/institutionAndGroupScheduleSelector/groups';
import loginData from '../pages/loginPage/loginReducer';

export const rootReducer = combineReducers({
    routing: routerReducer,
    institutions,
    groups,
    loginData
});
