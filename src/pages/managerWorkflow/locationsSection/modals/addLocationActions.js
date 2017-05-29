import Firebase from '../../../../common/helpers/firebase';
import {PATHS} from '../../../../constants/database';
import {fetchEntities} from '../../../../constants/fetchEntityActions';
import {LOCATIONS} from '../../../../constants/fetchActionsTypes';

export const save = (data, currentInstitutionIndex) => dispatch => {
    Firebase.push(`${PATHS.locations}/${currentInstitutionIndex}/`, data)
        .then(() => dispatch(fetchEntities(`${PATHS.locations}`, LOCATIONS)));
};
