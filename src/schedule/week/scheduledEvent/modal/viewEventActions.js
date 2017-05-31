import Firebase from '../../../../common/helpers/firebase';
import {PATHS} from '../../../../constants/database';
import {getEvents} from '../../../../pages/managerWorkflow/scheduleSection/scheduleActions';

export const cancel = (event, institution) => dispatch => {
    Firebase.get(PATHS.events)
        .then(events => {
            let currentEventIndex = events[institution].findIndex(element => element.uuid === event.uuid);
            return currentEventIndex;
        })
        .then(currentEventIndex => {
            Firebase.set(PATHS.events + (institution || 'inst0') + '/' + currentEventIndex, event);
        });
};
