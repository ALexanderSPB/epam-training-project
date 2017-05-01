import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import institutions from '../common/ui/selectHOC/institutions';
import groups from '../common/ui/selectHOC/groups';

export const rootReducer = combineReducers({
    routing: routerReducer,
    institutions,
    groups,
});
