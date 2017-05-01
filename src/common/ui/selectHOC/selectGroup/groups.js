import {RECEIVE_GROUPS, REJECT_GROUPS} from '../../../../constants/fetchActionsTypes';

const initialState = {};

export default function institutions(state = initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case RECEIVE_GROUPS:
            return Object.assign(state, payload);

        case REJECT_GROUPS:
            console.error(`Institutions can't be loaded due to: ${payload}`);
            return state;

        default:
            return state;
    }
}