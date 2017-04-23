import * as actionTypes from "../../constants/fetchActionsTypes";

const INSTITUTIONS_URL = 'https://myschedule-1affb.firebaseio.com/institutions.json';

const receiveInstitutions = json => ({
    type: actionTypes.receive,
    payload: json,
});

const rejectInstitutions = error => ({
    type: actionTypes.reject,
    payload: error,
});

export const fetchInstitutions = () => dispatch => {
    return fetch(INSTITUTIONS_URL)
        .then(rawResponse => {
            if (rawResponse.status !== 200) {
                throw new Error(rawResponse.status + ':' + rawResponse.statusText);
            }
            return rawResponse.json();
        })
        .then(json => dispatch(receiveInstitutions(json)))
        .catch(error => dispatch(rejectInstitutions(error)));
};
