import {REJECT_GROUPS, RECEIVE_GROUPS} from '../../../constants/fetchActionsTypes';
import Firebase from '../../helpers/firebase';
import {PATHS} from '../../../constants/database';

const receiveGroups = json => ({
    type: RECEIVE_GROUPS,
    payload: json,
});

const rejectGroups = error => ({
    type: REJECT_GROUPS,
    payload: error,
});

export const fetchGroups = () => dispatch => {
    return Firebase.get(PATHS.groups)
        .then(groupsList => dispatch(receiveGroups(groupsList)))
        .catch(error => dispatch(rejectGroups(error)));
};
