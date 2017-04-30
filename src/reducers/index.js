import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import loginData from '../pages/loginPage/loginReducer';
import institutions from '../common/ui/selectInstitution/institutions';

export const rootReducer = combineReducers({
    routing: routerReducer,
    institutions,
    loginData
});
