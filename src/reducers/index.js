import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import institutions from '../common/ui/selectLocation/institutions';
import loginData from '../pages/loginPage/loginReducer';

export const rootReducer = combineReducers({
    routing: routerReducer,
    institutions,
    loginData
});
