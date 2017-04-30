import {REJECT_INSTITUTIONS, RECEIVE_INSTITUTIONS} from '../../../constants/fetchActionsTypes';
import {OK_STATUS_CODE} from '../../../constants/constants';

const INSTITUTIONS_URL = 'https://myschedule-1affb.firebaseio.com/institutions.json';

const receiveInstitutions = json => ({
    type: RECEIVE_INSTITUTIONS,
    payload: json,
});

const rejectInstitutions = error => ({
    type: REJECT_INSTITUTIONS,
    payload: error,
});

export const fetchInstitutions = () => dispatch => {
    return fetch(INSTITUTIONS_URL)
        .then(rawResponse => {
            if (rawResponse.status !== OK_STATUS_CODE) {
                throw new Error(rawResponse.status + ':' + rawResponse.statusText);
            }
            return rawResponse.json();
        })
        .then(json => dispatch(receiveInstitutions(json)))
        .catch(error => dispatch(rejectInstitutions(error)));
};
