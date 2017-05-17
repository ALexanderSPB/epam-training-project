import Firebase from '../../../common/helpers/firebase';
import {PATHS} from '../../../constants/database';

export const NEW_SORT_OPTIONS = 'NEW_SORT_OPTIONS';
export const EVENTS_RESPONSE = 'EVENTS_RESPONSE';
export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const EDIT_EVENT_REQUEST = 'EDIT_EVENT_REQUEST';

const eventsResponse = (events) => ({
    type: EVENTS_RESPONSE,
    payload: events
});

const newSortOptions = (payload) => {
    return {
        type: NEW_SORT_OPTIONS,
        payload
    };
};

export const changeSortType = (newSortType, institutionUuid) => dispatch => {
    if (newSortType === 'teacher') {
        Firebase.get('users/')
            .then(users => {
                let filteredList =[];
                for (let user in users) {
                    if (users.hasOwnProperty(user) && users[user].institution === institutionUuid && users[user].role === 2) {
                        filteredList.push(users[user]);
                    }
                }
                dispatch(newSortOptions({
                    sortType: newSortType,
                    sortOptions: filteredList
                }));
            });
    }
    else {
        Firebase.get(newSortType + 's/' + institutionUuid)
            .then(sortOptions => dispatch(newSortOptions({
                sortType: newSortType,
                sortOptions: sortOptions
            })));
    }
};

export const getEvents = (institutionUuid, sortType, uuid) => dispatch => {
    Firebase.get(PATHS.events + institutionUuid).then(eventsList => {
        let filteredList = eventsList.filter((event) => {
            return event[sortType].uuid === uuid;
        });
        dispatch(eventsResponse(filteredList));
    });
};

export const createEventRequest = () => {
    return {
        type: CREATE_EVENT_REQUEST
    };
};

export const editEventRequest = (eventUuid) => {
    return {
        type: EDIT_EVENT_REQUEST,
        payload: eventUuid
    };
};
