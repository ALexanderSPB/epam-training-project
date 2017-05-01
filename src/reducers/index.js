import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import institutions from '../common/ui/selectHOC/selectInstitution/institutions';
import groups from '../common/ui/selectHOC/selectGroup/groups';

export const rootReducer = combineReducers({
    routing: routerReducer,
    institutions,
    groups,
});
