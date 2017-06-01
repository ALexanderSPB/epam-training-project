import Firebase from '../../../../common/helpers/firebase';
import {PATHS} from '../../../../constants/database';
import {getEvents} from '../../../../pages/teacherWorkflow/teacherWorkflowActions';
import {EVENTS} from '../../../../constants/fetchActionsTypes';

export const cancel = (event, institution, loginUuid) => dispatch => {
    Firebase.get(PATHS.events)
        .then(events => events[institution].findIndex(element => element.uuid === event.uuid)
        )
        .then(currentEventIndex => {
            Firebase.set(PATHS.events + (institution || 'inst0') + '/' + currentEventIndex, event);
            return currentEventIndex;
        })
        .then(currentEventIndex =>
            dispatch(getEvents(institution, loginUuid )));
};
