import Firebase from '../../../../common/helpers/firebase';
import {PATHS} from '../../../../constants/database';
import {locationsRequest} from '../locationsActions';

export const save = (data, institution, currentLocationIndex) => dispatch => {

    Firebase.push(PATHS.locations + institution + '/' + currentLocationIndex + '/rooms/', data)
        .then(() => {
            dispatch(locationsRequest(institution));
        });
};
