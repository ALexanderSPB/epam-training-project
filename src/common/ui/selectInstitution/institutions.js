import {RECEIVE_INSTITUTIONS, REJECT_INSTITUTIONS} from '../../../constants/fetchActionsTypes';

class Institution {
    constructor(institution) {
        Object.assign(this, institution)
    }
}

const initialState = [];

export default function institutions(state = initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case RECEIVE_INSTITUTIONS:
            return payload.map(inst => new Institution(inst));

        case REJECT_INSTITUTIONS:
            console.error(`Institutions can't be loaded due to: ${payload}`);
            return state;

        default:
            return state;
    }
}