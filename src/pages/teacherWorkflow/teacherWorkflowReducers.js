import * as actionTypes from './teacherWorkflowActions';

const initialState = {};

export default function teacherEvents(state = initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case actionTypes.EVENTS_RESPONSE:
            return {
                ...state,
                events: payload
            };
        case actionTypes.INSTITUTION_RESPONSE:
            return {
                ...state,
                institution: payload
            };
        default:
            return state;
    }
}
