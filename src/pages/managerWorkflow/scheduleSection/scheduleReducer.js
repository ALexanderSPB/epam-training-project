import * as actionTypes from './scheduleActions';

const initialState = {};

export default function schedule(state = initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case actionTypes.NEW_SORT_OPTIONS:
            return {
                ...state,
                sortType: payload.sortType,
                sortOptions: payload.sortOptions
            };
        case actionTypes.EVENTS_RESPONSE:
            return {
                ...state,
                events: payload
            };
        case actionTypes.LIST_RECEIVED:
            return {
                ...state,
                lists: {
                    ...state.lists,
                    [action.field]: payload
                }
            };
        case actionTypes.ADD_EVENT:
            if (!state.events) state.events = [];
            return {
                ...state,
                events: [...state.events, payload]
            }
        default:
            return state;
    }
}
