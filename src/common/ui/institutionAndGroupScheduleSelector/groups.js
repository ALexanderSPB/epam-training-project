import {GROUPS} from '../../../constants/fetchActionsTypes';

const initialState = {};

export default function institutions(state = initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case GROUPS.RECEIVE:
            return Object.assign(state, payload);

        case GROUPS.REJECT:
            // eslint-disable-next-line no-console
            console.error(`Groups can't be loaded due to: ${payload}`);
            return state;

        default:
            return state;
    }
}
