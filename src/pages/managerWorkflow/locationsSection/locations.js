import {LOCATIONS} from '../../../constants/fetchActionsTypes';

const initialState = [];

export default function locationsSection(state = initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case LOCATIONS.RECEIVE:
            return payload;

        case LOCATIONS.REJECT:
            // eslint-disable-next-line no-console
            console.error(`Locations can't be loaded due to: ${payload}`);
            return state;

        default:
            return state;
    }
}
