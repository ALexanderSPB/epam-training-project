import * as actionTypes from './locationsActions';

const initialState = {
    locations: []
};

export default function locationsSection(state = initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case actionTypes.LOCATIONS_RESPONSE:
            if (state.selectedLocation) {
                return {
                    ...state,
                    locations: payload,
                    selectedLocation: {
                        ...state.selectedLocation,
                        data: payload[state.selectedLocation.id]
                    }
                };
            }
            return {
                ...state,
                locations: payload
            };

        case actionTypes.SELECT_LOCATION:
            const currentLocationId = state.locations.findIndex(location => location.name === payload);
            return {
                ...state,
                selectedLocation: {
                    id: currentLocationId,
                    data: state.locations[currentLocationId]
                }
            };

        case actionTypes.UPDATE_TIME:
            return {
                ...state,
                time: payload
            };

        default:
            return state;
    }
}
