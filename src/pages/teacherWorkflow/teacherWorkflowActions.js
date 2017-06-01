import Firebase from '../../common/helpers/firebase';
import {PATHS} from '../../constants/database';

export const EVENTS_RESPONSE = 'EVENTS_RESPONSE';
export const INSTITUTION_RESPONSE = 'INSTITUTION_RESPONSE';

const eventsResponse = (events) => ({
    type: EVENTS_RESPONSE,
    payload: events
});

const instituttionsResponse = (events) => ({
    type: INSTITUTION_RESPONSE,
    payload: events
});

export const getEvents = (institution, uuid) => dispatch => {
    Firebase.get(PATHS.events)
        .then(events => {
            const teacherEvents = [];
            events[institution]
                .filter(event => event.teacher.uuid === uuid)
                .forEach(event => {
                    teacherEvents.push(event);
                });
            return teacherEvents;
        })
        .then(events => dispatch(eventsResponse(events)));
    Firebase.get(PATHS.institutions)
        .then(institutions => dispatch(instituttionsResponse(institutions.find(inst => inst.uuid === institution).timing)));
};
