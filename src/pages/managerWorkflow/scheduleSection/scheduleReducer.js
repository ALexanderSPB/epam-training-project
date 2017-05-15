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
        default:
            return state;
    }
}
