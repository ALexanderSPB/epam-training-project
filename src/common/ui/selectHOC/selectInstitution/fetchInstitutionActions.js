import {REJECT_INSTITUTIONS, RECEIVE_INSTITUTIONS} from '../../../../constants/fetchActionsTypes';
import Firebase from '../../../helpers/firebase';
import {PATHS} from '../../../../constants/database';

const receiveInstitutions = json => ({
    type: RECEIVE_INSTITUTIONS,
    payload: json,
});

const rejectInstitutions = error => ({
    type: REJECT_INSTITUTIONS,
    payload: error,
});

export const fetchInstitutions = () => dispatch => {
    return Firebase.get(PATHS.institutions)
        .then(institutionList => dispatch(receiveInstitutions(institutionList)))
        .catch(error => dispatch(rejectInstitutions(error)));
};
