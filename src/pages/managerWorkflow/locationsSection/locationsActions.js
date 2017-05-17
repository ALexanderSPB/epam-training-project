import Firebase from '../../../common/helpers/firebase';
import { PATHS } from '../../../constants/database';

export const LOCATIONS_RESPONSE = 'LOCATIONS_RESPONSE';

const locationsResponse = (locations) => ({
    type: LOCATIONS_RESPONSE,
    payload: locations
});

export const locationsRequest = (institutionId) => dispatch => {
    Firebase.get(PATHS.locations + institutionId)
        .then(locations => {
            dispatch(locationsResponse(locations));
        });
};
