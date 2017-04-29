import * as actionTypes from '../../../constants/fetchActionsTypes';
import Firebase from '../../helpers/firebase';
import { PATHS } from '../../../constants/database';

const receiveInstitutions = list => ({
    type: actionTypes.RECEIVE,
    payload: list,
});

const rejectInstitutions = error => ({
    type: actionTypes.REJECT,
    payload: error,
});

export const fetchInstitutions = () => dispatch => {
    return Firebase.get(PATHS.institutions)
        .then(institutionList => dispatch(receiveInstitutions(institutionList)))
        .catch(error => dispatch(rejectInstitutions(error)));
};
