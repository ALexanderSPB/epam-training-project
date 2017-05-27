import Firebase from '../../../../common/helpers/firebase';
import {PATHS} from '../../../../constants/database';
import {fetchEntities} from '../../../../constants/fetchEntityActions';
import {LOCATIONS} from '../../../../constants/fetchActionsTypes';

export const save = (data, institution, currentLocationIndex) => dispatch => {

    Firebase.push(`${PATHS.locations}${institution}/${currentLocationIndex}/rooms/`, data)
        .then(() => dispatch(fetchEntities(`${PATHS.locations}/${institution}`, LOCATIONS)));
};
