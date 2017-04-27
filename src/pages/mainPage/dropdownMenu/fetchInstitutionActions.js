import * as actionTypes from '../../../constants/fetchActionsTypes';

const INSTITUTIONS_URL = 'https://myschedule-1affb.firebaseio.com/institutions.json';

const receiveInstitutions = json => ({
    type: actionTypes.RECEIVE,
    payload: json,
});

const rejectInstitutions = error => ({
    type: actionTypes.REJECT,
    payload: error,
});

export const fetchInstitutions = () => dispatch => {
    return fetch(INSTITUTIONS_URL)
        .then(rawResponse => {
            const OK_STATUS_CODE = 200;
            if (rawResponse.status !== OK_STATUS_CODE) {
                throw new Error(rawResponse.status + ':' + rawResponse.statusText);
            }
            return rawResponse.json();
        })
        .then(json => dispatch(receiveInstitutions(json)))
        .catch(error => dispatch(rejectInstitutions(error)));
};
