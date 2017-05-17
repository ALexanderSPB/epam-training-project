import {INSTITUTIONS} from '../../../constants/fetchActionsTypes';

class Institution {
    constructor(institution) {
        Object.assign(this, institution);
    }
}

const initialState = [];

export default function institutions(state = initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case INSTITUTIONS.RECEIVE:
            return payload.map(inst => new Institution(inst));

        case INSTITUTIONS.REJECT:
            // eslint-disable-next-line
            console.error(`Institutions can't be loaded due to: ${payload}`);
            return state;

        default:
            return state;
    }
}
