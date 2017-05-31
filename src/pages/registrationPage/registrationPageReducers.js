import {
    REGISTRATION_SUBMIT_RESPONSE,
    REGISTRATION_LOCATIONS_REQUEST,
    REGISTRATION_LOCATIONS_RESPONSE,
    REGISTRATION_SUBMIT_REQUEST
} from './registrationPageActionTypes';

export default function registration(state = {isLoading: true}, action) {
    switch (action.type) {
        case REGISTRATION_SUBMIT_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case REGISTRATION_SUBMIT_RESPONSE:
            return {
                ...state,
                isLoading: false
            };

        case REGISTRATION_LOCATIONS_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case REGISTRATION_LOCATIONS_RESPONSE:
            return {
                ...state,
                locations: action.value,
                isLoading: false
            };

        default:
            return state;
    }
}
