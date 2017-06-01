import Firebase from '../../common/helpers/firebase';
import {loginSuccess} from '../loginPage/loginActions';
import {browserHistory} from 'react-router';
import {fillHolesIn} from '../../common/helpers/arrays';
import {ROLE_MANAGER, ROLE_TEACHER} from '../../constants/roles';
import {
    REGISTRATION_LOCATIONS_RESPONSE,
    REGISTRATION_LOCATIONS_REQUEST,
    REGISTRATION_SUBMIT_RESPONSE,
    REGISTRATION_SUBMIT_REQUEST
} from './registrationPageActionTypes';

const locationsRequest = () => ({
    type: REGISTRATION_LOCATIONS_REQUEST
});

const locationsResponse = (locations) => ({
    type: REGISTRATION_LOCATIONS_RESPONSE,
    value: locations
});

const registrationSubmitRequest = () => ({
    type: REGISTRATION_SUBMIT_REQUEST,
});

const registrationSubmitResponse = () => ({
    type: REGISTRATION_SUBMIT_RESPONSE,
});


export const registrationSubmit = (data) => {
    return (dispatch) => {
        dispatch(registrationSubmitRequest());
        Firebase.signUp(data.email, data.password, data.name, data.location)
            .then(result => {
                browserHistory.push('/');
                dispatch(registrationSubmitResponse());
                dispatch(loginSuccess(result));
                switch (result.role) {
                    case ROLE_MANAGER:
                        browserHistory.push('/manager/location');
                        break;
                    case ROLE_TEACHER:
                        browserHistory.push('/teacher');
                        break;
                    default:
                        browserHistory.push('/');
                }
            })
            .catch(error => {
            // eslint-disable-next-line no-console
                console.error(error);
                browserHistory.push('/');
                browserHistory.push('/registration');
            });
    };
};

export const registrationGetLocations = () => (dispatch) => {
    dispatch(locationsRequest());
    Firebase.get('locations/')
        .then(locations => {
            const institutionIDs = Object.keys(locations);
            const allLocations = institutionIDs.reduce((allLocations, institutionID) => {
                const institutionLocations = fillHolesIn(locations[institutionID]).map(location => location === null ? null : ({
                    uuid: `${institutionID}_${location.name.replace(/\s+/g, '_')}`,
                    name: location.name,
                }));
                return [...allLocations, ...institutionLocations];
            }, [{uuid: 'no-inst_location', name: 'Another Location'}]);

            dispatch(locationsResponse(allLocations));
        })
        // eslint-disable-next-line no-console
        .catch(console.error);
};

