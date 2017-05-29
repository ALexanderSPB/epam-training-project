import Firebase from '../../../common/helpers/firebase';
import {PATHS} from '../../../constants/database';
import {LOCATIONS} from '../../../constants/fetchActionsTypes';
import {fetchEntities} from '../../../constants/fetchEntityActions';

export const saveRoom = (room, reference, institutionId) => dispatch => {
    Firebase.set(reference, room).then(dispatch(fetchEntities(`${PATHS.locations}/${institutionId}`, LOCATIONS)));
};

export const removeRoom = (reference, institutionId) => dispatch => {
    Firebase.set(reference, null).then(dispatch(fetchEntities(`${PATHS.locations}/${institutionId}`, LOCATIONS)));
};

export const saveTime = (time, institutionId, locationId) => dispatch => {
    Firebase.set(`${PATHS.locations}${institutionId}/${locationId}/timing/`, time)
        .then(() => dispatch(fetchEntities(`${PATHS.locations}/${institutionId}`, LOCATIONS)));
};
