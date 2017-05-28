import Firebase from '../../../../common/helpers/firebase';
import {PATHS} from '../../../../constants/database';
import {getEvents} from '../../../../pages/managerWorkflow/scheduleSection/scheduleActions';

export const save = (data, institution, currentEventIndex) => dispatch => {

    Firebase.set(PATHS.events + (institution || 'inst0') + '/' + currentEventIndex, data) //tmp test string 'inst0'
        .then(() => {
            dispatch(getEvents(institution || 'inst0','group', data.group.uuid));
        });
};
