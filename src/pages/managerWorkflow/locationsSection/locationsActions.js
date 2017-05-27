import Firebase from '../../../common/helpers/firebase';
import { PATHS } from '../../../constants/database';

export const LOCATIONS_RESPONSE = 'LOCATIONS_RESPONSE';
export const SELECT_LOCATION = 'SELECT_LOCATION';
export const UPDATE_TIME = 'UPDATE_TIME';

const locationsResponse = (locations) => ({
    type: LOCATIONS_RESPONSE,
    payload: locations
});

export const selectLocation = (location) => ({
    type: SELECT_LOCATION,
    payload: location
});

export const saveTime = (time, institutionId, locationId) => dispatch => {
    Firebase.set(`${PATHS.locations}${institutionId}/${locationId}/timing/`, time)
        .then(() => dispatch(locationsRequest(institutionId)));
};

export const locationsRequest = (institutionId) => dispatch => {
    Firebase.get(PATHS.locations + institutionId)
        .then(locations => dispatch(locationsResponse(locations)));
};
