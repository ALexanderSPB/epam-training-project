import Firebase from '../../../../common/helpers/firebase';
import {fetchEntities} from '../../../../constants/fetchEntityActions';
import {LOCATIONS} from '../../../../constants/fetchActionsTypes';

export const save = (data, reference, redirectTo) => dispatch => {
    Firebase.set(reference, data)
        .then(dispatch(fetchEntities(reference, LOCATIONS)))
        .then(redirectTo);
};
