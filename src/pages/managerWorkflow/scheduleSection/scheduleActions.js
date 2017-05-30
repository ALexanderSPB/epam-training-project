import Firebase from '../../../common/helpers/firebase';
import {PATHS} from '../../../constants/database';

export const NEW_SORT_OPTIONS = 'NEW_SORT_OPTIONS';
export const EVENTS_RESPONSE = 'EVENTS_RESPONSE';
export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const EDIT_EVENT_REQUEST = 'EDIT_EVENT_REQUEST';
export const ADD_EVENT = 'ADD_EVENT';

export const LIST_RECEIVED = 'LIST_RECEIVED';

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

const listReceived = (field, payload) => {
    return {
        type: LIST_RECEIVED,
        field,
        payload
    };
};

const filterUsersByRole = (users, institutionUuid, role) => {
    let filteredList =[];
    for (let user in users) {
        if (users.hasOwnProperty(user) && users[user].institution === institutionUuid && users[user].role === role) {
            filteredList.push(users[user]);
        }
    }
    return filteredList;
};

export const changeSortType = (newSortType, institutionUuid) => dispatch => {
    if (newSortType === 'teacher') {
        Firebase.get(PATHS.users)
            .then(users => {
                dispatch(newSortOptions({
                    sortType: newSortType,
                    sortOptions: filterUsersByRole(users, institutionUuid, 2)
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

export const loadSelectsOptions = (institutionUuid) => dispatch => {
    Firebase.get(PATHS.users)
        .then(users => {
            dispatch(listReceived('teachers', filterUsersByRole(users, institutionUuid, 2)));
        });
    Firebase.get(PATHS.locations + institutionUuid)
        .then(
            locations => {
                dispatch(listReceived('locations', locations));
            }
        );
    Firebase.get(PATHS.groups + institutionUuid)
        .then(
            groups => {
                dispatch(listReceived('groups', groups));
            }
        );
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

export const addEvent = (event, institution) => {
    Firebase.push(`${PATHS.events}${institution}/`, event)
    return {
        type: ADD_EVENT,
        payload: event
    }
}
