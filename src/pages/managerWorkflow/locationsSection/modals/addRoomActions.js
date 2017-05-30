import Firebase from '../../../../common/helpers/firebase';
import {PATHS} from '../../../../constants/database';
import {fetchEntities} from '../../../../constants/fetchEntityActions';
import {LOCATIONS} from '../../../../constants/fetchActionsTypes';

export const save = (rooms, institutionId, locationIndex) => dispatch => {
    Firebase.set(`${PATHS.locations}${institutionId}/${locationIndex}/rooms`, rooms)
        .then(dispatch(fetchEntities(`${PATHS.locations}/${institutionId}`, LOCATIONS)));
};
