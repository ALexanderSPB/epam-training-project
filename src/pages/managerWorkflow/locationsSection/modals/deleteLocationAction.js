import Firebase from '../../../../common/helpers/firebase';
import {PATHS} from '../../../../constants/database';
import {fetchEntities} from '../../../../constants/fetchEntityActions';
import {LOCATIONS} from '../../../../constants/fetchActionsTypes';

export const deleteLocation = (institution, currentLocationIndex) => dispatch => {
    Firebase.set(`${PATHS.locations}${institution}/${currentLocationIndex}`, null)
        .then(() => dispatch(fetchEntities(`${PATHS.locations}/${institution}`, LOCATIONS)));
    console.log('Deleted location on: ', `${PATHS.locations}${institution}/${currentLocationIndex}`);
};
