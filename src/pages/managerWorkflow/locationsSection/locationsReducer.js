import * as actionTypes from './locationsActions';

const initialState = {
    locations: []
};

export default function locationsSection(state = initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case actionTypes.LOCATIONS_RESPONSE:
            console.log(payload);
            return {
                locations: payload
            };

        default:
            return state;
    }
}
