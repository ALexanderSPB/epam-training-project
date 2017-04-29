import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import institutions from '../common/ui/selectLocation/institutions';

export const rootReducer = combineReducers({
    routing: routerReducer,
    institutions,
});
