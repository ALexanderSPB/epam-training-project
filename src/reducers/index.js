import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import institutions from '../pages/mainPage/dropdownMenu/institutions';

export const rootReducer = combineReducers({
    routing: routerReducer,
    institutions,
});
