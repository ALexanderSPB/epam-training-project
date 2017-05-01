import {INSTITUTIONS} from '../../../constants/fetchActionsTypes';

const initialState = [];

export default function institutions(state = initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case INSTITUTIONS.RECEIVE:
            return Object.assign(state, payload);

        case INSTITUTIONS.REJECT:
            console.error(`Institutions can't be loaded due to: ${payload}`);
            return state;

        default:
            return state;
    }
}