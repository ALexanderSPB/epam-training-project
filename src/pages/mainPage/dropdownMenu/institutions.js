import * as actionTypes from "../../../constants/fetchActionsTypes";

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
        case actionTypes.receive:
            return payload.map(inst => new Institution(inst.name, inst.uuid));

        case actionTypes.reject:
            return `Institutions can't be loaded due to: ${payload}`;

        default:
            return state;
    }
}