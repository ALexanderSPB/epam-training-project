import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import institutions from '../common/ui/selectInstitution/institutions';
import groups from '../common/ui/selectGroup/groups';

export const rootReducer = combineReducers({
    routing: routerReducer,
    institutions,
    groups,
});
