import * as actionTypes from '../../../constants/fetchActionsTypes';

class Institution {
    constructor(name, uuid) {
        this.name = name;
        this.uuid = 'institution_' + uuid;
        this.route = name;
    }
}

const initialState = [];

export default function institutions(state = initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case actionTypes.RECEIVE:
            return payload.map(inst => new Institution(inst.name, inst.uuid));

        case actionTypes.REJECT:
            return `Institutions can't be loaded due to error: ${payload.type}${payload.message}`;

        default:
            return state;
    }
}